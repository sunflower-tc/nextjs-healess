import { client } from '@lib/apollo-client';
import { isValidObject } from '@utils/Helper';
import CUSTOMER_QUERY from '@voguish/module-customer/graphql/Customer.graphql';
import GENERATE_CUSTOMER_TOKEN from '@voguish/module-customer/graphql/mutation/GenerateCustomerToken.graphql';
import STORE_CONFIG_QUERY from '@voguish/module-store/graphql/StoreConfig.graphql';
import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

export default NextAuth({
  // pages: {
  //   signIn: '/customer/account/login',
  //   error: '/login',
  // },

  providers: [
    CredentialProvider({
      name: 'Credentials',
      authorize: async (credentials) => {
        let userData = {};
        /* Getting Token from generateCustomerToken */
        const { data, error } = await client.mutate({
          mutation: GENERATE_CUSTOMER_TOKEN,
          variables: credentials,
        });
        if (error) {
          // console.error(error);
        }
        if (
          isValidObject(data) &&
          isValidObject(data.generateCustomerToken) &&
          data.generateCustomerToken.token
        ) {
          /** Getting Customer data after retrieving  */
          const { data: customerData, error: customerError } =
            await client.query({
              query: CUSTOMER_QUERY,
              fetchPolicy: 'no-cache',
              context: {
                headers: {
                  // store: getCookie(SELECTED_STORE),
                  Authorization: `Bearer ${data.generateCustomerToken.token}`,
                },
              },
            });
          if (customerError) {
            // console.error(customerError);
          }
          if (
            isValidObject(customerData) &&
            isValidObject(customerData.customer)
          ) {
            /** Preparing User Data */
            userData = {
              firstname: customerData.customer.firstname,
              lastname: customerData.customer.firstname,
              name:
                customerData.customer.firstname +
                ' ' +
                customerData.customer.lastname,
              token: data.generateCustomerToken.token,
              email: customerData.customer.email,
              tokenLifeTime: customerData.customer.customer_token_lifetime,
            };
          }
          return userData;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge:
      (await client.query({
        query: STORE_CONFIG_QUERY,
      })?.data?.storeConfig?.customer_token_lifetime) * 60 || 60 * 60 * 1, // One hour by default set
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      const tokenTime =
        (await client.query({
          query: STORE_CONFIG_QUERY,
        })?.data?.storeConfig?.customer_token_lifetime) * 60 || 60 * 60 * 1;
      if (isValidObject(user) && user.token) {
        token.accessToken = user.token;
        token.user = user;
        token.accessTokenExpiry = tokenTime;
        token.refreshToken = tokenTime;
      }
      const shouldRefreshTime = tokenTime;
      if (shouldRefreshTime > 0) {
        return Promise.resolve(token);
      }

      // If the call arrives after 23 hours have passed, we allow to refresh the token.

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.accessTokenExpiry = token.accessTokenExpiry;
      return Promise.resolve(token);
    },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith('/customer/account')) return `${baseUrl}${url}`;
    //   // // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
  },
});

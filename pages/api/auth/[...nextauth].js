import { client } from '@lib/apollo-client';
import { isValidObject } from '@utils/Helper';
import CUSTOMER_QUERY from '@voguish/module-customer/graphql/Customer.graphql';
import GENERATE_CUSTOMER_TOKEN from '@voguish/module-customer/graphql/mutation/GenerateCustomerToken.graphql';
import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { getState } from 'store';
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
              fetchPolicy: 'network-only',
              context: {
                headers: {
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
            };
          }
          return userData;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NO_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (isValidObject(user) && user.token) {
        token.accessToken = user.token;
        token.user = user;
        token.expires_at = Math.floor(
          Date.now() / 1000 +
            parseFloat(getState()?.storeConfig?.customer_token_lifetime) *
              60 *
              60
        );
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
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

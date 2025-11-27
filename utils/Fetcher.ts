import { client } from '@lib/apollo-client';
import { errorAuthentication, errorCat } from './Constants';
import { Logout } from '~store';
import { ApolloError, DocumentNode } from '@apollo/client';

export async function graphqlRequest({ query, variables, options = {} }: any) {
  const { data, errors, loading } = await client.query({
    query: query,
    variables: variables,
    ...options,
  });
  if (errors) {
    // console.error(errors);
  } else if (!loading) {
    return data;
  } else {
    return loading;
  }
}

export async function graphqlMutate({
  mutation,
  variables,
  options = {},
}: {
  mutation: DocumentNode;
  variables?: Record<string, any>;
  options?: any;
}) {
  try {
    const { data, errors } = await client.mutate({
      mutation,
      variables,
      ...options,
    });

    if (errors && Array.isArray(errors)) {
      const isAuthError = errors.some(
        (err) =>
          errorCat.includes(err.extensions?.category) ||
          errorAuthentication.includes(err.extensions?.category) ||
          err.message.includes(
            'The current user cannot perform operations on cart'
          )
      );

      if (isAuthError) {
        Logout();
        throw new ApolloError({ graphQLErrors: errors });
      }

      throw new ApolloError({ graphQLErrors: errors });
    }

    return data;
  } catch (error: any) {
    console.warn(`${error?.message || JSON.stringify(error)}`);

    if (
      error?.graphQLErrors?.some(
        (err: any) =>
          errorCat.includes(err.extensions?.category) ||
          errorAuthentication.includes(err.extensions?.category) ||
          err.message.includes(
            'The current user cannot perform operations on cart'
          )
      )
    ) {
      Logout();
    }

    throw error;
  }
}

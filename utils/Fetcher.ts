import { client } from '@lib/apollo-client';

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

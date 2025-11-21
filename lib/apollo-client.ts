import {
  ApolloCache,
  ApolloClient,
  DefaultContext,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { authorizationErr } from '@utils/Constants';
import { showToast } from '@utils/Helper';
import { useMemo } from 'react';
import { Logout } from 'store';
export type ClientContext = {
  cache: ApolloCache<NormalizedCacheObject>;
  headers?: Record<string, string>;
};

setContext((_, context: DefaultContext) => {
  if (!context.headers) context.headers = {};
  try {
    /* const query = context.cache.readQuery({ query: CustomerTokenDocument });
    if (query?.customerToken?.token) {
      context.headers.authorization = `Bearer ${query?.customerToken?.token}`;
      return context;
    } */
    return context;
  } catch (error) {
    return context;
  }
});

/**
 * Polyfill Global Variables in Server
 */
if (typeof window === 'undefined') {
  global.URL = require('url').URL;
}

let apolloClient: ApolloClient<any> | null = null;

// Handling  GraphQl and Network error globally
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors?.forEach(({ message }) => {
      // graphQLErrors?.forEach(({ message, locations, path }) => {
      // console.error(
      //   `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      // );
      // prettier-ignore
      if (message === authorizationErr) {
        Logout();
      }
    });
  }

  if (networkError) {
    showToast({
      message: `[Network error]: ${networkError}`,
      type: 'error',
    });
  }
});

function createApolloClient() {
  const uri = `${process.env.MAGENTO_ENDPOINT}graphql`;
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // credentials: 'include',
    // add form array for using errorLink and  HttpLink both together.
    link: from([
      errorLink,
      new HttpLink({
        uri,
        // credentials: 'include', // Additional fetch() options like `credentials` or `headers`
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Customer: {
          keyFields: ['email'],
        },
      },
    }),
  });
}

export function initializeApollo(initialState: ApolloCache<any> | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: ApolloCache<any>) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

/**
 * * For SSR use..
 */
export const client = initializeApollo();

import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@lib/apollo-client';
import { ReactNode } from 'react';

/**
 * GraphQl Container to wrap the page inside GraphQL provider
 * @param { pageProps: any, children: ReactNode }
 * @returns ReactNode
 */
const GraphQlProvider = ({
  pageProps,
  children,
}: {
  pageProps: any;
  children: ReactNode;
}) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default GraphQlProvider;

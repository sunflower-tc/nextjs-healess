import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
  TypedDocumentNode,
  useMutation,
} from '@apollo/client';
import { DocumentNode } from 'graphql';
import { useToken } from './useToken';

type TContext = DefaultContext;

export function useCustomerMutation<
  TData = any,
  TVariables = OperationVariables,
  TCache extends ApolloCache<any> = ApolloCache<any>
>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables, TContext, TCache>
): MutationTuple<TData, TVariables, TContext, TCache> {
  const token = useToken();

  options = options || {};

  options.fetchPolicy = 'network-only';

  let context = options?.context || {};

  let headers = context?.headers || {};

  headers = {
    ...headers,
    ...{
      Authorization: `Bearer ${token}`,
    },
  };
  context.headers = headers;
  options.context = context;
  return useMutation(mutation, options);
}

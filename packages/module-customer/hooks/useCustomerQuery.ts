import {
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery,
} from '@apollo/client';
import { DocumentNode } from 'graphql';
import { useToken } from './useToken';

export function useCustomerQuery<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> {
  const token = useToken();

  options = options || {};

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
  return useQuery(query, options);
}

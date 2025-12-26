import {
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  useQuery,
} from '@apollo/client';
import { setStoreConfig } from '@store/store';
import { isShallowEqual } from '@utils/Helper';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import STORE_CONFIG_QUERY from '../graphql/StoreConfig.graphql';
import { StoreConfigQueryResult } from '../types';

/**
 * Custom hook to fetch and immediately dispatch store configuration.
 *
 * @param options - Apollo query options
 * @returns Apollo query result
 */
export const useStoreConfig = (
  options?: QueryHookOptions<StoreConfigQueryResult, OperationVariables>
): QueryResult<StoreConfigQueryResult, OperationVariables> => {
  const dispatch = useDispatch();
  const { data, ...queryResult } = useQuery<
    StoreConfigQueryResult,
    OperationVariables
  >(STORE_CONFIG_QUERY, options);

  const storeConfig = data?.storeConfig;

  const lastConfigRef = useRef<typeof storeConfig | null>(null);

  if (storeConfig && !isShallowEqual(lastConfigRef.current, storeConfig)) {
    dispatch(setStoreConfig(storeConfig));
    lastConfigRef.current = storeConfig;
  }

  return { data, ...queryResult };
};

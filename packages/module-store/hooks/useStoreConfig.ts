import { OperationVariables, QueryResult, useQuery } from '@apollo/client';
import { setStoreConfig } from '@store/store';
import { useDispatch } from 'react-redux';
import STORE_CONFIG_QUERY from '../graphql/StoreConfig.graphql';
import { StoreConfigQueryResult } from '../types';

/**
 * useStoreConfig
 */
export const useStoreConfig = (): QueryResult<
  StoreConfigQueryResult,
  OperationVariables
> => {
  const dispatch = useDispatch();
  const storeData = useQuery<StoreConfigQueryResult>(STORE_CONFIG_QUERY);
  if (storeData?.data?.storeConfig) {
    dispatch(setStoreConfig(storeData?.data?.storeConfig));
  }
  // useFetchCountries();html
  return storeData;
};

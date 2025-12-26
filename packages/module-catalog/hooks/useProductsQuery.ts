import { useQuery } from '@apollo/client';
import PRODUCTS_QUERY from '@voguish/module-catalog/graphql/Products.graphql';
import SEARCH_PRODUCTS_QUERY from '@voguish/module-catalog/graphql/SearchProducts.graphql';
import { useRouter } from 'next/router';

import { getSearchVariables } from '@utils/Helper';
import {
  ProductsListInterface,
  ProductsQueryInput,
} from '@voguish/module-catalog/types';
import { useToast } from '@voguish/module-theme/components/toast/hooks';

export const useProductsQuery = (queryVariable?: ProductsQueryInput) => {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    search = '',
    filters = {},
    pageSize = 9,
    currentPage = 1,
    sort,
  } = getSearchVariables(queryVariable?.search as string, router?.asPath) || {};
  const productsData = useQuery<ProductsListInterface>(PRODUCTS_QUERY, {
    variables: sort
      ? {
          filters: filters,
          search: search,
          sort: sort,
          pageSize: pageSize,
          currentPage: currentPage,
        }
      : {
          filters: filters,
          search: search,
          pageSize: pageSize,
          currentPage: currentPage,
        },
  });

  const { error } = productsData;
  if (error && error.message) {
    showToast({ message: error.message, type: 'error' });
  }
  return productsData;
};

export const useSearchProductsQuery = (queryVariable?: ProductsQueryInput) => {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    search = '',
    filters = {},
    pageSize = 9,
    currentPage = 1,
    sort,
  } = getSearchVariables(queryVariable?.search as string, router?.asPath) || {};
  const productsData = useQuery<ProductsListInterface>(SEARCH_PRODUCTS_QUERY, {
    variables: sort
      ? {
          filters: filters,
          search: search,
          sort: sort,
          pageSize: pageSize,
          currentPage: currentPage,
        }
      : {
          filters: filters,
          search: search,
          pageSize: pageSize,
          currentPage: currentPage,
        },
  });

  const { error } = productsData;
  if (error && error.message) {
    showToast({ message: error.message, type: 'error' });
  }
  return productsData;
};

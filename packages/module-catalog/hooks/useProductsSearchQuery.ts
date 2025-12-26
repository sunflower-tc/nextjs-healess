import { useQuery } from '@apollo/client';
import PRODUCTS_QUERY from '@voguish/module-catalog/graphql/ProductsSearch.graphql';
import {
  ProductsListInterface,
  ProductsQueryInput,
} from '@voguish/module-catalog/types';
import { useToast } from '@voguish/module-theme/components/toast/hooks';

export const useProductsSearchQuery = (queryVariable?: ProductsQueryInput) => {
  const { showToast } = useToast();

  const {
    search = '',
    filters = {},
    pageSize = 9,
    currentPage = 1,
    sort = { position: 'DESC' },
  } = queryVariable || {};
  const productsData = useQuery<ProductsListInterface>(PRODUCTS_QUERY, {
    variables: {
      filters: filters,
      search: search,
      sort: sort,
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

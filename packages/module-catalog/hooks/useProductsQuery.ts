import { useQuery } from '@apollo/client';
import { showToast } from '@utils/Helper';
import {
  ProductsListInterface,
  ProductsQueryInput,
} from '@voguish/module-catalog';
import PRODUCTS_QUERY from '@voguish/module-catalog/graphql/Products.graphql';

export const useProductsQuery = (queryVariable?: ProductsQueryInput) => {
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

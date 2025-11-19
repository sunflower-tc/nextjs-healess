import { useQuery } from '@apollo/client';
import { showToast } from '@utils/Helper';
import {
  ProductsListInterface,
  ProductsQueryInput,
} from '@voguish/module-catalog';
import PRODUCTS_QUERY from '@voguish/module-catalog/graphql/SliderProducts.graphql';

export const useProductSliderQuery = (queryVariable?: ProductsQueryInput) => {
  const {
    filters = {},
    pageSize = 9,
    sort = { position: 'DESC' },
  } = queryVariable || {};
  const productsData = useQuery<ProductsListInterface>(PRODUCTS_QUERY, {
    variables: {
      filters: filters,
      sort: sort,
      pageSize: pageSize,
    },
  });
  const { error } = productsData;
  if (error && error.message) {
    showToast({ message: error.message, type: 'error' });
  }
  return productsData;
};

import { useQuery } from '@apollo/client';
import PRODUCTS_QUERY from '@voguish/module-catalog/graphql/SliderProducts.graphql';
import {
  ProductsListInterface,
  ProductsQueryInput,
} from '@voguish/module-catalog/types';
import { useToast } from '@voguish/module-theme/components/toast/hooks';

export const useProductSliderQuery = (queryVariable?: ProductsQueryInput) => {
  const { showToast } = useToast();

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

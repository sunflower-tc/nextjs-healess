import { useQuery } from '@apollo/client';
import PRODUCTS_QUERY from '@voguish/module-catalog/graphql/RelatedProducts.graphql';
import {
  RelatedProductsListInterface,
  RelatedProductsQueryInput,
} from '@voguish/module-catalog/types';
import { useToast } from '@voguish/module-theme/components/toast/hooks';

export const useRelatedProductsQuery = (
  queryVariable?: RelatedProductsQueryInput
) => {
  const { showToast } = useToast();

  const {
    sku,
    pageSize = 9,
    currentPage = 1,
    sort = { position: 'DESC' },
  } = queryVariable || {};
  const productsData = useQuery<RelatedProductsListInterface>(PRODUCTS_QUERY, {
    variables: {
      sku,
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

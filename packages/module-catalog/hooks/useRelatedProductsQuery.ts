import { useQuery } from '@apollo/client';
import { showToast } from '@utils/Helper';
import {
  RelatedProductsListInterface,
  RelatedProductsQueryInput,
} from '@voguish/module-catalog';
import PRODUCTS_QUERY from '@voguish/module-catalog/graphql/RelatedProducts.graphql';

export const useRelatedProductsQuery = (
  queryVariable?: RelatedProductsQueryInput
) => {
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

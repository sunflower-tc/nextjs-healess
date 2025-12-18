import { useQuery } from '@apollo/client';
import ListFall from '@packages/module-catalog/Components/Product/Detail/placeholder/ListFall';
import FadeInView from '@packages/module-theme/components/ui/FadeInView';
import { getSearchedQuery, isValidArray } from '@utils/Helper';
import PRODUCT_AGGRESSION from '@voguish/module-catalog/graphql/Aggregations.graphql';
import { useProductsQuery } from '@voguish/module-catalog/hooks/useProductsQuery';
import {
  ProductsListInterface,
  ProductsResultInterface,
} from '@voguish/module-catalog/types';
import Containers from '@voguish/module-theme/components/ui/Container';
import { PageOptions } from '@voguish/module-theme/page';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const ProductList = dynamic(
  () => import('@voguish/module-catalog/Components/Product/List'),
  {
    loading: () => {
      return <ListFall />;
    },
    ssr: false,
  }
);

export default function SearchResults() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const decodedString = decodeURIComponent(router?.asPath);

  const { data, loading } = useProductsQuery({
    search: `${getSearchedQuery(decodedString)}`,
    pageSize: 12,
  });
  const { data: productAggregations, loading: aggregationsLoader } =
    useQuery<ProductsListInterface>(PRODUCT_AGGRESSION, {
      variables: {
        filters: {},
        search: `${getSearchedQuery(decodedString)}`,
      },
    });
  const aggregations = productAggregations?.products?.aggregations || [];
  const products = (data?.products as ProductsResultInterface) || [];
  return (
    <Containers>
      {loading || aggregationsLoader ? (
        <ListFall />
      ) : (
        <FadeInView>
          <ProductList
            sort={productAggregations?.products?.sort_fields as any}
            aggregations={aggregations as any}
            title={
              getSearchedQuery(decodedString)
                ? `${t('Items for')} ${getSearchedQuery(decodedString)}`
                : t('Search Results')
            }
            showPagination={true}
            showLayeredNavigation={isValidArray(aggregations) ? true : false}
            showToolBar
            aggreLoad={aggregationsLoader}
            loading={loading}
            products={products as ProductsResultInterface}
          />
        </FadeInView>
      )}
    </Containers>
  );
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const pageProps: PageOptions = {
    title: 'Search Results',
    description: 'Welcome to Voguish Theme',
    showBreadcrumb: true,
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),

      pageOptions: pageProps,
    },
  };
};

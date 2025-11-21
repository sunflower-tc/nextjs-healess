import { Grid } from '@mui/material';
import { graphqlRequest } from '@utils/Fetcher';
import { isValidObject } from '@utils/Helper';
import { TabPlaceHolder } from '@voguish/module-catalog';
import DetailsPlaceHolder from '@voguish/module-catalog/Components/Product/Detail/placeholder/DetailsPlaceHolder';
import ImageGalleryPlaceHolder from '@voguish/module-catalog/Components/Product/Detail/placeholder/ImageGalleryPlaceHolder';
import PRODUCT_QUERY from '@voguish/module-catalog/graphql/Product.graphql';
import PRODUCT_PATH_QUERY from '@voguish/module-catalog/graphql/ProductsPath.graphql';
import {
  ProductItemInterface,
  ProductsListInterface,
} from '@voguish/module-catalog/types';
import { PageOptions, PagePathProps, PagePaths } from '@voguish/module-theme';
import Containers from '@voguish/module-theme/components/ui/Container';
import dynamic from 'next/dynamic';
const Detail = dynamic(
  () =>
    import('@voguish/module-catalog/Components/Product/Detail/page/Details'),
  {
    loading: () => (
      <Containers className="-sm:px-2">
        <>
          <Grid className="grid justify-center w-full mb-14 scroll-smooth -lg:gap-8 lg:grid-cols-12 lg:gap-x-20 xl:gap-x-24 lg:justify-between">
            <Grid className="lg:col-span-6 mt-[-10px] scroll-smooth max-w-[95vw] max-w-[95dvw]">
              <div className="lg:sticky top-24 scroll-smooth">
                <ImageGalleryPlaceHolder />
              </div>
            </Grid>
            <DetailsPlaceHolder />
          </Grid>
          <TabPlaceHolder />
        </>
      </Containers>
    ),
  }
);

const Product = ({
  product,
}: {
  product: ProductItemInterface;
  urlKey: string;
}) => {
  return (
    <>
      <Detail product={product} />
    </>
  );
};

export default Product;

/**
 * Get static Props: getting all the paths for pre rendering
 *
 * @returns {Object} props
 */
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on products

  let paths: PagePathProps = [];

  if (process.env.MODE === 'PRODUCTION') {
    const data: ProductsListInterface = await graphqlRequest({
      query: PRODUCT_PATH_QUERY,
      variables: { filters: {} },
    });

    const products = data?.products?.items || [];

    paths = products.map((product) => ({
      params: { urlKey: product?.url_key || '404' },
    }));
  }
  return { paths, fallback: 'blocking' };
}

/**
 * Generating data at build time.
 *
 * @param {*} param0
 * @returns {JSON} props
 */
export async function getStaticProps({ params }: PagePaths) {
  const data: ProductsListInterface = await graphqlRequest({
    query: PRODUCT_QUERY,
    variables: {
      search: '',
      filters: { url_key: { eq: params?.urlKey } },
    },
    options: {
      fetchPolicy: 'network-only',
    },
  });
  const product = data?.products?.items?.[0] || null;

  if (!isValidObject(product) || !product.sku) {
    return {
      notFound: true,
    };
  }
  const pageProps: PageOptions = {
    title: product?.name,
    metaTitle: product?.meta_title || product?.name,
    metaDescription: product?.meta_description,
    metaKeywords: product?.meta_keyword,
    canonical: product?.canonical_url,
  };
  return {
    props: {
      product: product,
      pageOptions: pageProps,
    },
    revalidate: 100, // Time In which it revalidate or check for changes
  };
}

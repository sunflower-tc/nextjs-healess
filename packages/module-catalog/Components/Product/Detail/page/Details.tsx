import Grid from '@mui/material/Grid';
import { useAppDispatch } from '@store/hooks';
import { setConfigProduct } from '@store/store';
import { isValidArray, isValidObject } from '@utils/Helper';
import { ProductItemInterface } from '@voguish/module-catalog/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import Containers from '@voguish/module-theme/components/ui/Container';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import DetailsPlaceHolder from '../placeholder/DetailsPlaceHolder';
import ImageGalleryPlaceHolder from '../placeholder/ImageGalleryPlaceHolder';
import TabPlaceHolder from '../placeholder/TabPlaceHolder';
import { useRouter } from 'next/router';
const Details = dynamic(() => import('../Details'), {
  loading: () => <DetailsPlaceHolder />,
});
const TabPanel = dynamic(() => import('../TabPanel'), {
  loading: () => <TabPlaceHolder />,
});
const ProductImageGallery = dynamic(() => import('../ProductImageGallery'), {
  loading: () => <ImageGalleryPlaceHolder />,
});

const BundleProduct = dynamic(() => import('../AddToCart/BundleProduct'), {
  loading: () => (
    <Containers>
      <div
        id="bundle_options"
        className="grid min-w-full gap-8 pb-20 lg:grid-cols-12"
      >
        <DetailsPlaceHolder />
        <DetailsPlaceHolder />
      </div>
    </Containers>
  ),
});
export default function Detail({
  product,
  loading = false,
}: {
  product: ProductItemInterface;
  loading?: boolean;
}) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isValidArray(product?.configurable_options)) {
      const keys = product?.configurable_options?.map(
        (productVarient: { values: any }) => productVarient?.values[0]?.uid
      );

      const keys2 = product?.configurable_options?.map(
        (productVarient: { values: any }) => productVarient?.values[1]?.uid
      );

      const firstVarient =
        product?.variants?.find((variant: { attributes: { uid: string }[] }) =>
          variant.attributes.some((attribute) => keys?.includes(attribute.uid))
        ) ??
        product?.variants?.find((variant: { attributes: { uid: string }[] }) =>
          variant.attributes.some((attribute) => keys2?.includes(attribute.uid))
        );
      dispatch(setConfigProduct(firstVarient));
    } else {
      dispatch(setConfigProduct({ product: product }));
    }
  }, [router.asPath]);

  return loading ? (
    <Containers className="-sm:px-2">
      <ErrorBoundary>
        <Grid className="grid justify-center w-full mb-14 scroll-smooth lg:grid-cols-12 lg:justify-between lg:gap-x-20 xl:gap-x-24 -lg:gap-8">
          <Grid className="mt-[-10px] max-w-[95vw] scroll-smooth lg:col-span-6">
            <div className="top-24 scroll-smooth lg:sticky">
              <ImageGalleryPlaceHolder />
            </div>
          </Grid>
          <DetailsPlaceHolder />
        </Grid>
        <TabPlaceHolder />
      </ErrorBoundary>
    </Containers>
  ) : (
    <Containers className="-sm:px-2">
      {isValidObject(product) ? (
        <ErrorBoundary>
          <Grid className="grid justify-center w-full mb-14 scroll-smooth lg:grid-cols-12 lg:justify-between lg:gap-x-20 xl:gap-x-24 -lg:gap-8">
            <Grid className="mt-[-10px] max-w-[95vw] scroll-smooth lg:col-span-6">
              <div className="top-24 scroll-smooth lg:sticky fade-in-animation">
                <ErrorBoundary>
                  <ProductImageGallery product={product} name={product?.name} />
                </ErrorBoundary>
              </div>
            </Grid>
            <Details product={product} />
          </Grid>

          {product?.__typename === 'BundleProduct' && (
            <ErrorBoundary>
              <BundleProduct product={product} />
            </ErrorBoundary>
          )}

          <ErrorBoundary>
            <TabPanel product={product} />
          </ErrorBoundary>
        </ErrorBoundary>
      ) : (
        t('No Product Found')
      )}
    </Containers>
  );
}

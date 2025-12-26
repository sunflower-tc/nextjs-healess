import { useLazyQuery } from '@apollo/client';
import Clear from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setConfigProduct } from '@store/store';
import { isValidArray } from '@utils/Helper';
import PRODUCT_QUERY from '@voguish/module-catalog/graphql/Product.graphql';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import Modal from '@voguish/module-theme/components/Modal';
import { useEffect } from 'react';
import BundleProduct from './Product/Detail/AddToCart/BundleProduct';
import Details from './Product/Detail/Details';
import ProductImageGallery from './Product/Detail/ProductImageGallery';
import DetailsPlaceHolder from './Product/Detail/placeholder/DetailsPlaceHolder';
import ImageGalleryPlaceHolder from './Product/Detail/placeholder/ImageGalleryPlaceHolder';

export default function QuickView({
  setOpen,
  open,
}: {
  open: { open: boolean; sku: string | null };
  setOpen: any;
}) {
  const [featchProduct, { data, loading }] = useLazyQuery(PRODUCT_QUERY);
  const product = data?.products?.items?.[0];
  const dispatch = useAppDispatch();
  useEffect(() => {
    open?.open &&
      open?.sku &&
      featchProduct({
        variables: { filters: { sku: { eq: open?.sku } } },
      });
  }, [open]);
  useEffect(() => {
    if (open?.open) {
      if (isValidArray(product?.configurable_options)) {
        const keys = product?.configurable_options?.map(
          (productVariant: { values: any }) => productVariant?.values[0]?.uid
        );
        const getVariant = product?.variants?.find(
          (variant: { attributes: { uid: string }[] }) =>
            variant.attributes.every((attribute) =>
              keys?.includes(attribute.uid)
            )
        );
        dispatch(setConfigProduct(getVariant));
      } else {
        dispatch(setConfigProduct({ product: product }));
      }
    }
  }, [product, open?.open]);
  const cartOpen = useAppSelector(
    (state) => state?.storeConfig?.setOpenCart
  ) as boolean;
  useEffect(() => {
    if (cartOpen) {
      setOpen({ ...open, open: false });
    }
  }, [cartOpen]);
  return (
    <div>
      <Modal
        showModal={open?.open || false}
        hideModal={() => setOpen({ ...open, open: false })}
        panelClass="!absolute !inset-0 !m-auto !p-4 md:!p-10 !overflow-y-auto !bg-white !rounded-md !shadow-lg !max-w-7xl sm:!max-h-[90%] !select-none !overflow-x-hidden"
      >
        <div className="relative !max-h-[70vh]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-12 xl:gap-16">
            <ErrorBoundary>
              <Button
                sx={{ minWidth: 0, px: 0 }}
                className="absolute z-20 lg:top-[-1.3rem] lg:right-[-1rem] md:top-[-1.3rem] md:right-[-1rem] top-[1.2rem] right-[1rem] w-8 h-8 flex items-center justify-center text-closeIconColor bg-white/80 rounded-full shadow-md hover:bg-white transition"
                onClick={() => setOpen(null)}
              >
                <Clear fontSize="small" />
              </Button>
            </ErrorBoundary>
            <div className="w-full max-w-full overflow-hidden scroll-smooth lg:col-span-5">
              {loading ? (
                <ImageGalleryPlaceHolder />
              ) : (
                <ErrorBoundary>
                  <ProductImageGallery
                    product={product}
                    name={product?.name as string}
                  />
                </ErrorBoundary>
              )}
            </div>
            {loading ? (
              <DetailsPlaceHolder />
            ) : (
              <div className="flex flex-col max-w-full lg:col-span-6">
                <ErrorBoundary>
                  <div className="space-y-4 break-words max-h-[70vh] pr-2">
                    <Details quickView product={product} />
                  </div>
                </ErrorBoundary>
              </div>
            )}
          </div>
          {product?.__typename === 'BundleProduct' && (
            <ErrorBoundary>
              <div className="mt-8 overflow-x-auto break-words">
                <BundleProduct quickView product={product} />
              </div>
            </ErrorBoundary>
          )}
        </div>
      </Modal>
    </div>
  );
}

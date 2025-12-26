import { getLocalStorage } from '@store/local-storage';
import { CompareList as CompareListTypes } from '@store/types';
import { setCompareList, setCompareListForGuest } from '@store/user';
import AddToWishlist from '@voguish/module-catalog/Components/Product/Detail/AddToWishlist';
import { useToken } from '@voguish/module-customer/hooks/useToken';
import {
  VisibilityOutlinedIcon,
  WeighingMachine,
} from '@voguish/module-theme/components/elements/Icon';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddToCompare } from '../Hooks/useAddToCompare';
import { useAddToCompareOnEmpty } from '../Hooks/useCreateCompareList';
import { ButtonMui } from '@packages/module-theme/components/ui/ButtonMui';
import { BRAND_HEX_CODE } from '@utils/Constants';
import { CircularProgress } from '@mui/material';

const LeaderboardRoundedIcon = dynamic(
  () => import('@mui/icons-material/LeaderboardRounded')
);

const QuickView = dynamic(
  () => import('@voguish/module-catalog/Components/QuickView'),
  { ssr: false }
);

export default function AddToCompare({
  productId,
  productSku,
  slider = '',
  view,
  detailsPage = true,
  relatedProduct = false,
}: {
  view?: any;
  slider?: string;
  relatedProduct?: boolean;
  detailsPage?: boolean;
  productId: string | number;
  productSku: string;
}) {
  const [quickView, setQuickView] = useState<{
    open: boolean;
    sku: string | null;
  }>({
    open: false,
    sku: null,
  });

  const compareId = useSelector(
    (state: { user: { compareId: { ID: string | number } } }) =>
      state?.user?.compareId?.ID
  );
  const compareProduct = useSelector(
    (state: { user: { compareList: { data: CompareListTypes | null } } }) =>
      state?.user?.compareList
  );
  const compareData = (compareProduct?.data as any) || null;
  const router = useRouter();
  const { addToCompareHandler, loading } = useAddToCompare();
  const { addToCompareOnEmptyHandler, loading: isCompareRemoving } =
    useAddToCompareOnEmpty();
  const token = useToken();
  const localId = getLocalStorage('compare_list_uid', true);
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

  const addProductToCompare = () => {
    if (productId !== 'undefined' && productId !== null) {
      if (token) {
        compareId && localId?.ID !== null
          ? addToCompareHandler({
              uid: compareId,
              products: [productId] as any,
            })
          : addToCompareOnEmptyHandler({
              products: [productId] as any,
            });
      } else {
        router.push('/customer/account/login');
        dispatch(setCompareListForGuest(true));
        const key = 'website-id-1-' + productId;
        const data: any = {};
        let finalData = {};
        data[key] = {
          product_id: productId,
          sku: productSku,
        };
        if (
          compareData &&
          !Object.prototype.hasOwnProperty.call(compareData, key)
        ) {
          finalData = { ...compareData, ...data };
          dispatch(setCompareList(finalData));
        } else {
          dispatch(setCompareList(data));
        }
      }
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex mx-auto divide-x divide-y-0 divide-solid divide-checkoutBorder rtl:flex-row-reverse">
        {!slider && !detailsPage && (
          <ErrorBoundary>
            <button
              aria-label="add to compare item"
              onClick={() => {
                addProductToCompare();
              }}
              className={`z-[9] min-w-0 border-none rounded-full flex items-center justify-center cursor-pointer px-0 w-9 h-9 absolute bg-white text-sm shadow-md
          hover:shadow-lg ${
            view === 'list'
              ? '-md:top-16 -md:rtl:left-3 -md:ltr:right-3 md:bottom-4 md:rtl:left-4 md:ltr:right-4'
              : 'top-16 rtl:left-3 ltr:right-3'
          }  group`}
            >
              <WeighingMachine />
            </button>
          </ErrorBoundary>
        )}
        {!slider && !detailsPage && (
          <ErrorBoundary>
            <button
              aria-label="add to compare item"
              onClick={() => {
                addProductToCompare();
              }}
              className={`z-[9]   min-w-0 border-none rounded-full flex items-center justify-center cursor-pointer px-0 w-9 h-9 absolute bg-white text-sm shadow-md
            hover:shadow-lg ${
              view === 'list'
                ? '-md:top-14  -md:rtl:left-3 -md:ltr:right-3 md:bottom-4 md:rtl:left-16 md:ltr:right-16'
                : 'top-16 rtl:left-3 ltr:right-3'
            }  group`}
            >
              {loading || isCompareRemoving ? (
                <CircularProgress
                  size={15}
                  style={{ color: BRAND_HEX_CODE, margin: 'auto' }}
                />
              ) : (
                <WeighingMachine />
              )}
            </button>
          </ErrorBoundary>
        )}
        {slider && !detailsPage && (
          <ErrorBoundary>
            <Link href={`/catalog/product/${slider}`}>
              <button
                aria-label="add to compare item"
                onClick={() => {
                  addProductToCompare();
                }}
                className={`z-[9] min-w-0 border-none rounded-full flex items-center justify-center cursor-pointer px-0 w-9 h-9 absolute bg-white text-sm shadow-md
          hover:shadow-lg ${
            view === 'list'
              ? '-md:top-14 -md:rtl:left-3 -md:ltr:right-3 md:bottom-4 md:rtl:left-16 md:ltr:right-16'
              : 'top-16 rtl:left-3 ltr:right-3'
          }  group`}
              >
                {loading || isCompareRemoving ? (
                  <CircularProgress
                    size={15}
                    style={{ color: BRAND_HEX_CODE, margin: 'auto' }}
                  />
                ) : (
                  <WeighingMachine />
                )}
              </button>
            </Link>
          </ErrorBoundary>
        )}
        {!detailsPage && !relatedProduct && (
          <ErrorBoundary>
            <button
              aria-label="quick view item"
              onClick={() => {
                setQuickView({ open: true, sku: productSku });
              }}
              className={`z-[9] min-w-0 border-none rounded-full flex items-center justify-center cursor-pointer px-0 w-9 h-9 absolute bg-white text-sm shadow-md
          hover:shadow-lg ${
            view === 'list'
              ? '-md:top-28 -md:rtl:left-3 -md:ltr:right-3 md:bottom-4 md:rtl:left-16 md:ltr:right-16'
              : 'top-28 rtl:left-3 ltr:right-3'
          }  group`}
            >
              <VisibilityOutlinedIcon />
            </button>
          </ErrorBoundary>
        )}
        {detailsPage && (
          <ErrorBoundary>
            <AddToWishlist productSku={productSku} card detailsPage />
          </ErrorBoundary>
        )}
        {detailsPage && (
          <ErrorBoundary>
            <ButtonMui
              onClick={() => {
                addProductToCompare();
              }}
              isLoading={loading}
              className="flex cursor-pointer text-primary items-center gap-2.5 border-0 bg-transparent px-5 py-2.5 text-base font-semibold md:px-10"
            >
              <LeaderboardRoundedIcon className="text-sm font-normal" />
              <span className="lg:inline md:inline hidden">
                {' '}
                {t('Add To Compare')}{' '}
              </span>
              <span className="lg:hidden md:hidden block">
                {' '}
                {t('Compare')}{' '}
              </span>
            </ButtonMui>
          </ErrorBoundary>
        )}
      </div>
      <ErrorBoundary>
        <QuickView open={quickView} setOpen={setQuickView} />
      </ErrorBoundary>{' '}
    </ErrorBoundary>
  );
}

import Clear from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import { setCompareList } from '@store/user';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useToast } from '@voguish/module-theme/components/toast/hooks';
import { decode } from 'base-64';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteCompareList } from '../Hooks/useDeleteCompareList';
import { useRemoveProductsFromCompareList } from '../Hooks/useRemoveProductsFromCompareList';
import { AUTHORIZED, BRAND_HEX_CODE } from '@utils/Constants';
import { ButtonMui } from '@packages/module-theme/components/ui/ButtonMui';
import { CircularProgress } from '@mui/material';

/**
 * Props for RemoveItemCompare component
 */
interface Props {
  /** ID of the product to remove */
  productId?: string;

  /** If true, clears the entire comparison list */
  allClear?: boolean;

  /** Refetch function to reload comparison list data */
  refetch: () => void;
}

/**
 * Component that handles removing a single product or clearing all products
 * from the comparison list. Works for both authenticated and guest users.
 *
 * - For authenticated users, it triggers API hooks
 * - For guests, it updates Redux state
 *
 * @param {string} productId - Optional product ID to remove
 * @param {boolean} allClear - If true, clear the entire list
 * @param {Function} refetch - Callback to refetch data after action
 */
export const RemoveItemCompare = ({ productId, allClear, refetch }: Props) => {
  // Hook to remove a product from comparison list (authenticated)
  const {
    removeProductsFromCompareListHandler,
    loading: isCompareItemDeleting,
  } = useRemoveProductsFromCompareList();

  // Hook to delete the full comparison list (authenticated)
  const { deleteCompareListHandler, loading } = useDeleteCompareList();

  // Get session status
  const { status } = useSession();

  // Redux utilities
  const dispatch = useDispatch();

  // Toast notification utility
  const { showToast } = useToast();

  // Translation hook
  const { t } = useTranslation('common');

  // Get current comparison list data
  const compareProduct = useSelector((state: any) => state?.user?.compareList);
  const compareData = compareProduct?.data || null;

  // Get compare list ID from Redux (used for API calls)
  const compareId = useSelector(
    (state: { user: { compareId: { ID: string | number } } }) =>
      state?.user?.compareId?.ID
  );

  /**
   * Clears the entire comparison list.
   * - If authenticated: calls the API
   * - If guest: shows a toast message
   */
  const clearCompareList = () => {
    if (status === AUTHORIZED && compareId) {
      deleteCompareListHandler(compareId);
      refetch();
    } else {
      showToast({ message: t('You cleared the comparison list.') });
      refetch();
    }
  };

  /**
   * Removes a single product from the comparison list.
   * - If authenticated: uses API call
   * - If guest: manually updates Redux state
   *
   * @param {number} productId - The ID of the product to remove
   */
  const removeCompareProduct = (productId: number) => {
    if (status === AUTHORIZED && compareId) {
      removeProductsFromCompareListHandler(compareId, productId);
    } else {
      const key = 'website-id-1-' + productId;

      if (
        compareData &&
        Object.prototype.hasOwnProperty.call(compareData, key)
      ) {
        const newData: any = {};

        Object.entries(compareData)
          .filter(([index]) => index !== key)
          .forEach(([key, value]) => (newData[key] = value));

        dispatch(setCompareList(newData));
      }

      showToast({
        message: t('You removed product to the comparison list.'),
      });
    }

    refetch();
  };

  // UI rendering based on whether clearing all items or removing one
  return (
    <ErrorBoundary>
      {!allClear ? (
        <ErrorBoundary>
          <Button
            sx={{ minWidth: 0, px: 0 }}
            className="grid relative w-8 h-8 py-0 border border-solid rounded-full border-closeIconColor text-closeIconColor"
            onClick={() => removeCompareProduct(Number(decode(`${productId}`)))}
          >
            {isCompareItemDeleting ? (
              <CircularProgress
                size={15}
                style={{ color: BRAND_HEX_CODE, margin: 'auto' }}
              />
            ) : (
              <Clear className="text-xl m-auto rounded" />
            )}
          </Button>
        </ErrorBoundary>
      ) : (
        <ErrorBoundary>
          <ButtonMui
            isLoading={loading}
            variant="text"
            onClick={() => clearCompareList()}
          >
            {t('Clear All')}
          </ButtonMui>
        </ErrorBoundary>
      )}
    </ErrorBoundary>
  );
};

export default RemoveItemCompare;

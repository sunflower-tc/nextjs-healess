import { useMutation } from '@apollo/client';
import { setCompareList, setCompareListForGuest } from '@store/user';
import RemoveProductsFromCompareList from '@voguish/module-compare/graphql/mutation/RemoveProductsFromCompareList.graphql';
import { useToken } from '@voguish/module-customer/hooks/useToken';
import { useToast } from '@voguish/module-theme/components/toast/hooks';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';

/**
 * Hook to delete product from compare list
 *
 */
export const useRemoveProductsFromCompareList = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const [removeProductsFromCompareList, { loading }] = useMutation(
    RemoveProductsFromCompareList
  );
  const { showToast } = useToast();
  const { t } = useTranslation('common');

  /**
   *
   * @param {String} uid
   * @param {Array} products
   */
  const removeProductsFromCompareListHandler = (
    uid: string | number,
    productId: string | number
  ) => {
    try {
      removeProductsFromCompareList({
        variables: { input: { uid: uid, products: [productId] } },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      }).then((res) => {
        showToast({ message: t('Removed From Compare List!') });
        const compareList = res?.data?.removeProductsFromCompareList || null;
        dispatch(setCompareList(compareList));
        dispatch(setCompareListForGuest(false));
      });
    } catch (error: any) {
      showToast({ message: error.message, type: 'error' });
    }
  };

  return { removeProductsFromCompareListHandler, loading };
};

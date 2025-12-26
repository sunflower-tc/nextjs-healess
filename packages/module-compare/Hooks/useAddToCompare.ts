import { useCustomerMutation } from '@voguish/module-customer/hooks/useCustomerMutation';
import { setCompareList, setCompareListForGuest } from '@store/user';
import { ProductItemInterface } from '@voguish/module-catalog/types';
import AddProductsToCompareList from '@voguish/module-compare/graphql/mutation/AddProductsToCompareList.graphql';
import { useToken } from '@voguish/module-customer/hooks/useToken';
import { useToast } from '@voguish/module-theme/components/toast/hooks';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';

/**
 * Hook to add product to compare list
 *
 * @param {String} token
 */
export const useAddToCompare = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const [addToCompare, { loading }] = useCustomerMutation(
    AddProductsToCompareList
  );
  const { showToast } = useToast();
  const { t } = useTranslation('common');

  /**
   *
   * @param {String} uid
   * @param {Array} products
   */
  const addToCompareHandler = ({
    uid,
    products,
  }: {
    uid: string | number;
    products: ProductItemInterface[];
  }) => {
    addToCompare({ variables: { input: { uid: uid, products: products } } })
      .then((res) => {
        showToast({ message: t('Added to Compare List') });
        const compareList = res?.data?.addProductsToCompareList || null;
        dispatch(setCompareList(compareList));
        dispatch(setCompareListForGuest(false));
      })
      .catch((err) => {
        showToast({
          message:
            (err?.graphQLErrors[0]?.message ||
              err?.networkError?.message ||
              err?.message ||
              err) ??
            'UNEXPECTED ERROR OCCURRED',
          type: 'error',
        });
      });
  };

  return { addToCompareHandler, loading };
};

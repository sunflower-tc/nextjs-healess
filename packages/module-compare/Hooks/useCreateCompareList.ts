import { useMutation } from '@apollo/client';
import {
  setCompareList,
  setCompareListForGuest,
  setCompareListId,
} from '@store/user';
import { ProductItemInterface } from '@voguish/module-catalog/types';
import CreateCompareList from '@voguish/module-compare/graphql/mutation/CreateCompareList.graphql';
import { useToken } from '@voguish/module-customer/hooks/useToken';
import { useToast } from '@voguish/module-theme/components/toast/hooks';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
/**
 * Hook to add product to compare list in case of no have data in list
 *
 */
export const useAddToCompareOnEmpty = () => {
  const token = useToken();
  const dispatch = useDispatch();
  const [addToCompareOnEmpty, { loading }] = useMutation(CreateCompareList);
  const { showToast } = useToast();
  const { t } = useTranslation('common');

  /**
   *
   * @param {String} uid
   * @param {Array} products
   */
  const addToCompareOnEmptyHandler = ({
    products,
  }: {
    products: ProductItemInterface;
  }) => {
    addToCompareOnEmpty({
      variables: { input: { products: products } },
      context: {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
    })
      .then((res) => {
        dispatch(setCompareList(res?.data?.createCompareList));
        const uid = res?.data?.createCompareList?.uid;
        dispatch(setCompareListId(uid));
        dispatch(setCompareListForGuest(false));
        showToast({
          message: t('You added product to the comparison list.'),
        });
      })
      .catch((error: any) => {
        showToast({ message: error.message, type: 'error' });
      });
  };

  return { addToCompareOnEmptyHandler, loading };
};

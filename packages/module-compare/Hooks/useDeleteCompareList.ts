import { useMutation } from '@apollo/client';
import { removeCompareData, removeCompareListId } from '@store/user';
import DeleteCompareList from '@voguish/module-compare/graphql/mutation/DeleteCompareList.graphql';
import { useToken } from '@voguish/module-customer/hooks/useToken';
import { useToast } from '@voguish/module-theme/components/toast/hooks';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
/**
 * Hook to delete compare product list
 *
 */
export const useDeleteCompareList = () => {
  const token = useToken();
  const { showToast } = useToast();

  const dispatch = useDispatch();
  const [deleteCompareList, { loading }] = useMutation(DeleteCompareList);
  const { t } = useTranslation('common');

  /**
   *
   * @param {String} uid
   */
  const deleteCompareListHandler = (uid: string | number) => {
    deleteCompareList({
      variables: { uid: uid },
      context: {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
    })
      .then(() => {
        dispatch(removeCompareData());
        dispatch(removeCompareListId());
        showToast({ message: t('You cleared the comparison list.') });
      })
      .catch((error: any) => {
        showToast({ message: error.message, type: 'error' });
      });
  };

  return { deleteCompareListHandler, loading };
};

import Reorder_Items from '@voguish/module-customer/graphql/mutation/ReorderItems.graphql';
import { useCustomerMutation } from '@voguish/module-customer/hooks/useCustomerMutation';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useToast } from '@voguish/module-theme/components/toast/hooks';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ButtonMui } from '@voguish/module-theme/components/ui/ButtonMui';
import { useAppDispatch } from '@store/hooks';
import { setCart } from '@store/cart';
import { isValidObject } from '@utils/Helper';
type OrderIdType = {
  orderId?: string | number | {};
  reorderClass?: string;
};
const ReOrderItem = ({ orderId, reorderClass }: OrderIdType) => {
  const { showToast } = useToast();
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [ReorderItems, { loading }] = useCustomerMutation(Reorder_Items);
  const orderClick = () => {
    ReorderItems({
      variables: {
        orderNumber: orderId,
      },
    })
      .then((res) => {
        const data = res?.data?.reorderItems;
        if (isValidObject(data) && data.cart.id) {
          dispatch(setCart({ ...data?.cart }));
        }
        router.push('/checkout/cart');
      })
      .catch((err) => {
        showToast({
          message:
            (err?.graphQLErrors[0]?.message || err?.message || err) ??
            'UNEXPECTED ERROR OCCURRED',
          type: 'error',
        });
      });
  };
  return (
    <ErrorBoundary>
      <ButtonMui
        variant="text"
        className={` font-normal ${reorderClass}`}
        onClick={orderClick}
        color="secondary"
        isLoading={loading}
      >
        {t('Reorder')}
      </ButtonMui>
    </ErrorBoundary>
  );
};
export default ReOrderItem;

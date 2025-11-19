import { Trans } from '@lingui/macro';
import Button from '@mui/material/Button';
import { showToast } from '@utils/Helper';
import Reorder_Items from '@voguish/module-customer/graphql/mutation/ReorderItems.graphql';
import { useCustomerMutation } from '@voguish/module-customer/hooks';
import { useRouter } from 'next/router';
type OrderIdType = {
  orderId?: string | number | {};
};
const ReOrderItem = ({ orderId }: OrderIdType) => {
  const router = useRouter();
  const [
    ReorderItems,
    /* { data: addToCartData, loading: addToCartLoading, error: addToCartError },
     */
  ] = useCustomerMutation(Reorder_Items);
  const orderClick = () => {
    ReorderItems({
      variables: {
        orderNumber: orderId,
      },
    })
      .then(() => {
        router.push('/checkout/cart');
      })
      .catch((err) => {
        showToast({ message: err.message, type: 'error' });
      });
  };
  return (
    <Button
      variant="text"
      className="font-normal"
      onClick={orderClick}
      color="secondary"
    >
      <Trans>Reorder</Trans>
    </Button>
  );
};
export default ReOrderItem;

import { Trans } from '@lingui/macro';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { clearCart, setCart } from '@store/cart';
import { getFormattedPrice } from '@utils/Helper';
import { createEmptyCart, usePlaceOrder } from '@voguish/module-quote/hooks';
import { CartInterface, CheckoutStepReview } from '@voguish/module-quote/types';
import { LoadingButtton } from '@voguish/module-theme';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import FormWrapper from './FormWrapper';
const AddressCard = dynamic(() => import('./Address/AddressCard'));
const ArrowBack = dynamic(() => import('@mui/icons-material/ArrowBack'));

const ReviewOrder = ({
  selectedShippingMethod,
  selectedShippingAddress,
  selectedPaymentMethod,
  cartId,
  token,
  isVirtual,
  handlePrev,
}: CheckoutStepReview) => {
  const { placeOrderHandler, isInProcess } = usePlaceOrder();
  const router = useRouter();
  const dispatch = useDispatch();
  /**
   * Place order
   */
  const placeOrder = async () => {
    await placeOrderHandler(cartId);
    //dispatch(removeCheckoutData());
    if (!isInProcess) {
      const afterFetchingCart = async (cartData: CartInterface) => {
        dispatch(setCart({ ...cartData, isGuest: true }));
      };
      await createEmptyCart(token, afterFetchingCart);
      router.push('/checkout/success');
      dispatch(clearCart());
    }
  };
  return (
    <>
      <FormWrapper className="lg:ml-0.5 xl:ml-1">
        {selectedShippingAddress && (
          <Grid className="grid md:grid-cols-2 gap-7">
            {!isVirtual && (
              <span>
                <Typography
                  sx={{ fontSize: 16, fontWeight: 500, mb: 0.5 }}
                  variant="subtitle1"
                >
                  <Trans>Delivery address</Trans>
                </Typography>
                <AddressCard address={selectedShippingAddress} />
              </span>
            )}
            <span>
              {!isVirtual && (
                <>
                  <Typography
                    sx={{ fontSize: 16, fontWeight: 500, mb: 0.5 }}
                    variant="subtitle1"
                  >
                    <Trans>Shipping Mode</Trans>
                  </Typography>
                  <Grid
                    className="rounded-md"
                    sx={{ backgroundColor: '#F3F3F3' }}
                  >
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontSize: 16, fontWeight: 500 }}
                        color="text.main"
                      >
                        {`${selectedShippingMethod?.carrier_title
                          }-${getFormattedPrice(
                            selectedShippingMethod?.amount.value,
                            selectedShippingMethod?.amount.currency
                          )} `}
                      </Typography>
                    </CardContent>
                  </Grid>
                </>
              )}
              <Typography
                sx={{ fontSize: 16, fontWeight: 500, mt: 2, mb: 0.5 }}
                variant="subtitle1"
              >
                <Trans>Payment Mode</Trans>
              </Typography>
              <Grid className="rounded-md" sx={{ backgroundColor: '#F3F3F3' }}>
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontSize: 16, fontWeight: 500 }}
                    color="text.main"
                  >
                    {`${selectedPaymentMethod?.title}`}
                  </Typography>
                </CardContent>
              </Grid>
            </span>
          </Grid>
        )}
      </FormWrapper>
      <Grid className="flex items-center justify-between w-full py-5">
        <Button
          onClick={handlePrev}
          className="flex px-2 rounded-none shadow-none py-0.5 space-x-3 font-normal tracking-widest"
          sx={{ color: '#2C3145', minWidth: 0 }}
        >
          <ArrowBack />
          <span>
            <Trans>Go to Payment</Trans>
          </span>
        </Button>
        {isInProcess ? (
          <div className="flex items-center justify-between md:w-1/3">
            <LoadingButtton className="rounded-none shadow-none py-3.5 px-7 w-full flex justify-center" />
          </div>
        ) : (
          <Button
            className="rounded-none shadow-none md:w-1/3"
            variant="contained"
            onClick={placeOrder}
          >
            <Trans>Place Order</Trans>
          </Button>
        )}
      </Grid>
    </>
  );
};
export default ReviewOrder;

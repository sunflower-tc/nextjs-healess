import { Trans } from '@lingui/macro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { clearCart, setCart } from '@store/cart';
import { convertStringToHTML, getUserAgent, sortPaymentOptions } from '@utils/Helper';
import PaypalWrapper from '@voguish/module-quote/Components/Checkout/Payment/PayPalWrapper';
import { createEmptyCart, useCreateNihaopayToken, usePlaceOrder, useSetPaymentMethodOnCart } from '@voguish/module-quote/hooks';
import { CartInterface, CheckoutStepPayment } from '@voguish/module-quote/types';
import { AdyenPay, AirwallexCard, LoadingButtton, NihaopayPaymentsAlipay, NihaopayPaymentsUnionpay, NihaopayPaymentsWechatpay, PaypalExpress } from '@voguish/module-theme';
import BackDropLoader from '@voguish/module-theme/components/ui/Form/Elements/BackDropLoader';
import { useRouter } from 'next/router';
import React, { ChangeEvent, Fragment, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import FormWrapper from './FormWrapper';


const Payment = ({
  handlePrev,
  handleNext,
  cartId,
  token,
  availablePaymentMethods,
  selectedPaymentMethod,
}: CheckoutStepPayment) => {
  useForm();
  const { locale } = useRouter();
  console.log('locale', locale)
  const dispatch = useDispatch();
  const redirectHtmlRef = useRef<HTMLElement | null>(null);
  const [showRedirectUrl, setShowRedirectUrl] = useState<boolean>(false)

  const { setPaymentMethodsHandler, isInProcess } = useSetPaymentMethodOnCart();

  const { createNihaopayTokenHandler, isInProcess: createLoading } = useCreateNihaopayToken();
  const { placeOrderHandler, isInProcess: isInPlaceOrderProcess } = usePlaceOrder();

  const selectPaymentMethod = async (event: ChangeEvent<HTMLInputElement>, value: string) => {
    const checked = event.target.checked;
    if (checked && value) {
      await setPaymentMethodsHandler({
        cartId,
        paymentMethod: { code: value },
      });
    }
  };
  const paymentMethodOptions = useMemo(() => sortPaymentOptions(availablePaymentMethods), [availablePaymentMethods]);

  const selectedPayment = selectedPaymentMethod.code;

  const paymentIconsMap: Record<string, React.ReactNode> = {
    nihaopay_payments_unionpay: <NihaopayPaymentsUnionpay />,
    nihaopay_payments_alipay: <NihaopayPaymentsAlipay />,
    nihaopay_payments_wechatpay: <NihaopayPaymentsWechatpay />,
    paypal_express: <PaypalExpress />,
    airwallex_payments_card: <AirwallexCard />,
    adyen_cc: <AdyenPay />
  };

  const placeOrder = async () => {
    if (selectedPayment?.includes('nihaopay_payments')) {
      setShowRedirectUrl(false);
      redirectHtmlRef.current = null;
      const return_url = `https://${window.location.hostname}/thank-you`;
      const terminal = getUserAgent();
      const result = await createNihaopayTokenHandler({
        terminal,
        return_url,
        cart_id: cartId,
      });
      const redirectUrl = result?.createNihaopayToken?.redirectUrl;
      if (!redirectUrl) return;
      await placeOrderHandler(cartId);
      redirectHtmlRef.current = convertStringToHTML(redirectUrl);
      setShowRedirectUrl(true);
      if (isInPlaceOrderProcess) return;

      const afterFetchingCart = async (cartData: CartInterface) => {
        dispatch(setCart({ ...cartData, isGuest: true }));
      };
      await createEmptyCart(token, afterFetchingCart);
      setTimeout(() => dispatch(clearCart()), 1500);
    }
  };

  console.log('paymentMethodOptions', paymentMethodOptions);
  return (
    <Box>
      <FormWrapper>
        <Box sx={{ mt: 1, width: '100%' }}>
          {

            <RadioGroup defaultValue={selectedPayment} onChange={selectPaymentMethod}>
              {paymentMethodOptions.map((option) => (
                <Box key={option.value}>
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    className='py-2'
                    label={<Stack direction={'row'} spacing={1} className='py-2'>
                      <Box sx={{ width: 64, height: 28 }}>
                        {paymentIconsMap[option.value] ?? null}
                      </Box>
                      <Typography variant='body1'>{option.label}</Typography>
                    </Stack>}
                  />
                  {option.value === 'paypal_express' && selectedPayment === 'paypal_express' && (
                    <Box mt={1}>
                      <PaypalWrapper />
                    </Box>
                  )}
                </Box>

              ))}
            </RadioGroup>
          }
          {
            selectedPayment?.includes('nihaopay_payments') && <Fragment>
              {createLoading ? (
                <div className="flex items-center justify-between md:w-1/3">
                  <LoadingButtton className="rounded-none shadow-none py-3.5 px-7 w-full flex justify-center" />
                </div>
              ) : (
                <Button
                  className="rounded-none shadow-none md:w-1/3"
                  variant="contained"
                  onClick={placeOrder}
                  disabled={!selectedPayment || isInProcess || createLoading}
                >
                  <Trans>Place Order</Trans>
                </Button>
              )}
            </Fragment>
          }
        </Box>
      </FormWrapper>
      {/* nihaopay redirect form */}
      {
        showRedirectUrl && <div dangerouslySetInnerHTML={{ __html: redirectHtmlRef }} />
      }

      {/* select paymethod loading */}
      {(isInProcess || createLoading || isInPlaceOrderProcess) && <BackDropLoader />}
    </Box>

  );
};
export default Payment;

import { t } from '@lingui/macro';
import CircularProgress from '@mui/material/CircularProgress';
import { CreateOrderActions, CreateOrderData, loadScript, OnApproveData, PayPalScriptOptions } from '@paypal/paypal-js';
import { clearCart } from '@store/cart';
import { PAYPAL_CLIENT_ID } from '@utils/Constants';
import { getPaypalCurrency, showToast } from '@utils/Helper';
import { useToken } from '@voguish/module-customer/hooks/useToken';
import { useCreatePaypayToken, usePlaceOrder, useSetPayPalPaymentMethodOnCart } from '@voguish/module-quote/hooks';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useId, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';


export default function PaypalWrapper() {
  const containerId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const quote = useSelector((state: RootState) => state.cart?.quote || null);
  const token = useToken();
  const { createPaypalTokenHandler } = useCreatePaypayToken();
  const { setPayPalPaymentMethodOnCartHandler } = useSetPayPalPaymentMethodOnCart()
  const { placeOrderHandler, isInProcess } = usePlaceOrder();
  const placeOrder = async () => {
    if (quote?.id) {
      const orderNumber = await placeOrderHandler(quote?.id);
      console.log('placeOrderHandler orderNumber', orderNumber)
      console.log('placeOrderHandler isInProcess', isInProcess)
      if (!isInProcess && orderNumber) {
        // const afterFetchingCart = async (cartData: CartInterface) => {
        //   dispatch(setCart({ ...cartData, isGuest: true }));
        // };
        // await createEmptyCart(token, afterFetchingCart);

        router.push('/checkout/success');
        dispatch(clearCart());
      }
    }
  }

  const createOrder = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_data: CreateOrderData, _actions: CreateOrderActions) => {
      if (!quote?.id || !quote?.prices?.grand_total) {
        throw new Error('Cart information is missing');
      }
      // Create PayPal token on backend
      const result = await createPaypalTokenHandler({
        cart_id: quote.id,
        code: 'paypal_express',
        express_button: true,
        return_url: 'paypal/action/return.html',
        cancel_url: 'paypal/action/cancel.html',
      });
      return result?.token || '';
    },
    [createPaypalTokenHandler, quote]
  );

  const onApprove = useCallback(async (_data: OnApproveData) => {
    const { orderID, payerID } = _data;
    if (orderID && payerID && quote?.id) {
      await setPayPalPaymentMethodOnCartHandler({
        cart_id: quote?.id,
        code: 'paypal_express',
        payer_id: payerID,
        token: orderID,
      })
      await placeOrder();
    }
  }, []);

  const onCancel = useCallback(async () => {
    showToast({ message: t`You cancelled the payment.`, type: 'warning' });
    await router.push('/checkout/cart');
  }, []);

  useEffect(() => {
    // Prevent multiple initializations
    const container = containerRef.current;
    if (isInitializedRef.current || !container) return;

    const paypalScriptOptions: PayPalScriptOptions = {
      clientId: PAYPAL_CLIENT_ID,
      intent: 'capture',
      currency: (locale && getPaypalCurrency(locale)) || 'GBP'
    };

    setIsLoading(true);
    loadScript(paypalScriptOptions)
      .then((paypal) => {
        if (!paypal?.Buttons || !container) {
          setIsLoading(false);
          return;
        }

        // Clear container before rendering
        container.innerHTML = '';

        // Render PayPal buttons
        const buttons = paypal.Buttons({
          createOrder,
          onApprove,
          onCancel,
        });

        buttons.render(container);
        isInitializedRef.current = true;
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [createOrder, onApprove, onCancel]);

  return (
    <Fragment>
      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <CircularProgress className="mx-auto text-brand/80" color="primary" />
        </div>
      )}
      <div ref={containerRef} id={`paypal-button-container-${containerId}`} />
    </Fragment>
  );
}
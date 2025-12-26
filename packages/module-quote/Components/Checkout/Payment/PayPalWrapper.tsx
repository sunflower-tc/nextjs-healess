import CircularProgress from '@mui/material/CircularProgress';
import { CreateOrderActions, CreateOrderData, loadScript, OnApproveData, PayPalScriptOptions } from '@paypal/paypal-js';
import { clearCart } from '@store/cart';
import { removeCheckoutData } from '@store/checkout';
import { PAYPAL_CLIENT_ID } from '@utils/Constants';
import { getPaypalCurrency } from '@utils/Helper';
import { useCreatePaypayToken, usePlaceOrder, useSetPayPalPaymentMethodOnCart } from '@voguish/module-quote/hooks';
import { useToast } from '@voguish/module-theme/components/toast/hooks';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useId, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

export default function PaypalWrapper() {
  const { showToast } = useToast();
  const containerId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const quote = useSelector((state: RootState) => state.cart?.quote || null);
  const { createPaypalTokenHandler } = useCreatePaypayToken();
  const { setPayPalPaymentMethodOnCartHandler } = useSetPayPalPaymentMethodOnCart()
  const { placeOrderHandler, isInProcess } = usePlaceOrder();
  const { t } = useTranslation('common');

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
      });
      const orderNumber = await placeOrderHandler(quote.id);
      if (!isInProcess && orderNumber) {
        await router.replace('/checkout/success').then(() => {
          dispatch(removeCheckoutData());
          dispatch(clearCart());
        });
      }
    }
  }, [quote?.id, setPayPalPaymentMethodOnCartHandler, placeOrderHandler, isInProcess, router, dispatch]);

  const onCancel = useCallback(async () => {
    showToast({ message: t`You cancelled the payment.`, type: 'warning' });
    await router.push('/checkout/cart');
  }, [router]);

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
  }, [locale, createOrder, onApprove, onCancel]);

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
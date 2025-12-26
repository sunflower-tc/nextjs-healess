import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
import { InfoOutlined } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getAdyenCountryCode, getAdyenLocal, showToast } from '@utils/Helper';
import {
  useCustomerMutation
} from '@voguish/module-customer';
import GetAdyenPayDetailGQL from '@voguish/module-quote/graphql/mutation/GetAdyenPayDetail.graphql';
import { usePlaceOrderFromAdyen } from '@voguish/module-quote/hooks';
import { AdyenOrder } from '@voguish/module-quote/types';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';


export default function AdyenCardPayWrapper() {
  const { locale } = useRouter();
  const aydenRef = useRef<any>(null);
  const order = useRef<AdyenOrder>({} as AdyenOrder);
  const cardComponent = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const quote = useSelector((state: RootState) => state.cart?.quote || null);
  const { placeOrderFromAdyenHandler, isInProcess } = usePlaceOrderFromAdyen();
  const [getAdyenPaymentDetails, { loading: adyenDetailsLoading }] = useCustomerMutation(GetAdyenPayDetailGQL);

  const [errors, setAdyenError] = useState<any>();
  const [adyenPaymentDetails, setAdyenPaymentDetails] = useState<any>();

  const handleOnChange = (state: any, component: any) => {
    cardComponent.current = component;
  }
  const handleAdditionalDetails = async (state: any, component: any) => {
    console.log('----  handleAdditionalDetails TRIGGERED', state);
    console.log('----  handleAdditionalDetails state.data:', state.data);
    console.log('----  handleAdditionalDetails component:', component);

    const paramData = state.data;
    cardComponent.current = component;

    if (!quote?.id) {
      console.error('handleAdditionalDetails: Quote ID is missing');
      showToast({ message: 'Cart is missing. Please refresh the page.', type: 'error' });
      return;
    }

    try {
      const request = { ...paramData, orderId: order.current?.order_number };
      console.log('handleAdditionalDetails request:', request);

      const result = await getAdyenPaymentDetails({
        variables: {
          payload: JSON.stringify(request),
          cartId: quote.id,
        },
      });

      console.log('handleAdditionalDetails result:', result);

      const adyenPaymentDetails = result?.data?.adyenPaymentDetails;
      const errors = result?.errors || [];

      console.log('handleAdditionalDetails data', adyenPaymentDetails);
      console.log('handleAdditionalDetails errors', errors);

      setAdyenPaymentDetails(adyenPaymentDetails);

      if (errors && errors.length > 0) {
        setAdyenError(errors[0]);
        showToast({ message: errors[0]?.message, type: 'error' });
        return;
      }

      if (!adyenPaymentDetails) {
        console.error('handleAdditionalDetails: No payment details returned');
        showToast({ message: 'No payment details received. Please try again.', type: 'error' });
        return;
      }

      if (order.current?.order_number) {
        handleServerResponse(adyenPaymentDetails, component);
      } else {
        console.warn('handleAdditionalDetails: order_number is missing');
      }
    } catch (error: any) {
      console.error('handleAdditionalDetails error:', error);
      setAdyenError(error);
      showToast({
        message: error?.message || 'Error processing payment details. Please try again.',
        type: 'error'
      });
    }
  }
  const handlePlaceOrder = async (cardDetails: any) => {
    console.log('----handlePlaceOrder ', cardDetails)
    if (quote?.id) {
      try {
        const path = '/thank-you';
        const stateData = JSON.parse(cardDetails);
        const ccType = stateData.paymentMethod.brand;
        const params = {
          cart_id: quote.id,
          cc_type: ccType,
          guestEmail: quote.email,
          code: 'adyen_cc',
          return_url: `https://${window.location.hostname}${path}`,
          stateData: cardDetails,
        };
        console.log('params', params);
        const { data, error } = await placeOrderFromAdyenHandler(params);
        console.log('data', data);
        console.log('error placeOrderFromAdyenHandler2', error);
        if (error) {
          console.log('error placeOrderFromAdyenHandler1', error);
        }
        if (data?.order) {
          order.current = data.order;
          if (data.order?.order_number) {
            setAdyenPaymentDetails(data.order?.adyen_payment_status)
            handleServerResponse(data.order?.adyen_payment_status, cardComponent.current);
          } else {
            console.warn('Order created but order_number is missing');
          }
        } else {
          console.error('No order data returned from placeOrderFromAdyenHandler');
          showToast({ message: 'Failed to place order. Please try again.', type: 'error' });
        }
      } catch (error: any) {
        console.error('Error in handlePlaceOrder:', error);
        showToast({
          message: error?.message || 'Failed to place order. Please try again.',
          type: 'error'
        });
      }
    } else {
      console.error('Quote ID is missing');
      showToast({ message: 'Cart is missing. Please refresh the page.', type: 'error' });
    }
  }
  const onSubmit = (state: any) => {
    console.log('---- Adyen onSubmit state:', state);
    handlePlaceOrder(JSON.stringify(state.data));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const handleServerResponse = (result: any, component: any) => {
    // Intentionally left blank: handle payment result if needed
    console.log('---- Adyen handleServerResponse state  result:', result);
    console.log('---- Adyen handleServerResponse state component:', component);
    const SUCCESS_CODE = ['Authorised', 'Received', 'PresentToShopper'];

    if (result?.action) {
      try {
        // result.action 可能是字符串或对象
        let actionData = result.action;
        if (typeof actionData === 'string') {
          actionData = JSON.parse(actionData);
        }
        console.log('*** Got Res Action ***:', actionData);
        console.log('*** Calling component.handleAction ***');

        // 确保 component 存在且有 handleAction 方法
        if (component && typeof component.handleAction === 'function') {
          component.handleAction(actionData);
        } else {
          console.error('Component or handleAction method is missing', component);
          showToast({ message: 'Payment component error. Please try again.', type: 'error' });
        }
      } catch (error) {
        console.error('Error parsing or handling action:', error);
        showToast({ message: 'Error processing payment action. Please try again.', type: 'error' });
      }
    } else if (result?.isFinal && SUCCESS_CODE.includes(result.resultCode)) {
      showToast({ message: 'Congratualations! You have paid it successfully!', type: 'success' });
      console.log('redirect Thank you')
      // setCart(null);
      // $vsf.$magento.config.state.removeCartId();
      // await loadCart();
    } else {
      console.warn('Unexpected result format:', result);
    }
  }
  const initiateCheckout = async () => {
    console.log('init local', locale && getAdyenLocal(locale))
    console.log('init ADYEN_CLIENT_KEY', process.env.ADYEN_CLIENT_KEY)
    try {
      const configuration: any = {
        locale: locale && getAdyenLocal(locale) || 'en_US',
        countryCode: locale && getAdyenCountryCode(locale) || 'GB',
        // environment: process.env.NODE_ENV === 'development' ? 'test' : 'live',
        environment: 'live',
        showPayButton: true,
        clientKey: 'live_KLPF3S66KFE7RCXIAFJGH4WYSMQYA6U4',
        analytics: {
          enabled: true, // Set to false to not send analytics data to Adyen.
        },
        onAdditionalDetails: handleAdditionalDetails, // Pass the updated callback function here
        onChange: handleOnChange,
        onSubmit,
        onError: (error: any, component: any) => {
          // eslint-disable-next-line no-console
          console.log('---- onError ', error);
          console.error(error.name, error.message, component);
          setAdyenError(error)
          showToast({ message: error.message, type: 'error' });
        },
        onPaymentCompleted: (result: any, component: any) => {
          console.log(`--- [onPaymentCompleted result: ${result}`);
          handleServerResponse(result, component);
        },
        paymentMethodsConfiguration: {
          card: {
            hasHolderName: true,
            holderNameRequired: true,
            billingAddressRequired: false,
            name: 'Credit or debit card',
            brands: ['visa', 'amex', 'diners', 'discover', 'maestro', 'mc'],
            details: [
              { key: 'holderName', type: 'text' },
              { key: 'number', type: 'text' },
              { key: 'expiryMonth', type: 'text' },
              { key: 'expiryYear', type: 'text' },
              { key: 'cvc', type: 'text' },
            ],
            validationRules: {},
          },
        }
      };
      const checkout: any = await AdyenCheckout(configuration);

      // 创建 card component 时，确保 onAdditionalDetails 也在 card 配置中
      const cardConfig: any = {
        onAdditionalDetails: handleAdditionalDetails,
        onChange: handleOnChange,
      };

      const cardComponentInstance: any = checkout.create('card', cardConfig).mount(aydenRef.current);
      cardComponent.current = cardComponentInstance;

      console.log('Card component created:', cardComponentInstance);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      showToast({ message: errorMessage, type: 'error' });
      // eslint-disable-next-line no-console
      console.error('Invalid data for payments', error);
    }
  };
  console.log('adyen-errors', errors)
  console.log('adyen- adyenPaymentDetails', adyenPaymentDetails)


  useEffect(() => {
    initiateCheckout()
      .catch((error) => {
        console.log('init effect catch error', error)
        // Errors are already handled in initiateCheckout
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <CircularProgress className="mx-auto text-brand/80" color="primary" />
        </div>
      )}
      <div ref={aydenRef} id='adyenpay-button-container' />
      {
        errors && <Stack direction="row" className="bg-red-100 p-2 round-sm mt-2 text-red-400">
          <InfoOutlined />
          <Typography>[paymentRefused] {errors.message}.</Typography>
        </Stack>
      }

    </Fragment>)
} 
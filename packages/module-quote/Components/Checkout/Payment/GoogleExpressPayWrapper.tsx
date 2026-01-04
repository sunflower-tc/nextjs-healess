import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
import { InfoOutlined } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { clearCart } from '@store/cart';
import { removeCheckoutData } from '@store/checkout';
import { getAdyenCountryCode, getAdyenLocal } from '@utils/Helper';
import { useCustomerMutation } from '@voguish/module-customer/hooks/useCustomerMutation';
import GetAdyenPayDetailGQL from '@voguish/module-quote/graphql/mutation/GetAdyenPayDetail.graphql';
import { usePlaceOrderFromAdyen } from '@voguish/module-quote/hooks';
import { AdyenOrder } from '@voguish/module-quote/types';
import { useToast } from '@voguish/module-theme/components/toast/hooks';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

export default function GoogleExpressPayWrappe() {
  const { locale } = useRouter();
  const { showToast } = useToast();
  const payRef = useRef<any>(null);
  const order = useRef<AdyenOrder>({} as AdyenOrder);
  const cardComponent = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const quote = useSelector((state: RootState) => state.cart?.quote || null);
  const { placeOrderFromAdyenHandler } = usePlaceOrderFromAdyen();
  const [getAdyenPaymentDetails] = useCustomerMutation(GetAdyenPayDetailGQL);

  const [errors, setAdyenError] = useState<any>();
  const [adyenPaymentDetails, setAdyenPaymentDetails] = useState<any>();

  const router = useRouter();
  const dispatch = useDispatch();

  const handleOnChange = (state: any, component: any) => {
    cardComponent.current = component;
  }
  const handleAdditionalDetails = async (state: any, component: any) => {
    console.log('----  handleAdditionalDetails TRIGGERED state / component', state, component);
    const paramData = state.data;
    cardComponent.current = component;
    if (!quote?.id) {
      showToast({ message: 'Cart is missing. Please refresh the page.', type: 'error' });
      return;
    }
    try {
      const request = { ...paramData, orderId: order.current?.order_number };

      const result = await getAdyenPaymentDetails({
        variables: {
          payload: JSON.stringify(request),
          cartId: quote.id,
        },
      });
      const adyenPaymentDetails = result?.data?.adyenPaymentDetails;
      const errors = result?.errors || [];
      setAdyenPaymentDetails(adyenPaymentDetails);

      if (errors && errors.length > 0) {
        setAdyenError(errors[0]);
        showToast({ message: errors[0]?.message, type: 'error' });
        return;
      }
      if (!adyenPaymentDetails) {
        showToast({ message: 'No payment details received. Please try again.', type: 'error' });
        return;
      }
      if (order.current?.order_number) {
        handleServerResponse(adyenPaymentDetails, component);
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
        const { data, error } = await placeOrderFromAdyenHandler(params);
        if (error) {
          console.log('error placeOrderFromAdyenHandler1', error);
        }
        if (data?.order) {
          order.current = data.order;
          if (data.order?.order_number) {
            setAdyenPaymentDetails(data.order?.adyen_payment_status)
            handleServerResponse(data.order?.adyen_payment_status, cardComponent.current);
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
      showToast({ message: 'Cart is missing. Please refresh the page.', type: 'error' });
    }
  }
  const onSubmit = (state: any) => {
    handlePlaceOrder(JSON.stringify(state.data));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const handleServerResponse = async (result: any, component: any) => {
    // Intentionally left blank: handle payment result if needed
    console.log('---- Adyen handleServerResponse state  result /  component', result);
    const SUCCESS_CODE = ['Authorised', 'Received', 'PresentToShopper'];

    if (result?.action) {
      try {
        // result.action 可能是字符串或对象
        let actionData = result.action;
        if (typeof actionData === 'string') {
          actionData = JSON.parse(actionData);
        }
        console.log('*** Got Res Action ***:', actionData);
        if (component && typeof component.handleAction === 'function') {
          component.handleAction(actionData);
        } else {
          console.error('Component or handleAction method is missing', component);
          showToast({ message: 'Payment component error. Please try again.', type: 'error' });
        }
      } catch (error) {
        showToast({ message: 'Error processing payment action. Please try again.', type: 'error' });
      }
    } else if (result?.isFinal && SUCCESS_CODE.includes(result.resultCode)) {
      showToast({ message: 'Congratualations! You have paid it successfully!', type: 'success' });
      console.log('redirect Thank you')
      await router.replace('/checkout/success').then(() => {
        dispatch(removeCheckoutData());
        dispatch(clearCart());
      });
    } else {
      console.warn('Unexpected result format:', result);
    }
  }
  const onPaymentDataChanged = async (intermediatePaymentData: any) => {
    console.log('---onPaymentDataChanged intermediatePaymentData', intermediatePaymentData)
  }
  const onPaymentAuthorized = async (paymentData: any) => {
    console.log('---onPaymentAuthorized intermediatePaymentData', paymentData);
  }
  const initiateCheckout = async () => {
    console.log('quote', quote)
    const PayConfiguration = {
      buttonType: 'checkout',
      buttonColor: 'white',
      // Step 2: Set the callback intents.
      callbackIntents: [
        'PAYMENT_AUTHORIZATION',
        'SHIPPING_ADDRESS',
        'SHIPPING_OPTION',
      ],
      environment:
        process.env.NODE_ENV === 'development' ? 'TEST' : 'PRODUCTION',
      // Step 3: Set shipping configurations.
      shippingAddressRequired: true, // https://developers.google.com/pay/api/web/reference/request-objects#ShippingAddressParameters
      shippingAddressParameters: {
        allowedCountryCodes: ['US', 'GB', 'CN', 'MX'],
        phoneNumberRequired: true,
      },
      emailRequired: true,
      shippingOptionRequired: true,
      billingAddressRequired: true,
      billingAddressParameters: {
        format: 'FULL',
        phoneNumberRequired: true,
      },
      isExpress: true,
      transactionInfo: {
        totalPriceStatus: 'ESTIMATED',
        totalPrice: quote?.prices.grand_total.value.toString(),
        currencyCode: quote?.prices.grand_total.currency,
        // countryCode:
        //   apiState.getLocale().toUpperCase() === 'MEX'
        //     ? 'MX'
        //     : apiState.getLocale().toUpperCase() ?? 'GB',
        countryCode: 'MEX',
        totalPriceLabel: 'Total',
      },
      configuration: {
        merchantId: 'BCR2DN4TWWLOTYQ2',
        gateway: 'adyen',
        merchantName: 'Unineed Limited',
        gatewayMerchantId: 'UnineedLimitedCOM',
      },
      paymentDataCallbacks: {
        onPaymentDataChanged,
        onPaymentAuthorized,
      },
      onAuthorized: (paymentData: any) => {
        console.log('***adyen -----onAuthorized----', paymentData);
      },
    };
    console.log('[** PayConfiguration:]', PayConfiguration);
    try {
      const configuration: any = {
        locale: locale && getAdyenLocal(locale) || 'en_US',
        countryCode: locale && getAdyenCountryCode(locale) || 'GB',
        // environment: process.env.NODE_ENV === 'development' ? 'test' : 'live',
        environment: 'live',
        showPayButton: true,
        // clientKey: 'live_KLPF3S66KFE7RCXIAFJGH4WYSMQYA6U4', //CN
        clientKey: 'live_WNZIHOZSIFCQ7KGKH5DTJVJZTUMLNBI3', //uk
        analytics: {
          enabled: true, // Set to false to not send analytics data to Adyen.
        },
        onAdditionalDetails: handleAdditionalDetails, // Pass the updated callback function here
        onChange: handleOnChange,
        onSubmit,
        onError: (error: any, component: any) => {
          // eslint-disable-next-line no-console
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

      const googleExpressPayComponent = checkout
        .create('googlepay', PayConfiguration)
        .mount(payRef.current);

      cardComponent.current = googleExpressPayComponent;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      showToast({ message: errorMessage, type: 'error' });
      // eslint-disable-next-line no-console
      console.error('Invalid data for payments', error);
    }
  };

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
      <div ref={payRef} id='adyen-express-googlepay-button-container' />
      {
        errors && <Stack direction="row" className="bg-red-100 p-2 round-sm mt-2 text-red-400">
          <InfoOutlined />
          <Typography>[paymentRefused] {errors.message}.</Typography>
        </Stack>
      }
      {
        adyenPaymentDetails && adyenPaymentDetails?.resultCode && ['Refused', 'Error'].includes(adyenPaymentDetails?.resultCode) &&
        <Stack direction="row" className="bg-red-100 p-2 round-sm mt-2 text-red-400">
          <InfoOutlined />
          <Typography>[Error Code:] {adyenPaymentDetails?.resultCode}.</Typography>
        </Stack>
      }
    </Fragment>)
} 
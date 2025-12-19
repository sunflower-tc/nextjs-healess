import { AdyenCheckout, Card, Dropin } from '@adyen/adyen-web';
import '@adyen/adyen-web/styles/adyen.css';
import CircularProgress from '@mui/material/CircularProgress';
import { getAdyenCountryCode, getAdyenLocal, showToast } from '@utils/Helper';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';

export default function AdyenCardPayWrapper() {
  const { locale } = useRouter();
  const aydenRef = useRef<any>(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleAdditionalDetails = () => {

  }
  const handleOnChange = () => {

  }
  const onSubmit = () => {

  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const handleServerResponse = (result: any, component: any) => {
    // Intentionally left blank: handle payment result if needed
  }

  const initiateCheckout = async () => {
    console.log('init local', locale && getAdyenLocal(locale))
    console.log('init ADYEN_CLIENT_KEY', process.env.ADYEN_CLIENT_KEY)
    try {
      const configuration: any = {
        locale: locale && getAdyenLocal(locale) || 'en_US',
        countryCode: locale && getAdyenCountryCode(locale) || 'GB',
        environment: process.env.NODE_ENV === 'development' ? 'test' : 'live',
        showPayButton: true,
        clientKey: process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY,
        analytics: {
          enabled: true, // Set to false to not send analytics data to Adyen.
        },
        onAdditionalDetails: handleAdditionalDetails, // Pass the updated callback function here
        onChange: handleOnChange,
        onSubmit,
        onError: (error: any, component: any) => {
          // eslint-disable-next-line no-console
          console.error(error.name, error.message, component);
          showToast({ message: error.message, type: 'error' });
          // paymentStore.addPaymentDetailsError(error);
        },
        onPaymentCompleted: (result: any, component: any) => {
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
      console.log('configuration', configuration)
      const checkout: any = await AdyenCheckout(configuration);
      console.log('checkout', checkout)
      // const cardComponent: any = checkout.create('card').mount(aydenRef.current);

      const dropin = new Dropin(checkout, {
        paymentMethodComponents: [Card],// Only needed with tree-shakable npm package
      }).mount('#adyenpay-button-container')

      // cardComponent.value = cardComponent;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      showToast({ message: errorMessage, type: 'error' });
      // eslint-disable-next-line no-console
      console.error('Invalid data for payments', error);
    }
  };

  useEffect(() => {
    initiateCheckout()
      .catch(() => {
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
    </Fragment>)
}
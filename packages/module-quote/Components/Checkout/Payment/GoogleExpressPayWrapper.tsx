import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
import { useLazyQuery } from '@apollo/client';
import { InfoOutlined } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { clearCart } from '@store/cart';
import { removeCheckoutData } from '@store/checkout';
import { useAppSelector } from '@store/hooks';
import { getAdyenCountryCode, getAdyenLocal, getShippingMethodPrice } from '@utils/Helper';
import GetCountryInfoGQL from '@voguish/module-customer/graphql/GetCountryInfo.graphql';
import { useCustomerMutation } from '@voguish/module-customer/hooks/useCustomerMutation';
import { useToken } from '@voguish/module-customer/hooks/useToken';
import GetAdyenPayDetailGQL from '@voguish/module-quote/graphql/mutation/GetAdyenPayDetail.graphql';
import { usePlaceOrderFromAdyen, useSetShippingAddressOnCart, useSetShippingMethodOnCart } from '@voguish/module-quote/hooks';
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
  const token = useToken();
  const [getCountryInfo] = useLazyQuery(GetCountryInfoGQL);
  const [errors, setAdyenError] = useState<any>();
  const [adyenPaymentDetails, setAdyenPaymentDetails] = useState<any>();
  const { setShippingAddressHandler } =
    useSetShippingAddressOnCart(() => { });
  const { setShippingMethodsHandler } =
    useSetShippingMethodOnCart(() => { });
  const [allAvailableShippingOptionList, setAllAvailableShippingOptionList] = useState<any[]>([]);
  const currency = useAppSelector(
    (state: RootState) =>
      state?.storeConfig?.currentCurrency?.currency_to ?? null
  );
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
  const mapM2Address = async (address: any) => {
    console.log('address', address);
    if (address?.administrativeArea) {
      try {
        const { data } = await getCountryInfo({
          variables: {
            id: address.countryCode
          },
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });
        console.log('response country data', data);
        const country = data?.country;
        if (country?.available_regions?.length > 0) {
          const region = country?.available_regions?.find(
            (r: any) => r.code === address.administrativeArea
          );
          console.log('region', region);
          return region;
        }
        return null;
      } catch (error) {
        console.error('Error fetching country info:', error);
        return null;
      }
    }
  };
  const mapAddress = async (address: any) => {
    console.log('mapAddress address', address);
    const [firstname, ...lastname] = address.name.split(' ');
    const regionInfo: any = await mapM2Address(address);
    console.log('regionInfo address 2', regionInfo);
    const shippingDetails: any = {
      telephone:
        typeof address.phoneNumber !== 'undefined' ? address.phoneNumber : '',
      firstname,
      lastname: lastname.length ? lastname.join(' ') : address.name.slice(-1),
      street: address.address1,
      apartment: address.address2 ?? '',
      neighborhood: address.address3 ?? '',
      city: address.locality,
      region: address.administrativeArea,
      country_code: address.countryCode.toUpperCase(),
      postcode: address.postalCode,
      save_in_address_book: false,
    };
    if (regionInfo && regionInfo?.id) {
      shippingDetails.region_id = regionInfo.id;
    }
    return shippingDetails;
  };
  const onPaymentDataChanged = async (intermediatePaymentData: any) => {
    console.log('---onPaymentDataChanged intermediatePaymentData', intermediatePaymentData);
    new Promise(async (resolve, reject) => {
      // console.log('**** intermediatePaymentData ***:', intermediatePaymentData);
      const { callbackTrigger, shippingAddress, shippingOptionData } =
        intermediatePaymentData;
      const paymentDataRequestUpdate: any = {};
      const subTotal = quote?.prices?.subtotal_excluding_tax?.value || 0;
      const grand_total = quote?.prices?.grand_total?.value || 0;

      // If it initializes or changes the shipping address, calculate the shipping options and transaction info.
      if (
        callbackTrigger === 'INITIALIZE' ||
        callbackTrigger === 'SHIPPING_ADDRESS'
      ) {
        console.log('*** new shippingAddress:', shippingAddress);
        const regionInfo: any = await mapM2Address(shippingAddress);
        const shippingDetails: any = {
          country_code: shippingAddress.countryCode, // shippingAddress.countryCode
          postcode: shippingAddress.postalCode,
          street: 'guest',
          city: shippingAddress.locality,
          firstname: 'guest',
          lastname: 'guest',
          region: shippingAddress.administrativeArea,
          telephone: '00000000',
          save_in_address_book: false,
        };
        if (regionInfo && regionInfo?.id) {
          shippingDetails.region_id = regionInfo.id;
        }

        if (quote?.id) {
          await setShippingAddressHandler({
            cartId: quote?.id,
            shippingAddresses: [
              {
                address: shippingDetails
              },
            ],
          });

          const shippingMethods4Phone: any[] = [];
          const allAvailableShippingOptions: any[] = [];
          console.log('quoye', quote);
          quote?.shipping_addresses[0]?.available_shipping_methods?.map(
            // eslint-disable-next-line array-callback-return
            (item: any) => {
              if (item.available) {
                allAvailableShippingOptions.push(item);
                const label = item.price_incl_tax ? item.method_title
                  : item.method_title;
                shippingMethods4Phone.push({
                  id: item.carrier_code, // don't use method_code
                  label,
                  description: item.carrier_title,
                });
              }
            }
          );
          // 获取全部可用的快递列表
          if (allAvailableShippingOptions.length === 0) {
            reject('No available Shipping Options');
            return;
          }
          setAllAvailableShippingOptionList([...allAvailableShippingOptions])
          console.log(
            'allAvailableShippingOptions:',
            allAvailableShippingOptions
          );
          // 选择收货地址后，设置一个默认的快递方式，默认第一个快递
          const selectedShipping = allAvailableShippingOptions[0];

          await setShippingMethodsHandler({
            cartId: quote?.id,
            shippingMethods: [
              {
                carrier_code: selectedShipping.carrier_code,
                method_code: selectedShipping.method_code
              },
            ],
          });

          paymentDataRequestUpdate.newShippingOptionParameters = {
            defaultSelectedOptionId: selectedShipping.carrier_code,
            shippingOptions: shippingMethods4Phone,
          };
          console.log('paymentDataRequestUpdate', paymentDataRequestUpdate)
          console.log('qu', quote);
          console.log('currency', currency);



          const newTransactionInfo = {
            displayItems: [
              {
                label: 'Subtotal',
                type: 'SUBTOTAL',
                price: subTotal.toString(),
              },
              {
                label: 'Shipping',
                type: 'LINE_ITEM',
                price: getShippingMethodPrice(selectedShipping),
                status: 'FINAL',
              },
            ],
            currencyCode: currency,
            totalPriceStatus: 'FINAL',
            totalPrice: grand_total.toString(),
            totalPriceLabel: 'Total',
            countryCode: 'GB',
          };
          console.log('newTransactionInfo:', newTransactionInfo);
          paymentDataRequestUpdate.newTransactionInfo = newTransactionInfo;
          console.log('paymentDataRequestUpdate', paymentDataRequestUpdate)
        }

      }
      // If SHIPPING_OPTION changes, calculate the new shipping amount.
      if (callbackTrigger === 'SHIPPING_OPTION') {
        const selectedShipping =
          shippingOptionData.id === 'shipping_option_unselected'
            ? allAvailableShippingOptionList[0]
            : allAvailableShippingOptionList.find(
              ({ carrier_code: id }) => id === shippingOptionData.id
            );
        if (quote?.id) {
          await setShippingMethodsHandler({
            cartId: quote?.id,
            shippingMethods: [
              {
                carrier_code: selectedShipping.carrier_code,
                method_code: selectedShipping.method_code
              },
            ],
          });
          const newTransactionInfo = {
            displayItems: [
              {
                label: 'Subtotal',
                type: 'SUBTOTAL',
                price: subTotal.toString(),
              },
              {
                label: 'Shipping',
                type: 'LINE_ITEM',
                price: getShippingMethodPrice(selectedShipping),
                status: 'FINAL',
              },
            ],
            currencyCode: currency,
            totalPriceStatus: 'FINAL',
            totalPrice: grand_total.toString(),
            totalPriceLabel: 'Total',
            countryCode: 'GB',
          };
          paymentDataRequestUpdate.newTransactionInfo = newTransactionInfo;
        }
      }
      console.log('paymentDataRequestUpdate', paymentDataRequestUpdate)
      resolve(paymentDataRequestUpdate);
    });
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
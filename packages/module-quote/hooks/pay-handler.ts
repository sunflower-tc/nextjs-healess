import { setOrderId } from '@store/checkout';
import { useAppDispatch } from '@store/hooks';
import { useCustomerMutation } from '@voguish/module-customer/hooks/useCustomerMutation';
import CreateNihaopay from '@voguish/module-quote/graphql/mutation/CreateNihaopayToken.graphql';
import CreatePaypalToken from '@voguish/module-quote/graphql/mutation/CreatePaypalToken.graphql';
import PlaceOrderFromAdyen from '@voguish/module-quote/graphql/mutation/PlaceOrderFromAdyen.graphql';
import SetPayPalPaymentMethodOnCart from '@voguish/module-quote/graphql/mutation/SetPayPalPaymentMethodOnCart.graphql';
import { useToast } from '@voguish/module-theme/components/toast/hooks';
import { useState } from 'react';
import { CreateNihaopayTokenInput, CreatePaypalTokenInput, PlaceOrderFromAdyenInput, SetPayPalPaymentMethodOnCartInput } from '../types';
/**
 * Create Nihaopay Token handler
 */
export const useCreateNihaopayToken = () => {
  const { showToast } = useToast();
  const [isInProcess, setIsInProcess] = useState(false);

  const [createNihaopayToken] = useCustomerMutation(CreateNihaopay);

  const createNihaopayTokenHandler = async (input: CreateNihaopayTokenInput) => {
    setIsInProcess(true);

    try {
      const response = await createNihaopayToken({ variables: input });

      setIsInProcess(false);
      if (!response.data?.createNihaopayToken) {
        showToast({ message: 'Request timed out. Please try again.', type: 'error' });
      }
      return response.data;
    } catch (error: any) {
      setIsInProcess(false);
      showToast({ message: error.message, type: 'error' });
      throw error;
    }
  };

  return { createNihaopayTokenHandler, isInProcess };
};
/**
 * Create paypal Token handler
 */
export const useCreatePaypayToken = () => {
  const { showToast } = useToast();

  const [isInProcess, setIsInProcess] = useState(false);
  const [createPaypalToken] = useCustomerMutation(CreatePaypalToken);

  const createPaypalTokenHandler = async (input: CreatePaypalTokenInput) => {
    setIsInProcess(true);

    try {
      const response = await createPaypalToken({ variables: input });

      setIsInProcess(false);
      if (!response.data?.createPaypalExpressToken) {
        showToast({ message: 'Request timed out. Please try again.', type: 'error' });
      }
      return response.data.createPaypalExpressToken;
    } catch (error: any) {
      setIsInProcess(false);
      showToast({ message: error.message, type: 'error' });
      throw error;
    }
  };

  return { createPaypalTokenHandler, isInProcess };
}
/**
 * set paypal pay method to cart
 */
export const useSetPayPalPaymentMethodOnCart = () => {
  const { showToast } = useToast();

  const [isInProcess, setIsInProcess] = useState(false);
  const [setPayPalPaymentMethodOnCart] = useCustomerMutation(SetPayPalPaymentMethodOnCart);

  const setPayPalPaymentMethodOnCartHandler = async (input: SetPayPalPaymentMethodOnCartInput) => {
    setIsInProcess(true);

    try {
      const response = await setPayPalPaymentMethodOnCart({ variables: input });

      setIsInProcess(false);
      if (!response.data?.setPaymentMethodOnCart) {
        showToast({ message: 'Request timed out. Please try again.', type: 'error' });
      }
      return response.data.setPaymentMethodOnCart;
    } catch (error: any) {
      setIsInProcess(false);
      showToast({ message: error.message, type: 'error' });
      throw error;
    }
  };

  return { setPayPalPaymentMethodOnCartHandler, isInProcess };
}

/**
 * placeOrder by adyen
 */

export const usePlaceOrderFromAdyen = () => {
  const { showToast } = useToast();

  const [isInProcess, setIsInProcess] = useState(false);
  const dispatch = useAppDispatch();
  const [placeOrderFromAdyen, { loading, error }] = useCustomerMutation(PlaceOrderFromAdyen);
  const placeOrderFromAdyenHandler = async (input: PlaceOrderFromAdyenInput): Promise<any> => {
    setIsInProcess(true);
    console.log('usePlaceOrderFromAdyen error', error)
    try {
      const { data } = await placeOrderFromAdyen({ variables: input });

      setIsInProcess(false);
      if (!data?.placeOrder) {
        showToast({ message: 'Request timed out. Please try again.', type: 'error' });
        return;
      }
      const orderNumber = data?.placeOrder?.order?.order_number ?? null;
      if (orderNumber) {
        dispatch(setOrderId(orderNumber));
        showToast({ message: 'Order Placed successfully!!' });
      }

      return { data: data.placeOrder, error }
    } catch (error: any) {
      setIsInProcess(false);
      showToast({ message: error.message, type: 'error' });
      throw error;
    }
  };

  return { placeOrderFromAdyenHandler, isInProcess };

}
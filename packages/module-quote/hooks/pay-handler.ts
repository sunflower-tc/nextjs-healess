import { showToast } from '@utils/Helper';
import {
  useCustomerMutation,
} from '@voguish/module-customer';
import CreateNihaopay from '@voguish/module-quote/graphql/mutation/CreateNihaopayToken.graphql';
import CreatePaypalToken from '@voguish/module-quote/graphql/mutation/CreatePaypalToken.graphql';
import SetPayPalPaymentMethodOnCart from '@voguish/module-quote/graphql/mutation/SetPayPalPaymentMethodOnCart.graphql';
import { useState } from 'react';
import { CreateNihaopayTokenInput, CreatePaypalTokenInput, SetPayPalPaymentMethodOnCartInput } from '../types';


/**
 * Create Nihaopay Token handler
 */
export const useCreateNihaopayToken = () => {
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

export const useCreatePaypayToken = () => {
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
export const useSetPayPalPaymentMethodOnCart = () => {
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
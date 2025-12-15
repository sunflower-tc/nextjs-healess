import { showToast } from '@utils/Helper';
import {
  useCustomerMutation,
} from '@voguish/module-customer';
import CreateNihaopay from '@voguish/module-quote/graphql/mutation/CreateNihaopayToken.graphql';
import { useState } from 'react';
import { CreateNihaopayTokenInput } from '../types';
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
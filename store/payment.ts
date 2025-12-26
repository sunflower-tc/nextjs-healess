import { createSlice } from '@reduxjs/toolkit';
import { AdyenPaymentState } from '@voguish/module-quote';

/**
 * Initializing the state
 */
const initialPaymentState: AdyenPaymentState = {
  adyenPaymentDetails: {
    isFinal: false,
    resultCode: '',
    additionalData: {},
    action: null,
  },
  error: null,
};

/**
 * Creating slice of reducer
 * It will create actions itself.
 */
const paymentSlice = createSlice({
  name: 'currentAdyenPay',
  initialState: initialPaymentState,

  /**
   * Reducers: it is responsible to update state
   * state: state - oldState
   * action: {type: actionType, payload: data passed}
   */
  reducers: {
    addPaymentDetailsError(state, action) {
      state.error = action.payload;
    },
    addPaymentDetails(state, action) {
      state.adyenPaymentDetails = action.payload;
      state.error = null;
    },
  },
});

export const paymentActions = paymentSlice.actions;

export const { addPaymentDetailsError, addPaymentDetails } = paymentActions;

export default paymentSlice.reducer;

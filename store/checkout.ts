import { createSlice } from '@reduxjs/toolkit';
import { isValidArray, isValidObject } from '@utils/Helper';
import { CustomerAddress } from '@voguish/module-customer';
import { CartAddressInterface } from '@voguish/module-quote';
import { RootState } from 'store';
import {
  CHECKOUT_DATA,
  LAST_ORDER_ID,
  getLocalStorage,
  setLocalStorage,
} from './local-storage';

/**
 * * Getting stored checkout data in local storage.
 */
const checkoutData = getLocalStorage(CHECKOUT_DATA, true) || {};

const lastOrder = getLocalStorage(LAST_ORDER_ID);

/**
 * Initializing the state
 */
const initialCheckoutState = {
  selectedShippingAddress: checkoutData.selectedShippingAddress || null,
  newShippingAddress: checkoutData.newShippingAddress || null,
  newCustomerShippingAddress: checkoutData.newCustomerShippingAddress || false,
  selectedBillingAddress: checkoutData.selectedBillingAddress || null,
  newCustomerBillingAddress: checkoutData.newCustomerBillingAddress || false,
  availableAddresses: checkoutData.availableAddresses || null,
  selectedShippingMethod: checkoutData?.selectedShippingMethod || '',
  selectedAddress: checkoutData?.selectedAddress || '',
  selectedAddressId: checkoutData?.selectedAddressId || null,
  lastOrderId: lastOrder || null,
};

/**
 * Creating slice of reducer
 * It will create actions itself.
 */
const checkoutSlice = createSlice({
  name: 'checkoutData',
  initialState: initialCheckoutState,

  /**
   * Reducers: it is responsible to update state
   * state: state - oldState
   * action: {type: actionType, payload: data passed}
   */
  reducers: {
    setShippingAddress(state, action) {
      setLocalStorage(CHECKOUT_DATA, action.payload);
      state.selectedAddress = action.payload;
      state.selectedAddressId = action.payload.id;
    },

    setAvailableAddress: function (state, action) {
      state.availableAddresses = action.payload;
      setLocalStorage(CHECKOUT_DATA, { ...state });
    },

    setNewShippingAddressId: function (state, action) {
      state.newShippingAddress = action.payload;
      if (isValidObject(action.payload)) {
        if (state.selectedShippingAddress) {
          let shippingAddress = action.payload;
          shippingAddress.uid = Math.floor(Date.now() / 1000);
          state.availableAddresses[state.availableAddresses.length - 1] =
            shippingAddress;
          state.selectedShippingAddress = action.payload;
        }
      }
      state.newCustomerShippingAddress = true;
      setLocalStorage(CHECKOUT_DATA, { ...state });
    },

    setAvailableAddressWithUid: function (state, action) {
      let availableAddresses = action.payload;
      if (isValidArray(availableAddresses)) {
        availableAddresses = availableAddresses.map(
          (availableAddress: CustomerAddress) => ({
            ...availableAddress,
            uid: (Date.now() / 1000) | 0,
          })
        );
      }
      state.availableAddresses = availableAddresses;
      setLocalStorage(CHECKOUT_DATA, { ...state });
    },

    setShippingAddressFromCartData(state, action) {
      const cartData = action.payload || null;
      const selectedAddressId =
        cartData?.selected_shipping_address_ids?.[0] || null;
      if (selectedAddressId) {
        state.selectedShippingAddress = selectedAddressId;
      }
      if (!selectedAddressId) {
        const shippingAddress = cartData?.shipping_addresses?.[0] || null;
        if (isValidObject(shippingAddress)) {
          const finalData = {
            ...extractAddressFields(shippingAddress),
            email: cartData.email,
          };
          if (!state.newCustomerShippingAddress) {
            finalData.uid = Math.floor(Date.now() / 1000);
            state.newCustomerShippingAddress = true;
            state.availableAddresses = isValidArray(state.availableAddresses)
              ? [...state.availableAddresses, finalData]
              : [finalData];
          }
          state.selectedShippingAddress = finalData;
          state.newShippingAddress = finalData;
        }
      }
      setLocalStorage(CHECKOUT_DATA, { ...state });
    },

    setBillingAddress: function (state, action) {
      const addressData = action.payload || null;
      state.selectedBillingAddress = addressData?.billingAddress || null;
      state.newCustomerBillingAddress = addressData?.isNewAddress || false;
      setLocalStorage(CHECKOUT_DATA, { ...state });
    },

    setShippingMethod: function (state, action) {
      state.selectedShippingMethod = action.payload;
      setLocalStorage(CHECKOUT_DATA, { ...state });
    },

    setOrderId: function (state, action) {
      state.lastOrderId = action.payload;
      setLocalStorage(LAST_ORDER_ID, action.payload);
    },

    removeOrderId: function (state) {
      state.lastOrderId = null;
      setLocalStorage(LAST_ORDER_ID, null);
    },

    removeCheckoutData: function (state) {
      state.selectedShippingAddress = null;
      state.newShippingAddress = null;
      state.newCustomerShippingAddress = null;
      state.selectedBillingAddress = null;
      state.newCustomerBillingAddress = null;
      state.availableAddresses = null;
      state.selectedShippingMethod = '';
      setLocalStorage(CHECKOUT_DATA, { ...state });
    },
  },
});

const extractAddressFields = (address: CartAddressInterface) => {
  const {
    firstname,
    lastname,
    street,
    city,
    country,
    company,
    region,
    telephone,
    postcode,
    uid,
  } = address;

  return {
    firstname,
    lastname,
    street,
    city,
    country,
    company,
    region,
    telephone,
    postcode,
    uid,
  };
};
export const checkoutActions = checkoutSlice.actions;

export const {
  setShippingAddress,
  removeCheckoutData,
  setAvailableAddress,
  setAvailableAddressWithUid,
  setBillingAddress,
  setNewShippingAddressId,
  setShippingAddressFromCartData,
  setShippingMethod,
  setOrderId,
  removeOrderId,
} = checkoutSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const checkoutDetails = (state: RootState) => state.checkout;

export default checkoutSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { CartInterface, QuoteInterface } from '@voguish/module-quote/types';
import { RootState } from 'store';
import {
  CART_DATA,
  GUEST_CART,
  getLocalStorage,
  resetCartStorage,
  setLocalStorage,
} from './local-storage';

/**
 * * Getting stored cart data in local storage
 */
const cartData: CartInterface = getLocalStorage(CART_DATA, true) || {};

const guestCart: CartInterface = getLocalStorage(GUEST_CART, true) || {};

/**
 * Initializing the state
 */
const initialCartState: QuoteInterface = {
  quote: {
    id: cartData.id || '',
    items: cartData.items || [],
    applied_coupons: cartData.applied_coupons || [],
    available_payment_methods: cartData.available_payment_methods || null,
    billing_address: cartData.billing_address || null,
    email: cartData.email || '',
    prices: cartData.prices || {},
    selected_payment_method: cartData.selected_payment_method || {},
    shipping_addresses: cartData.shipping_addresses || [],
    isGuest: false,
    total_quantity: cartData.total_quantity || 0,
    is_virtual: false,
  },
  id: cartData.id || guestCart.id || '',
  isGuestId: guestCart.id || '',
};

/**
 * Creating slice of reducer
 * It will create actions itself.
 */
const cartSlice = createSlice({
  name: 'currentCart',
  initialState: initialCartState,

  /**
   * Reducers: it is responsible to update state
   * state: state - oldState
   * action: {type: actionType, payload: data passed}
   */
  reducers: {
    setCart(state, action) {
      setLocalStorage(CART_DATA, action.payload);
      state.quote = action.payload;
      state.id = action.payload.id;
    },
    clearCart(state) {
      resetCartStorage();
      state.quote = null;
      state.id = '';
    },
  },
});

export const cartActions = cartSlice.actions;

export const { setCart, clearCart } = cartActions;

// Other code such as selectors can use the imported `RootState` type
export const cartDetails = (state: RootState) => state.cart;

export default cartSlice.reducer;

import { client, httpLink, setAuthToken } from '@lib/apollo-client';
import { configureStore } from '@reduxjs/toolkit';
import { signOut } from 'next-auth/react';
import Router from 'next/router';
import cartReducer, { clearCart } from './cart';
import checkoutReducer, { removeCheckoutData, setOrderId } from './checkout';
import storeSlice from './store';
import userSlice, { logout, setCompareList, setCompareListId } from './user';

/**
 * Store, We are creating a store with Redux.
 *
 * @param {Function} reducers - it receive reducer as param
 */
export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartReducer,
    checkout: checkoutReducer,
    storeConfig: storeSlice,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const Logout = () => {
  client.setLink(setAuthToken('').concat(httpLink));
  store.dispatch(logout());
  store.dispatch(setCompareList(null));
  store.dispatch(clearCart());
  store.dispatch(removeCheckoutData());
  store.dispatch(setCompareListId(null));
  store.dispatch(setOrderId({ lastOrderId: null }));
  signOut({ redirect: false });
  setTimeout(() => {
    Router.replace('/customer/account/login');
  }, 1000);
};
export const getState = () => {
  return store.getState();
};

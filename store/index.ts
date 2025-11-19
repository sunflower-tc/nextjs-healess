import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import checkoutReducer from './checkout';
import storeSlice from './store';
import userSlice from './user';
import { logout } from './user';
import { signOut } from 'next-auth/react';
import Router from 'next/router';

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
  store.dispatch(logout());
  signOut();
  Router.push('/customer/account/login');
};
export const getState = () => {
  return store.getState();
};

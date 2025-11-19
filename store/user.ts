import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Session } from 'next-auth';
import type { RootState } from './index';
import { UserInterface } from './types';

/**
 * Initializing the state
 */
const initialState: UserInterface = {
  email: '',
  name: '',
  firstName: '',
  token: null,
  lastName: '',
};

/**
 * Creating slice of reducer
 * It will create actions itself.
 */
export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<Session | null | undefined>) => {
      const user = action.payload?.user || null;
      state.email = user?.email || '';
      state.firstName = user?.firstname || '';
      state.lastName = user?.lastname || '';
      state.name = user?.name || '';
      state.token = user?.token || null;
    },

    logout: (state) => {
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.name = '';
      state.token = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

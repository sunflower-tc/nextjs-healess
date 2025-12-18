import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Session } from 'next-auth';
import type { RootState } from './index';
import {
  COMPARE_ID,
  COMPARE_LIST,
  IS_GUEST,
  getLocalStorage,
  setLocalStorage,
} from './local-storage';
import { UserInterface } from './types';
const compareList = getLocalStorage(COMPARE_LIST, true);
const compareId = getLocalStorage(COMPARE_ID, true);
const isGuest = getLocalStorage(IS_GUEST, true);

/**
 * Initializing the state
 */
const initialState: UserInterface = {
  email: '',
  name: '',
  firstName: '',
  token: null,
  lastName: '',
  compareList: compareList,
  compareId: compareId,
  isGuest: isGuest,
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
    setCompareList(state, action) {
      state.compareList = { ...state.compareList, data: action.payload };
      setLocalStorage(COMPARE_LIST, state.compareList);
    },
    removeCompareData(state) {
      state.compareList = { ...state.compareList, data: null };
      setLocalStorage(COMPARE_LIST, state.compareList);
    },
    setCompareListId(state, action) {
      state.compareId = { ...state.compareId, ID: action.payload } as any;
      setLocalStorage(COMPARE_ID, state.compareId);
    },
    removeCompareListId(state) {
      state.compareId = { ...state.compareId, ID: state.compareList } as any;
      setLocalStorage(COMPARE_ID, state.compareList);
    },
    setCompareListForGuest(state, action) {
      state.isGuest = { ...state.isGuest, isGuest: action.payload };
      setLocalStorage(IS_GUEST, state.isGuest);
    },
  },
});

export const {
  setUser,
  logout,
  setCompareList,
  removeCompareData,
  setCompareListId,
  removeCompareListId,
  setCompareListForGuest,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

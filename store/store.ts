import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  CountriesQueryResult,
  StoreConfigInterface,
} from '@voguish/module-store';
import type { RootState } from './index';
import {
  CURRENCY_CODE,
  STORE_CODE,
  STORE_CONFIG,
  getLocalStorage,
  setLocalStorage,
} from './local-storage';

/**
 * * Getting stored cart data in local storage
 */
const storeConfig: StoreConfigInterface =
  getLocalStorage(STORE_CONFIG, true) || {};

const currencySelected = getLocalStorage('current_currency');

/**
 * Initializing the state
 */
const initialState: StoreConfigInterface = {
  ...storeConfig,
  currentCurrency: currencySelected,
};

/**
 * Creating slice of reducer
 * It will create actions itself.
 */
export const storeConfigSlice = createSlice({
  name: 'storeConfig',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setStoreConfig: (
      state,
      action: PayloadAction<StoreConfigInterface | null | undefined>
    ) => {
      const storeConfig = action.payload || {};
      setLocalStorage(STORE_CONFIG, storeConfig);
      state = { ...state, ...storeConfig };
    },
    setCountries: (
      state,
      action: PayloadAction<CountriesQueryResult | null | undefined>
    ) => {
      state.countries = action.payload?.countries;
    },
    setCurrentStore: (state, action: PayloadAction<string>) => {
      setLocalStorage(STORE_CODE, action.payload);
      state.currentStore = action.payload;
    },
    setCurrentCurrency: (state, action: PayloadAction<string>) => {
      setLocalStorage(CURRENCY_CODE, action.payload);
      state.currentCurrency = action.payload;
    },
  },
});

export const {
  setStoreConfig,
  setCountries,
  setCurrentStore,
  setCurrentCurrency,
} = storeConfigSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStoreConfig = (state: RootState) => state.storeConfig;
export default storeConfigSlice.reducer;

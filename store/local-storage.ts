import { isValidArray, isValidObject } from '@utils/Helper';

/**
 * Storage keys
 */
export const CURRENCY_CODE = 'current_currency';
export const STORE_CODE = 'current_store';
export const STORE_CONFIG = 'store_config';
export const SELECTED_LOCATION = 'elected_location';
export const GUEST_CART = 'guest_cart';
export const CART_DATA = 'cart_data';
export const CHECKOUT_DATA = 'checkout_data';
export const COUNTRIES = 'countries';
export const LAST_ORDER_ID = 'last_order_id';
export const MULTI_CHECKOUT = 'ulti_checkout';
export const SHIPPING_ADDRESS = 'hipping_address';
export const COMPARE_LIST = 'recently_compared_product';
export const COMPARE_ID = 'compare_list_uid';
export const IS_GUEST = 'is_guest';
export const CUSTOMER = 'customer';
export const IS_VIRTUAL_CART = 'isVirtualCart';
export const CURRENCY_RATES = 'currency_rates';
export const itemsArray = new Array(6).fill(0);
export const SELECTED_STORE = 'Store';
/**
 * Set local storage
 *
 * @param {string} key - Key for the storage
 * @param {any} data - Data to be stored
 * @returns void
 */
export const setLocalStorage = (key: string, data: any) => {
  if (typeof window !== 'undefined') {
    if (isValidArray(data) || isValidObject(data)) {
      data = JSON.stringify(data);
    }
    if (typeof data === 'string') {
      localStorage.setItem(key, data);
    }
  }
};

/**
 * Get data from local storage
 *
 * @param {string} key - Key for the storage
 * @param {boolean} needParsedData - Whether to parse the data or not
 * @returns any
 */
export const getLocalStorage = (key: string | any, needParsedData = false) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    if (!data || typeof data === 'undefined') return null;
    if (needParsedData) return JSON.parse(data);
    return data;
  }
};

/**
 * Get a specific key from local storage
 *
 * @param {string} storageKey - Key for the storage
 * @param {string} requiredKey - Required key
 * @returns any
 */
export const getKeyFromStorage = (
  storageKey: string | any,
  requiredKey: string | any
) => {
  const data = getLocalStorage(storageKey, true);
  return data?.[requiredKey] || null;
};

/**
 * Remove data from local storage
 *
 * @param {string} storageKey - Key for the storage
 * @returns void
 */
export const removeFromLocalStorage = (storageKey: string | any) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(storageKey);
  }
};

/**
 * Reset cart storage
 *
 * @returns void
 */
export const resetCartStorage = () => {
  removeFromLocalStorage(CART_DATA);
  removeFromLocalStorage(GUEST_CART);
  removeFromLocalStorage(SHIPPING_ADDRESS);
};

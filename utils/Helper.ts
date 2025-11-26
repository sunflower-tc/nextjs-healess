import { ApolloClient, InMemoryCache } from '@apollo/client';
import { getLocalStorage } from '@store/local-storage';
import { AppliedLayerFilter } from '@voguish/module-catalog';
import { CartAddressInput, CartAddressInterface } from '@voguish/module-quote';
import STORE_CONFIG_DATA_QUERY from '@voguish/module-store/graphql/StoreConfigData.graphql';
import { ToastContent, ToastOptions, toast } from 'react-toastify';

/**
 * Toast Options
 */
const toasterOptions: ToastOptions = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/**
 * Get formatted Price.
 * @param {Float | string} price
 * @param {string} currency
 * @param {boolean} isNegative - default is false
 * @returns string
 */
// todo hava to check 
// export const getFormattedPrice = (
//   price: number,
//   currency: string,
//   isNegative = false
// ) => {
//   const currencySelected = getLocalStorage('current_currency');

//   const selectedRate = currencySelected?.rate || 1;
//   currency = currencySelected?.currency_to || getCurrencyCode();
//   price = typeof price === 'string' ? parseFloat(price) : price;
//   price = isNegative ? -Math.abs(price) : price;
//   price = price * selectedRate;
//   return price?.toLocaleString('en-US', {
//     style: 'currency',
//     currency,
//   });
// };

export const getFormattedPrice = (
  price: number | string,
  currency?: string,
  isNegative = false
): string => {
  const currencySelected = getLocalStorage('current_currency', true);

  const selectedRate = (1 / (currencySelected?.rate ?? 1)).toFixed(4);
  const targetCurrency =
    currencySelected?.currency_to ?? currency ?? getCurrencyCode();

  let numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numericPrice)) {
    console.warn('Invalid price value:', price);
    numericPrice = 0;
  }

  numericPrice = isNegative ? -Math.abs(numericPrice) : numericPrice;
  if (currency === currencySelected?.currency_to) {
    return numericPrice.toLocaleString('en-US', {
      style: 'currency',
      currency: currency ?? getCurrencyCode(),
    });
  }
  // const convertedPrice = numericPrice / Number(selectedRate);
  const convertedPrice = numericPrice * (Number(currencySelected?.rate??1))
  return convertedPrice.toLocaleString('en-US', {
    style: 'currency',
    currency: targetCurrency,
  });
};

/**
 * Get Currency code.
 *
 * @returns string
 */
export const getCurrencyCode = () => {
  let currency = 'USD';

  // let config = getLocalStorage(STORE_CONFIG, true);

  // if (config && config.default_display_currency_code) {
  // currency = config.default_display_currency_code;
  // }
  return currency;
};

/**
 * Check array is valid or not
 *
 * @param {Array} arr
 * @returns boolean
 */
export const isValidArray = (arr: any) => {
  return arr && Array.isArray(arr) && arr.length > 0;
};

/**
 * Show Toast messages
 *
 * @param {{toastType: string, message: string}} param0
 */
export const showToast = ({
  type = 'success',
  message,
}: {
  type?: 'loading' | 'success' | 'info' | 'warning' | 'error' | 'warn';
  message: ToastContent;
}) => {
  try {
    if (message) {
      const toastId = toast[type](message, toasterOptions);
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 1500);
    }
  } catch (e) {
    // console.log(e);
  }
};

/**
 *
 * @param {Object} obj
 * @returns boolean
 */
export function isValidObject(obj: any) {
  return obj && Object.keys(obj).length > 0 && obj.constructor === Object;
}

/**
 *
 * @returns {Object}
 */
export const createGraphQLClient = () => {
  const uri = `${process.env.MAGENTO_ENDPOINT}graphql`;
  return new ApolloClient({
    uri: uri,
    cache: new InMemoryCache(),
  });
};

/**
 *
 * @returns {boolean}
 */
export const isMarketplaceEnable = async () => {
  const client = createGraphQLClient();
  const { data } = await client.query({
    query: STORE_CONFIG_DATA_QUERY,
  });
  return data?.storeConfig?.marketplace_is_active || false;
};

/**
 *
 * @param {String} requestedDate
 * @returns String
 */

export const getFormattedDate = (
  requestedDate: string,
  format = 'mm/dd/yy'
) => {
  requestedDate =
    typeof requestedDate == 'string'
      ? requestedDate.replace(/-/g, '/')
      : requestedDate;
  const date: any = new Date(requestedDate);

  const year = date.getFullYear().toString();
  let month: number | string | any = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }

  let dateStr: any =
    date.getDate().length === 0 ? '0' + date.getDate() : date.getDate();

  if (dateStr < 10) {
    dateStr = '0' + dateStr;
  }

  if (format === 'dd.mm.yyyy') {
    return dateStr + '.' + month + '.' + year;
  }
  if (format === 'yyyy-mm-dd') {
    return year + '-' + month + '-' + dateStr;
  }
  if (format === 'h:i:A') {
    let hours = date.getHours();
    let minutes: string | number | any = date.getMinutes();
    const amPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + amPm;
  }

  if (format === 'dd/mm/yyyy') {
    return dateStr + '/' + month + '/' + year;
  }
  return month + '/' + dateStr + '/' + year.substring(2);
};
export const filteredLabel = (value: string, array: any) => {
  if (array) {
    return isValidArray(
      array.filter((label: any) =>
        label.label?.toLowerCase().includes(value.toLowerCase())
      )
    );
  }
};

export const parseAddress = (
  address: CartAddressInterface
): CartAddressInput => {
  return {
    firstname: address?.firstname || '',
    lastname: address?.lastname || '',
    street: address?.street || '',
    city: address?.city || '',
    region: address?.region.code || '',
    region_id: address?.region.region_id || 0,
    country_code: address?.country.code,
    postcode: address?.postcode || '',
    telephone: address?.telephone || '',
    save_in_address_book: false,
    company: address?.company || '',
  };
};

/**
 * Parsing applied filter to hide applied filter for pages
 *
 * @param filters
 * @param activePageFilter
 * @param activePageFilterValue
 * @returns AppliedLayerFilter[]
 */
export const parseAppliedFilter = (
  filters: AppliedLayerFilter[] | undefined,
  activePageFilter: string | null,
  activePageFilterValue: string | null
) => {
  if (activePageFilter && activePageFilterValue) {
    return filters?.filter(
      (item) =>
        item.attribute_code !== activePageFilter &&
        item.value !== activePageFilterValue
    );
  }

  return filters;
};

export function getFlagEmoji(countryCode: string) {
  let emojiCode = countryCode === 'default' ? 'us' : countryCode.slice(0, -1);
  try {
    const codePoints = emojiCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));

    return String.fromCodePoint(...codePoints);
  } catch (error) {
    return '';
  }
}



export const getLocalStore = (
  availableStores: {
    code: string;
    store_code: string;
    locale_code?: string;
    locale?: string;
  }[],
  locale: string
): string => {

  if (availableStores?.length === 1) {
    const storeLocale = availableStores[0]?.store_code ?? availableStores[0]?.locale;
    return storeLocale?.split('_')?.[0]
  }
  const store = availableStores.find((store) => {
    const storeLocale = store.store_code || store.locale;
    const normalizedStoreLocale = storeLocale?.split('_')?.[0];
    return normalizedStoreLocale === locale;
  });

  return (
    store?.store_code ??
    process.env.NEXT_SERVER_MAGENTO_DEFAULT_STORE_CODE ??
    ''
  );
};


export const getValidCurrencies = (data: any) => {
  if (!data?.available_currency_codes || !data?.exchange_rates) {
    return [];
  }
  return data.available_currency_codes.filter((currency: any) => {
    const exchangeRate = data.exchange_rates.find(
      (rate: any) => rate.currency_to === currency.code && rate.rate
    );
    return Boolean(exchangeRate);
  });
};

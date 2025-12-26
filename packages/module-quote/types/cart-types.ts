import { Money, ProductItemInterface } from '@voguish/module-catalog/types';
import { HTMLInputTypeAttribute } from 'react';

export interface AppliedCoupon {
  code: string;
}

export interface AvailablePaymentMethods {
  code: string;
  title: string;
}

export interface CartAddressCountry {
  code: string;
  label: string;
}

export interface CartAddressRegion extends CartAddressCountry {
  region_id: number;
}

export interface CartAddressInterface {
  city: string;
  company?: string;
  country: CartAddressCountry;
  firstname: string;
  lastname: string;
  postcode: string;
  region: CartAddressRegion;
  street: string[];
  telephone: string;
  uid?: string | number;
}

export interface CartItemError {
  message: string;
  code: 'UNDEFINED' | 'ITEM_QTY' | 'ITEM_INCREMENTS';
}

export interface Discount {
  amount: Money;
  label: string;
}

export interface FixedProductTax {
  amount: Money;
  label: string;
}

export interface CartItemPrices {
  discounts: Discount[];
  fixed_product_taxes: FixedProductTax[];
  price: Money;
  price_including_tax: Money;
  row_total: Money;
  row_total_including_tax: Money;
  total_item_discount: Money;
}

export interface CartItemInterface {
  errors: CartItemError;
  prices: CartItemPrices;
  product: ProductItemInterface;
  quantity: number;
  sku: string;
  cartItemId: string;
}

export interface MinimumOrderAmount {
  minimum_order_amount_reached: boolean;
  minimum_order_description: string;
}

export interface CartTaxItem {
  amount: Money;
  label: string;
  percent: number;
}

export interface CartPrices {
  applied_rule_ids: string;
  applied_taxes: CartTaxItem[];
  coupon_code: string;
  discounts: Discount[];
  grand_total: Money;
  quote_currency_code: string;
  subtotal_excluding_tax: Money;
  subtotal_including_tax: Money;
  subtotal_with_discount_excluding_tax: Money;
}

export interface SelectedPaymentMethod {
  code: string;
  purchase_order_number: string;
  title: string;
}

export interface AvailableShippingMethod {
  amount: Money;
  available: boolean;
  carrier_code: string;
  carrier_title: string;
  error_message: string;
  method_code: string;
  method_title: string;
  price_excl_tax: Money;
  price_incl_tax: Money;
}

export interface SelectedShippingMethod {
  address: CartAddressInterface;
  amount: Money;
  amount_incl_tax: number;
  carrier_code: string;
  carrier_title: string;
  method_code: string;
  method_title: string;
  tax_amount: number;
}

export interface ShippingCartAddress extends CartAddressInterface {
  available_shipping_methods: AvailableShippingMethod[];
  customer_notes: string;
  selected_shipping_method: SelectedShippingMethod;
}

export interface CartInterface {
  applied_coupons: AppliedCoupon[];
  available_payment_methods: AvailablePaymentMethods[];
  billing_address: CartAddressInterface;
  email: string;
  id: string;
  is_virtual: boolean;
  isGuest: boolean;
  items: CartItemInterface[];
  minimum_order_amount?: MinimumOrderAmount;
  prices: CartPrices;
  selected_payment_method: SelectedPaymentMethod;
  shipping_addresses: ShippingCartAddress[];
  total_quantity: number;
}

export interface QuoteInterface {
  quote: CartInterface | null;
  id: string;
  isGuestId: string;
}

export interface EnteredOptionInput {
  id: number;
  value: string;
}

export interface AddProductsToCartInput {
  entered_options?: EnteredOptionInput[];
  parent_sku?: string;
  quantity: number;
  selected_options?: string[];
  sku: string;
}

export interface AddBundleProduct {
  data: AddProductsToCartInput;
  bundle_options?: BundleOptions[];
}

export interface AddSimpleProductsToCartInput {
  data: { quantity: number; sku: string };
  customizable_options?: CustomOptionsType[] | any;
}
export interface CustomOptionsType {
  id?: number;
  value_string?: string;
}
export interface BundleOptions {
  position?: string | number;
  title?: string;
  option_id?: string | number;
  type?: HTMLInputTypeAttribute | undefined;
  uid?: string;
  options?: any;
  id?: string;
  quantity?: number;
  value?: [string];
}

export interface CartUserInputError {
  code:
    | 'PRODUCT_NOT_FOUND'
    | 'NOT_SALABLE'
    | 'INSUFFICIENT_STOCK'
    | 'UNDEFINED';
  message: string;
}

export interface AddProductsToCartOutput {
  addVirtualProductsToCart: {
    cart: CartInterface;
    user_errors: CartUserInputError[];
  };
  addDownloadableProductsToCart: {
    cart: CartInterface;
    user_errors: CartUserInputError[];
  };
  addBundleProductsToCart: {
    cart: CartInterface;
    user_errors: CartUserInputError[];
  };
  addSimpleProductsToCart: {
    cart: CartInterface;
    user_errors: CartUserInputError[];
  };
  addProductsToCart: {
    cart: CartInterface;
    user_errors: CartUserInputError[];
  };
}

export type Error = {
  message: string;
};

export interface RemoveItemFromCartOutput {
  removeItemFromCart: {
    cart: CartInterface;
  };
  errors: Error[];
}

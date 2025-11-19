import { Trans, t } from '@lingui/macro';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getFormattedPrice, isValidArray } from '@utils/Helper';
import { Thumbnail } from '@voguish/module-catalog';
import AddToWishlist from '@voguish/module-catalog/Components/Product/Detail/AddToWishlist';
import { ProductItemInterface } from '@voguish/module-catalog/types';
import { useUpdateCartItems } from '@voguish/module-quote/hooks/cart-handler';
import { HTMLRenderer } from '@voguish/module-theme';
import { decode } from 'base-64';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useToken } from '~packages/module-customer';
const KeyboardArrowDown = dynamic(
  () => import('@mui/icons-material/KeyboardArrowDown')
);
const Actions = dynamic(() => import('./Actions'));
const KeyboardArrowUp = dynamic(
  () => import('@mui/icons-material/KeyboardArrowUp')
);

export interface CartItems {
  product?: ProductItemInterface;
  qty?: number;
  cartItemId?: string;
  page?: boolean;
  isPayment?: boolean;
  selectedShippingMethod?: any[];
  showShippingOptions?: boolean;
  shippingLoading?: boolean | object;
  showAddToActions?: boolean;
  onClick?: Function;
  cartItem?:
    | {
        cart_item_id?: number;
        cart_item_uid?: string;
        quantity?: number;
      }
    | any;
}

export const CartItem = (props: CartItems) => {
  const isCartPage = false || props.page;
  /**
   * Update Cart Item handler
   * updateCartItemsHandler - Handler to update the cart items.
   * isInProgress - Request is in Progress.
   */
  const { updateCartItemsHandler } = useUpdateCartItems();

  /**
   * Cart Item from props
   */
  const cartItem = props?.cartItem;
  /**
   * Show Loading while request for submitting the request
   */

  const { register, handleSubmit, setValue, getValues } = useForm();

  /**
   * Form Submit handler to update quantity.
   * @param {Object} data - form data
   */

  const updateCartItem = (data: CartItems) => {
    updateCartItemsHandler([
      {
        cart_item_id: Number(decode(cartItem?.cartItemId)),
        quantity: data?.qty,
      },
    ]);
  };
  const actionChooseQty = (type = 'increment') => {
    const oldValue = getValues('qty');
    if (type === 'decrement' && oldValue !== '' && oldValue > 1)
      setValue('qty', oldValue - 1);
    if (type === 'increment' && oldValue < 5) setValue('qty', oldValue + 1);
  };

  const { product, prices } = cartItem;

  /**
   * Item Price
   */
  const itemPrice = getFormattedPrice(
    prices?.price?.value,
    prices?.price?.currency
  );

  /**
   * Subtotal
   */
  const subTotal = getFormattedPrice(
    prices?.row_total?.value,
    prices?.row_total?.currency
  );
  const token = useToken();
  const items = cartItem?.configurable_options?.map((item: Config) => item);
  return (
    <>
      <Grid className="flex space-x-3 sm:items-start -3xs:grid">
        <Link href={`/catalog/product/${product?.url_key}`}>
          <div className="pt-1 -3xs:justify-center -3xs:flex">
            <Thumbnail
              onClick={props.onClick}
              className="object-contain border border-solid -3xs:mx-auto border-commonBorder"
              thumbnail={product?.thumbnail?.url}
              height={110}
              width={108}
              alt={product?.name}
            />
          </div>
        </Link>
        <Grid className="flex flex-col -3xs:pt-7" width="100%">
          <div className="flex items-center justify-between w-full">
            <Link
              href={`/catalog/product/${product?.url_key}`}
              className="w-full"
            >
              <HTMLRenderer
                onClick={props.onClick}
                className="text-[1.125rem] max-h-fit cursor-pointer font-normal leading-normal lg:leading-[0.75rem] break-words min-w-full"
                htmlText={product?.name || ''}
              ></HTMLRenderer>
            </Link>
            {props.showAddToActions && (
              <Actions cartItemId={cartItem?.cartItemId} />
            )}
          </div>{' '}
          <div className="flex flex-col w-full gap-2">
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 400,
                fontSize: '14px',
              }}
              className=""
            >
              <HTMLRenderer
                className="max-w-[86%] line-clamp-2 leading-normal break-words lg:leading-[1.25rem] text-reviewText"
                htmlText={product?.description?.html}
              ></HTMLRenderer>
            </Typography>

            {isValidArray(items) && (
              <span className="flex flex-col gap-1.5">
                {items.map((option: Config, index: Key | null | undefined) => (
                  <Typography
                    key={index}
                    className="flex items-center space-x-2 leading-normal lg:leading-[1.45rem] font-medium"
                  >
                    <span>{option.option_label} :</span>
                    <span>{option.value_label}</span>
                  </Typography>
                ))}
              </span>
            )}
            <Stack className="grid gap-2" width="100%" alignItems="center">
              <Typography
                variant="filter"
                className="uppercase whitespace-nowrap text-brand leading-normal lg:leading-[1.25rem]"
              >
                <Trans>In Stock</Trans>
              </Typography>
            </Stack>
            <form
              onSubmit={handleSubmit(
                updateCartItem as SubmitHandler<FieldValues>
              )}
              className="-sm:flex-[1_1_100%] py-1.5 sm:hidden min-w-fit"
            >
              <Grid className="flex items-center mx-auto space-x-2 ">
                <Typography variant="body1" className="pr-1.5">
                  <Trans>Qty :</Trans>
                </Typography>
                <span className="flex justify-center">
                  <button
                    className={`cursor-pointer h-6 w-6 justify-center flex items-center shadow-none bg-secondary text-white border-0 rounded ${
                      getValues('qty') > 1 && 'hover:bg-brand'
                    } hover:contrast-75`}
                    onClick={() => {
                      actionChooseQty('decrement');
                    }}
                    disabled={getValues('qty') < 1 && false}
                  >
                    <KeyboardArrowDown />
                  </button>
                  <label className="capitalize sr-only" htmlFor="quantity">
                    <Trans>Quantity</Trans>
                  </label>
                  <input
                    max={5}
                    readOnly
                    type="number"
                    className="relative  max-w-[3rem]  flex items-center px-3 mx-auto text-lg font-semibold text-center text-gray-700 border-none outline-none cursor-pointer hiddenInputButtons -z-10 readonly focus:outline-none text-md hover:text-black focus:text-black md:text-base"
                    min={1}
                    id="qty"
                    {...register('qty', {
                      value: cartItem?.quantity,
                      required: t`%1 is required.`,
                      min: {
                        value: 1,
                        message: t`minimum value`,
                      },
                      max: {
                        value: 5,
                        message: t`maximum value`,
                      },
                    })}
                    placeholder="0"
                  />
                  <button
                    className="flex items-center justify-center w-6 h-6 text-white rounded shadow-none cursor-pointer border- bg-secondary hover:bg-brand hover:contrast-75"
                    onClick={() => {
                      actionChooseQty('increment');
                    }}
                    disabled={getValues('qty') < 5 && false}
                  >
                    <KeyboardArrowUp />
                  </button>
                </span>
              </Grid>
              {/* {qtyWatch != cartItem?.quantity && (
              <button type="submit">Update Cart</button>
            )} */}
            </form>
          </div>
        </Grid>
      </Grid>
      <div>
        <div className="flex justify-between gap-4 min-w-fit -sm:flex-wrap">
          <form
            onSubmit={handleSubmit(
              updateCartItem as SubmitHandler<FieldValues>
            )}
            className="pt-4 pb-3 -sm:hidden min-w-fit"
          >
            <Grid className="flex items-center space-x-2 -md:justify-center">
              <Typography variant="body1" className="pr-1.5">
                <Trans>Qty :</Trans>
              </Typography>
              <span className="flex justify-center">
                <button
                  className={`cursor-pointer shadow-none bg-secondary flex justify-center items-center h-8 w-8 text-white border-0 rounded ${
                    getValues('qty') > 1 && 'hover:bg-brand'
                  } hover:contrast-75`}
                  onClick={() => {
                    actionChooseQty('decrement');
                  }}
                  disabled={getValues('qty') < 1 && false}
                >
                  <KeyboardArrowDown />
                </button>
                <label className="capitalize sr-only" htmlFor="quantity">
                  <Trans>Quantity</Trans>
                </label>
                <input
                  max={5}
                  readOnly
                  type="number"
                  className="relative flex max-w-[3rem] items-center px-3 mx-auto text-lg font-semibold text-center text-gray-700 border-none outline-none cursor-pointer hiddenInputButtons -z-10 readonly focus:outline-none text-md hover:text-black focus:text-black md:text-base"
                  min={1}
                  id="qty"
                  {...register('qty', {
                    value: cartItem?.quantity,
                    required: t`%1 is required.`,
                    min: {
                      value: 1,
                      message: t`minimum value`,
                    },
                    max: {
                      value: 5,
                      message: t`maximum value`,
                    },
                  })}
                  placeholder="0"
                />
                <button
                  className="flex items-center justify-center w-8 h-8 text-white border-0 rounded shadow-none cursor-pointer bg-secondary hover:bg-brand hover:contrast-75"
                  onClick={() => {
                    actionChooseQty('increment');
                  }}
                  disabled={getValues('qty') < 5 && false}
                >
                  <KeyboardArrowUp />
                </button>
              </span>
            </Grid>
            {/* {qtyWatch != cartItem?.quantity && (
              <button type="submit">Update Cart</button>
            )} */}
          </form>
          <div className="flex items-center justify-end mt-2 space-x-2 min-w-fit">
            <Typography variant="body1" className="text-black pt-0.">
              <Trans>Price:</Trans>
            </Typography>
            <Typography variant="CartItemPrice" className="text-black">
              {itemPrice}
            </Typography>
          </div>
          <div className="flex items-center justify-end mt-2 space-x-2 min-w-fit">
            <Typography variant="body1" className="text-black pt-0.5">
              <Trans>Total:</Trans>
            </Typography>
            <Typography variant="CartItemPrice" className="text-black">
              {subTotal}
            </Typography>
          </div>
        </div>
        {token && isCartPage && (
          <div className="relative flex items-center justify-end pt-2 mt-3 -mb-2 border-0 border-t border-solid border-commonBorder">
            <div className=" max-w-fit">
              <AddToWishlist
                card
                cartItemId={cartItem?.cartItemId}
                productSku={product?.sku}
                type="Move to wishlist"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartItem;

export type Config = {
  option_label:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  value_label:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
};

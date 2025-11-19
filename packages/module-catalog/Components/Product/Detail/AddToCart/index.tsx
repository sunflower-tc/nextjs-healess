import { Trans, t } from '@lingui/macro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { isValidArray } from '@utils/Helper';
import { useAddToCart } from '@voguish/module-quote/hooks';
import { AddProductsToCartInput } from '@voguish/module-quote/types';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AddToWishlist from '../AddToWishlist';
import { AddToCartProps } from './types';
const KeyboardArrowDown = dynamic(
  () => import('@mui/icons-material/KeyboardArrowDown')
);
const KeyboardArrowUp = dynamic(
  () => import('@mui/icons-material/KeyboardArrowUp')
);
const ConfigOptions = dynamic(() => import('../../Item/ConfigOptions'));

export const AddToCart = ({
  product,
  setProductPrice,
  setProductSku,
}: AddToCartProps) => {
  /**
   * Add to cart hook
   * ! Callback function need to pass sku and quantity.
   */
  const { isInProcess, doAddToCart } = useAddToCart();

  const methods = useForm<AddProductsToCartInput>();

  const { register, handleSubmit, setValue, getValues, watch } = methods;

  // const token = useToken();

  /**
   * To disable/enable the controls
   */
  const [quantity] = watch(['quantity', 'sku']);

  const selectedOptions = watch('selected_options');

  /**
   * ? Action Choose QTY
   * To increase and decrease the QTY on button click.
   * @param {string} type
   */
  const actionChooseQty = (type: 'increment' | 'decrement' = 'increment') => {
    const oldValue = getValues('quantity');
    if (type === 'decrement' && oldValue > 1)
      setValue('quantity', oldValue - 1);
    if (type === 'increment') setValue('quantity', oldValue + 1);
  };

  /**
   * ? Form Submit handler.
   */

  const submitHandler = (data: AddProductsToCartInput) => {
    if (!isInProcess) {
      doAddToCart(data);
    }
  };
  /**
   * intial qnty
   */
  useEffect(() => {
    setValue('quantity', 1);
  }, [setValue]);

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col"
      >
        <div className="flex flex-col gap-8 py-4 -lg:pt-8">
          {isValidArray(product.configurable_options) && (
            <ConfigOptions
              detailsPage
              configurableOptions={product.configurable_options}
              selectedOptions={selectedOptions || []}
              setProductPrice={setProductPrice}
              variants={product.variants || []}
              setProductSku={setProductSku}
            />
          )}

          <div className="flex flex-row items-center -3xs:items-start">
            <Typography className="w-32 text-primary" variant="body1">
              <Trans>Quantity:</Trans>
            </Typography>
            <Grid className="flex items-center -3xs:flex-col -3xs:items-start gap-1.5">
              <div className="flex items-center gap-4">
                <button
                  aria-label="decrement"
                  className={`cursor-pointer hiddenInputButtons flex items-center justify-center w-8 h-8 rounded shadow bg-secondary text-white border-0   ${
                    getValues('quantity') > 1 && 'hover:bg-brand'
                  } hover:contrast-75`}
                  onClick={(e) => {
                    e.preventDefault();
                    actionChooseQty('decrement');
                  }}
                  disabled={getValues('quantity') < 1 && false}
                >
                  <KeyboardArrowDown />
                </button>
                <Typography className="px-3 font-semibold text-gray-700 text-md hover:text-black focus:text-black md:text-base">
                  {quantity}
                </Typography>
                <label className="hidden capitalize sr-only" htmlFor="quantity">
                  <Trans>Quantity</Trans>
                </label>
                <input
                  max={6}
                  type="number"
                  className="hidden max-w-[1rem]"
                  min={1}
                  id="quantity"
                  {...register('quantity', {
                    value: 1,
                    required: t`%1 is required.`,
                    min: {
                      value: 1,
                      message: t`minimum value`,
                    },
                  })}
                  placeholder="0"
                />
                {/* <input
              type="hidden"
              {...register('selectedSku', {
                value: selectVariantSku,
              })}
            /> */}
                <button
                  aria-label="increment"
                  className="flex items-center justify-center w-8 h-8 text-white border-0 rounded shadow cursor-pointer bg-secondary hover:bg-brand hover:contrast-75"
                  onClick={(e) => {
                    e.preventDefault();
                    actionChooseQty('increment');
                  }}
                >
                  <KeyboardArrowUp />
                </button>
              </div>
              <Typography className="text-brand uppercase whitespace-nowrap  xl:pl-2.5 lg:pl2.5  md:pl-2.5 pl-0 lg:text-base md:text-base text-sm">
                {product?.stock_status?.replace(/[^a-z0-9]/gi, ' ')}
              </Typography>
            </Grid>
            <input
              type="hidden"
              id="sku"
              className="hidden"
              value={product?.sku}
              {...register('sku', {
                value: product?.sku,
              })}
            />
          </div>
        </div>
        <span>
          <div
            className={`flex justify-between w-full ${
              isValidArray(product.configurable_options) ? 'mt-14' : 'mt-8'
            }`}
          >
            <div className="grid items-center justify-center w-full gap-y-5 gap-x-5 -md:flex md:grid-cols-2">
              {isInProcess ? (
                <div className="flex justify-center w-full">
                  <CircularProgress className="mx-auto text-xs text-brand/80" />
                </div>
              ) : (
                <Button
                  color="secondary"
                  variant="contained"
                  className="w-full py-3.5 mx-auto shadow-none rounded-none"
                  type="submit"
                >
                  <Trans>Add to cart</Trans>
                </Button>
              )}
              <AddToWishlist productSku={product.sku} card detailsPage />
            </div>
          </div>
        </span>
      </Box>
    </FormProvider>
  );
};

export default AddToCart;

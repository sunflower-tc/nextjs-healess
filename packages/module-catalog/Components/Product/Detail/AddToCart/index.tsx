import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { isValidArray, isValidObject } from '@utils/Helper';
import {
  useAddSimpleProductsToCart,
  useAddToCart,
  useDownloadableProductsAddtoCart,
  useVirtualAddToCart,
} from '@voguish/module-quote/hooks';
import {
  AddProductsToCartInput,
  AddSimpleProductsToCartInput,
} from '@voguish/module-quote/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { ButtonMui } from '@voguish/module-theme/components/ui/ButtonMui';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ConfigOptions from '../../Item/ConfigOptions';
import GroupItem from './GroupItem';
import { AddToCartProps } from './types';

export const AddToCart = ({ product, sku, optionValue }: AddToCartProps) => {
  /**
   * Add to cart hook
   * ! Callback function need to pass sku and quantity.
   */
  const { isInProcess, doAddToCart } = useAddToCart();
  const {
    isInProcess: simpleProductProcess,
    doAddToCart: simpleProductAddToCart,
    error,
  } = useAddSimpleProductsToCart();
  const {
    isInProcess: downloadableProductsProcess,
    doAddToCart: downloadableProductsAddToCart,
  } = useDownloadableProductsAddtoCart();
  const {
    isInProcess: virtualProductsProcess,
    doAddToCart: virtualProductsAddToCart,
  } = useVirtualAddToCart();

  const methods = useForm<AddProductsToCartInput>();
  const [groupItem, setGroupItem] = useState<AddSimpleProductsToCartInput[]>(
    []
  );

  const { register, handleSubmit, setValue, getValues, watch } = methods;

  const { status } = useSession();

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
    const value = getValues('quantity');

    const oldValue = parseInt(value || ('1' as any));

    if (type === 'decrement' && oldValue > 1)
      setValue('quantity', oldValue - 1);
    if (type === 'increment' && oldValue < 5)
      setValue('quantity', oldValue + 1);
  };

  useEffect(() => {
    optionValue;
  });
  const submitHandler = (data: AddProductsToCartInput) => {
    if (product?.__typename === 'ConfigurableProduct' && !isInProcess) {
      doAddToCart(data);
    }
    if (product?.__typename === 'GroupedProduct' && !simpleProductProcess) {
      simpleProductAddToCart(groupItem);
    }

    if (product?.__typename === 'SimpleProduct' && !simpleProductProcess) {
      simpleProductAddToCart(
        isValidArray(optionValue)
          ? [
              {
                data,
                customizable_options: optionValue as any,
              },
            ]
          : [{ data }]
      );
    }
    if (
      product?.__typename === 'DownloadableProduct' &&
      !downloadableProductsProcess
    ) {
      downloadableProductsAddToCart([{ data: data }]);
    }
    if (product?.__typename === 'VirtualProduct' && !virtualProductsProcess) {
      virtualProductsAddToCart({ data: data });
    }
  };
  useEffect(() => {
    setValue('quantity', 1);
  }, [setValue]);
  const { t } = useTranslation('common');
  const errorItem = error?.cause as {
    extensions: { category: string };
    message: string;
  };
  return (
    <FormProvider {...methods}>
      {isValidArray(product?.items) &&
        product?.__typename === 'GroupedProduct' && (
          <ErrorBoundary>
            <div className="flex items-center justify-between gap-4 pt-4 pb-2">
              <h2 className="my-0 text-base font-medium leading-5">
                {t('Product Name')}{' '}
              </h2>
              <p className="my-0 text-base font-medium leading-5">
                {t('Quantity')}
              </p>
            </div>
            {product?.items?.map(
              (item, _, listItems) =>
                isValidObject(item) && (
                  <ErrorBoundary key={item?.position}>
                    <GroupItem
                      groupItem={groupItem}
                      setGroupItem={setGroupItem}
                      item={item as any}
                      listItems={listItems}
                    />
                  </ErrorBoundary>
                )
            )}
          </ErrorBoundary>
        )}
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col"
      >
        <div className="flex flex-col gap-8 py-4 -lg:pt-8">
          {isValidArray(product?.configurable_options) && (
            <ErrorBoundary>
              <ConfigOptions
                detailsPage
                configurableOptions={product.configurable_options}
                selectedOptions={selectedOptions || []}
                variants={product.variants || []}
              />
            </ErrorBoundary>
          )}
          {product?.__typename === 'DownloadableProduct' && (
            <div className="grid gap-2 text-base">
              {isValidArray(product?.downloadable_product_links) && (
                <ErrorBoundary>
                  {' '}
                  <h3 className="my-1 font-normal text-black">
                    {t('Sample')} :
                  </h3>
                  {product?.downloadable_product_links?.map((item) => (
                    <div key={item?.sort_order}>
                      <Link
                        className="my-0 underline text-brand decoration-brand underline-offset-4"
                        href={`${item?.sample_url}`}
                        target="_blank"
                      >
                        <p className="my-0 font-normal duration-200 hover:scale-y-110">
                          {item?.title}
                        </p>
                      </Link>
                    </div>
                  ))}
                </ErrorBoundary>
              )}
            </div>
          )}
          {product?.__typename !== 'GroupedProduct' && (
            <div className="items.5-center flex flex-row gap-1 -3xs:items-start">
              <Typography className="w-32 text-primary" variant="body1">
                {t('Quantity')} :
              </Typography>
              <ErrorBoundary>
                <Grid className="flex items-center gap-1.5 -3xs:flex-col -3xs:items-start">
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
                    <label
                      className="hidden capitalize sr-only"
                      htmlFor="quantity"
                    >
                      {t('Quantity')}
                    </label>
                    <input
                      max={6}
                      type="number"
                      className="hidden max-w-[1rem]"
                      min={1}
                      id="quantity"
                      {...register('quantity', {
                        value: 1,
                        required: t('%1 is required.'),
                        min: {
                          value: 1,
                          message: t('minimum value'),
                        },
                      })}
                      placeholder="0"
                    />

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
                  <Typography className="lg:pl2.5 whitespace-nowrap pl-0 text-sm !capitalize text-brand md:pl-2.5 md:text-base lg:text-base xl:pl-2.5">
                    {product?.stock_status?.replace(/[^a-z0-9]/gi, ' ')}
                  </Typography>
                </Grid>
              </ErrorBoundary>
              <input
                type="hidden"
                id="sku"
                className="hidden"
                defaultValue={product?.sku}
                {...register('sku', {
                  value: product?.sku,
                })}
              />
            </div>
          )}
        </div>
        {errorItem?.extensions?.category == 'graphql-input' && (
          <span className="py-2 text-xs text-red-900">{`${errorItem?.message} Select Required Marked Option`}</span>
        )}
        <span>
          <div
            className={`flex justify-between w-full ${
              isValidArray(product?.configurable_options) ? 'mt-14' : 'mt-8'
            }`}
          >
            <div className="flex items-center justify-center w-full">
              <ButtonMui
                color="secondary"
                isLoading={
                  isInProcess ||
                  simpleProductProcess ||
                  downloadableProductsProcess ||
                  virtualProductsProcess ||
                  false
                }
                variant="contained"
                className="mx-auto w-full rounded-none py-3.5 shadow-none"
                type="submit"
              >
                {t('Add to cart')}
              </ButtonMui>
            </div>
          </div>
        </span>
      </Box>
    </FormProvider>
  );
};

export default AddToCart;

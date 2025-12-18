import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { WHITE_HEX_CODE } from '@utils/Constants';
import { getFormattedPrice, isValidArray } from '@utils/Helper';
import { DetailProp } from '@voguish/module-catalog/types';
import { useBundleAddToCart } from '@voguish/module-quote/hooks';
import {
  AddBundleProduct,
  AddProductsToCartInput,
  BundleOptions,
} from '@voguish/module-quote/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';

import { ButtonMui } from '@voguish/module-theme/components/ui/ButtonMui';

import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { Key, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
const KeyboardArrowUp = dynamic(
  () => import('@mui/icons-material/KeyboardArrowUp')
);
const KeyboardArrowDown = dynamic(
  () => import('@mui/icons-material/KeyboardArrowDown')
);
function BundleProduct(props: DetailProp) {
  const { isInProcess, doAddToCart } = useBundleAddToCart();
  const [bundleItem, setBundleItem] = useState<BundleOptions[]>([]);
  const { t } = useTranslation('common');

  const methods = useForm<AddBundleProduct | AddProductsToCartInput>();
  const { register, handleSubmit, setValue, getValues, watch } = methods;
  // const token = useToken();

  /**
   * To disable/enable the controls
   */
  const [quantity] = watch(['quantity', 'sku']);

  /**
   * ? Action Choose QTY
   * To increase and decrease the QTY on button click.
   * @param {string} type
   */
  const actionChooseQty = (type: 'increment' | 'decrement' = 'increment') => {
    const value = getValues('quantity');

    const oldValue = parseInt(`${value}` || '1');

    if (type === 'decrement' && oldValue > 1)
      setValue('quantity', oldValue - 1);
    if (type === 'increment' && oldValue < 5)
      setValue('quantity', oldValue + 1);
  };

  const submitHandler = (data: AddBundleProduct | any) => {
    const bundle_options = bundleItem as unknown as BundleOptions;

    if (!isInProcess) {
      doAddToCart({ data: data, bundle_options: bundle_options } as any);
    }
  };
  useEffect(() => {
    return setValue('quantity', 1);
  }, [setValue]);

  return (
    props?.product?.__typename === 'BundleProduct' && (
      <FormProvider {...methods}>
        <div id="bundle_options" className="grid gap-8 pb-20 lg:grid-cols-2">
          <div className="border border-solid divide-x-0 divide-y rounded-md h-fit divide-solid divide-checkoutBorder border-checkoutBorder">
            <div className="px-4 py-5">
              <h3 className="my-0 text-lg font-semibold leading-7 -tracking-tight">
                {t('Customize')}
              </h3>
            </div>

            <div className="grid gap-5 px-4 py-5 divide-x-0 divide-y divide-solid divide-checkoutBorder">
              {props.product?.items?.map((item) => (
                <div
                  key={`${item?.uid}+${item?.title}`}
                  className="first:pt-0 pt-3.5"
                >
                  <h3 className="pb-3 my-0 text-lg font-medium leading-7">
                    {item?.title}
                  </h3>
                  <ErrorBoundary>
                    {' '}
                    <BundleItem
                      bundleItem={bundleItem}
                      setBundleItem={setBundleItem}
                      item={item as unknown as BundleOptions}
                    />
                  </ErrorBoundary>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div
              className={`sticky flex flex-col gap-8 ${
                props?.quickView ? 'top-16' : 'top-28'
              }`}
            >
              <div className="border border-solid divide-x-0 divide-y rounded-md h-fit divide-solid divide-checkoutBorder border-checkoutBorder">
                <div className="px-4 py-5">
                  <h3 className="my-0 text-lg font-semibold leading-7 -tracking-tight">
                    {t('Your Customization')}
                  </h3>
                </div>
                <ErrorBoundary>
                  <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="grid items-center w-full px-5 py-4"
                  >
                    <div className="flex flex-row flex-wrap items-center justify-between gap-4">
                      <ErrorBoundary>
                        <span className="text-2xl font-bold leading-6">
                          {getFormattedPrice(
                            props?.product?.price_range?.minimum_price
                              ?.regular_price?.value,
                            props?.product?.price_range?.minimum_price
                              ?.regular_price?.currency
                          )}
                        </span>
                      </ErrorBoundary>
                      <div className="flex flex-row items-center">
                        <Typography
                          className="px-2 text-primary"
                          variant="body1"
                        >
                          {t('Qty')} :
                        </Typography>{' '}
                        <ErrorBoundary>
                          <div className="flex items-center gap-4">
                            <button
                              aria-label="decrement"
                              className={`cursor-pointer hiddenInputButtons flex items-center justify-center w-8 h-8 rounded shadow bg-brand text-white border-0   ${
                                getValues('quantity') > 1 && 'hover:bg-brand'
                              } hover:contrast-75`}
                              onClick={(e) => {
                                e.preventDefault();
                                actionChooseQty('decrement');
                              }}
                              disabled={getValues('quantity') < 1 && false}
                            >
                              <KeyboardArrowDown
                                sx={{ color: WHITE_HEX_CODE }}
                                className="text-white"
                              />
                            </button>
                            <Typography className="px-3 font-semibold text-gray-700 text-md hover:text-black focus:text-black md:text-base">
                              {quantity as number}
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
                              className="flex items-center justify-center w-8 h-8 text-white border-0 rounded shadow cursor-pointer bg-brand hover:bg-brand hover:contrast-75"
                              onClick={(e) => {
                                e.preventDefault();
                                actionChooseQty('increment');
                              }}
                            >
                              <KeyboardArrowUp className="text-white" />
                            </button>
                          </div>
                        </ErrorBoundary>
                        <ErrorBoundary>
                          <input
                            type="hidden"
                            id="sku"
                            className="hidden"
                            value={props?.product?.sku}
                            {...register('sku', {
                              value: props?.product?.sku,
                            })}
                          />
                        </ErrorBoundary>
                      </div>
                    </div>

                    <div
                      className={`flex justify-between w-full ${
                        isValidArray(props?.product.configurable_options)
                          ? 'mt-14'
                          : 'mt-8'
                      }`}
                    >
                      <div className="flex w-full">
                        <ButtonMui
                          isLoading={isInProcess || false}
                          color="primary"
                          variant="contained"
                          className="mx-auto w-full rounded-none py-3.5 shadow-none"
                          type="submit"
                        >
                          {t('Add to cart')}
                        </ButtonMui>
                      </div>
                    </div>
                  </form>
                </ErrorBoundary>
              </div>
              {isValidArray(bundleItem) && (
                <div className="flex flex-col justify-start border border-solid divide-x-0 divide-y rounded-md h-fit divide-solid divide-checkoutBorder border-checkoutBorder">
                  <div className="px-4 py-5">
                    <h3 className="my-0 text-lg font-semibold leading-7 -tracking-tight">
                      {t('Summary')}
                    </h3>
                  </div>
                  <div className="grid gap-5 px-4 py-5 divide-x-0 divide-y divide-solid divide-checkoutBorder">
                    {props.product?.items?.map(
                      (item: any) =>
                        bundleItem.find(
                          (option) => option.id === item.option_id
                        ) && (
                          <ErrorBoundary key={item?.uid}>
                            <div className="grid gap-2 pt-4 first:pt-0">
                              <p className="text-lg font-normal">
                                {item?.title}
                              </p>
                              <div className="flex items-center text-sm text-secondary">
                                {bundleItem?.map(
                                  (singleItem) =>
                                    item?.options?.find(
                                      (option: { id: string | number }) =>
                                        `${option?.id}` ===
                                        `${singleItem?.value?.[0]}`
                                    ) && (
                                      <p key={item.uid}>
                                        {singleItem?.quantity}
                                      </p>
                                    )
                                )}
                                <span className="px-1">X</span>
                                {item?.options?.map(
                                  (singleItem: {
                                    id: string | number;
                                    product: { name: string };
                                  }) =>
                                    bundleItem.find(
                                      (option) =>
                                        `${option?.value}` ===
                                        `${singleItem?.id}`
                                    ) && (
                                      <p key={item.uid}>
                                        {singleItem?.product?.name ||
                                          singleItem?.id}
                                      </p>
                                    )
                                )}
                              </div>
                            </div>
                          </ErrorBoundary>
                        )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </FormProvider>
    )
  );
}

export default BundleProduct;
type BundleItemProps = {
  item: BundleOptions;
  bundleItem: BundleOptions[];
  setBundleItem: (items: BundleOptions[]) => void;
};
function BundleItem({
  item,
  bundleItem,
  setBundleItem,
}: {
  item: BundleOptions;
  bundleItem: BundleOptions[];
  setBundleItem: (items: BundleOptions[]) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (!item.option_id || !item.options) return;

    const newEntry: BundleOptions = {
      id: item.option_id as string,
      value: item.options.map((opt: { id: any }) => `${opt.id}`),
      quantity,
    };
    /*@ts-ignore*/
    setBundleItem((prev: any[]) => {
      const filtered = prev.filter(
        (b: { id: string | number | undefined }) => b.id !== item.option_id
      );
      return [...filtered, newEntry];
    });
  }, [quantity, item.option_id, item.options, setBundleItem]);

  const changeQty = (type: 'increment' | 'decrement') => {
    setQuantity((prev) => {
      if (type === 'increment' && prev < 5) return prev + 1;
      if (type === 'decrement' && prev > 1) return prev - 1;
      return prev;
    });
  };

  return (
    <div>
      {item.options?.map(
        (opt: {
          id: Key | null | undefined;
          product: {
            name: any;
            price_range: {
              minimum_price: {
                regular_price: {
                  value: string | number;
                  currency: string | undefined;
                };
              };
            };
          };
        }) => (
          <div
            key={opt.id}
            className="flex items-center pb-1 gap-1.5 text-base font-normal leading-6"
          >
            <span>{opt.product?.name || opt?.id}</span> <span>+</span>
            <span>
              {getFormattedPrice(
                opt.product.price_range.minimum_price.regular_price.value,
                opt.product.price_range.minimum_price.regular_price.currency
              )}
            </span>
          </div>
        )
      )}
      <div className="flex items-center mt-2 gap-x-4">
        <Typography variant="body1" className="ltr:pr-1.5 rtl:pl-1.5">
          {t('Qty')} :
        </Typography>
        <button
          onClick={() => changeQty('decrement')}
          disabled={quantity <= 1}
          className={`cursor-pointer shadow-none bg-brand flex justify-center items-center h-6 w-6 text-black border-0 rounded ${
            quantity > 1 && 'hover:bg-brand'
          }  hover:contrast-75`}
          aria-label="decrement"
        >
          <KeyboardArrowDown className="text-white" />
        </button>
        <span className="relative flex items-center px-3 mx-0 text-lg font-semibold text-center text-gray-700 border-none outline-none cursor-pointer w-fit text-md hover:text-black focus:text-black focus:outline-none md:text-base">
          {quantity}
        </span>
        <button
          aria-label="increment"
          className="flex items-center justify-center w-6 h-6 text-black border-0 rounded shadow-none cursor-pointer bg-brand hover:bg-brand hover:contrast-75"
          onClick={() => changeQty('increment')}
          disabled={quantity >= 5}
        >
          <KeyboardArrowUp className="text-white" />
        </button>
      </div>
    </div>
  );
}

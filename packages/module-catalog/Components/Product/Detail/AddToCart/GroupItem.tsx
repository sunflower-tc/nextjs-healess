import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import { getFormattedPrice } from '@utils/Helper';
import { ProductInterface } from '@voguish/module-customer/types';
import { AddProductsToCartInput } from '@voguish/module-quote/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { HTMLRenderer } from '@voguish/module-theme/components/HTMLRenderer';
import { useTranslation } from 'next-i18next';
import { FieldValues, useForm } from 'react-hook-form';
const GroupItem = ({
  item,
  groupItem,
  setGroupItem,
  listItems,
}: {
  item: { product: ProductInterface; position: number };
  groupItem: any;
  setGroupItem: any;
  listItems?: any;
}) => {
  const methods = useForm<AddProductsToCartInput>();
  const { register, setValue, getValues, watch, handleSubmit } = methods;
  // const token = useToken();

  /**
   * To disable/enable the controls
   */
  watch(['quantity', 'sku']);

  /**
   * ? Action Choose QTY
   * To increase and decrease the QTY on button click.
   * @param {string} type
   */
  const actionChooseQty = (type: 'increment' | 'decrement' = 'increment') => {
    const value = getValues('quantity');
    const oldValue = parseInt(`${value}`) || 0;

    if (type === 'decrement' && oldValue > 0) {
      setValue('quantity', oldValue - 1);
    }

    if (type === 'increment' && oldValue < 5) {
      setValue('quantity', oldValue + 1);
    }
  };

  const addItem = (data: FieldValues) => {
    let itemArray =
      groupItem.filter(
        (option: { data: { sku: string } }) =>
          option.data.sku !== item?.product?.sku
      ) || [];
    itemArray.push({
      data: {
        sku: data.sku,
        quantity: data.quantity,
      },
    });

    setGroupItem(itemArray);
  };
  const { t } = useTranslation('common');

  const isLastIndex = listItems?.at(-1)?.position === item?.position;
  const errorMessage = useMemo(() => {
    const hasSelectedItem = groupItem?.some(
      (i: any) => Number(i?.data?.quantity) > 0
    );
    if (!hasSelectedItem) {
      return 'At least one item must be selected.';
    }
    return '';
  }, [groupItem]);

  return (
    <ErrorBoundary>
      <div className="relative w-full">
        <div className="flex flex-wrap justify-between gap-4 pb-5 border-0 border-b border-solid border-checkoutBorder">
          <h4 className="my-0 flex flex-col gap-0.5 pt-1 text-base font-normal leading-6">
            <HTMLRenderer htmlText={item?.product?.name || ''}></HTMLRenderer>
            <ErrorBoundary>
              <span>
                {' '}
                {getFormattedPrice(
                  item?.product?.price_range?.minimum_price?.regular_price
                    ?.value,
                  item?.product?.price_range?.minimum_price?.regular_price
                    ?.currency,
                  false
                )}
              </span>
            </ErrorBoundary>
          </h4>
          <Grid className="flex items-center space-x-2 -md:justify-center">
            <Typography variant="body1" className="ltr:pr-1.5 rtl:pl-1.5">
              {t('Qty')} :
            </Typography>
            <ErrorBoundary>
              <form
                onSubmit={handleSubmit(addItem)}
                className="flex items-center justify-center"
              >
                <input
                  type="hidden"
                  id="sku"
                  className="hidden"
                  value={item?.product?.sku}
                  {...register('sku', {
                    value: item?.product?.sku,
                  })}
                />
                <button
                  aria-label="decrease quantity"
                  className={`cursor-pointer shadow-none bg-secondary flex justify-center items-center h-6 w-6 text-white border-0 rounded ${
                    getValues('quantity') > 0 && 'hover:bg-brand'
                  } hover:contrast-75`}
                  onClick={() => {
                    actionChooseQty('decrement');
                  }}
                  disabled={getValues('quantity') < 0 && false}
                >
                  <KeyboardArrowDown />
                </button>
                <label className="capitalize sr-only" htmlFor="quantity">
                  {t('Quantity')}
                </label>
                <input
                  readOnly
                  max={5}
                  defaultValue={0}
                  type="number"
                  className="hiddenInputButtons readonly text-md relative mx-auto flex max-w-[3rem] cursor-pointer items-center border-none px-3 text-center text-lg font-semibold text-gray-700 outline-none hover:text-black focus:text-black focus:outline-none md:text-base"
                  min={0}
                  id="qty"
                  {...register('quantity', {
                    required: t('%1 is required.'),
                    min: {
                      value: 0,
                      message: t('minimum value'),
                    },
                    max: {
                      value: 5,
                      message: t('maximum value'),
                    },
                  })}
                />
                <button
                  aria-label="increase quantity"
                  className="flex items-center justify-center w-6 h-6 text-white border-0 rounded shadow-none cursor-pointer bg-secondary hover:bg-brand hover:contrast-75"
                  onClick={() => {
                    actionChooseQty('increment');
                  }}
                  disabled={getValues('quantity') < 5 && false}
                >
                  <KeyboardArrowUp />
                </button>
              </form>
            </ErrorBoundary>
          </Grid>
        </div>
        {errorMessage && isLastIndex && (
          <strong className=" absolute text-red-600 font-normal text-xs bottom-1 left-0.5 ">
            At least one item must be selected
          </strong>
        )}
      </div>
    </ErrorBoundary>
  );
};
export default GroupItem;

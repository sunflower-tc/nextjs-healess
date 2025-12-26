import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { getFormattedPrice, isValidArray } from '@utils/Helper';
import Thumbnail from '@voguish/module-catalog/Components/Product/Item/Thumbnail';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { HTMLRenderer } from '@voguish/module-theme/components/HTMLRenderer';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Key, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import BundleItem from '../Cart/BundleItem';
import { Config } from '../Cart/CartItem';
const CartTotals = dynamic(() => import('../Cart/CartTotal'));
const KeyboardArrowDown = dynamic(
  () => import('@mui/icons-material/KeyboardArrowDown')
);
function OrderSummary({ onClick, show = true }: any) {
  const { t } = useTranslation('common');

  /**
   * Cart Item from props
   */
  const quote = useSelector((state: RootState) => state?.cart?.quote || null);
  /**
   * Show Loading while request for submitting the request
   */
  const grandTotal = quote?.prices?.grand_total?.value
    ? getFormattedPrice(
        quote.prices.grand_total.value,
        quote.prices.grand_total.currency
      )
    : getFormattedPrice(0, 'USD');
  /** Quantity Watch */

  /**
   * Form Submit handler to update quantity.
   * @param {Object} data - form data
   */
  const [moreInfo, setMoreInfo] = useState(false);

  const cartItem = quote?.items || [];
  return (
    <ErrorBoundary>
      <Grid
        className="sticky top-40"
        item
        xs={12}
        md={5}
        component={Paper}
        elevation={0}
        borderRadius={{ xs: 2, sm: 0 }}
        square
      >
        <div className="grid min-w-full gap-6 scroll-smooth">
          <div className="border border-solid rounded-md border-checkoutBorder">
            <div className="flex flex-col px-6 py-2 border-0 border-b border-solid border-checkoutBorder">
              <div className="flex items-center justify-between">
                {' '}
                <Typography
                  variant="ProfileName"
                  className="leading-normal tracking-wider -lg:flex -lg:flex-col"
                >
                  {t('Order Summary')}
                </Typography>{' '}
                <Button
                  variant="text"
                  className="text-sm font-normal leading-normal tracking-wider text-main lg:leading-[1.25rem] -lg:hidden"
                >
                  {cartItem.length} {t('items')}
                </Button>
                <Button
                  onClick={onClick}
                  variant="text"
                  className="tracking-wider text-main lg:hidden"
                >
                  {cartItem.length} {t('items')}
                </Button>
              </div>
              <Typography
                variant="ProfileName"
                className="-mt-1 font-bold leading-normal tracking-wider lg:hidden -lg:flex -lg:flex-col"
              >
                {grandTotal}
              </Typography>
            </div>
            {show &&
              cartItem?.map((item: [] | object | any) => (
                <div
                  key={item.cartItemId}
                  className="relative p-5 border-0 border-b border-solid border-checkoutBorder last:border-b-0 -3xs:-ml-2"
                >
                  <Grid className="flex gap-x-3 -3xs:grid">
                    <Link href={`/catalog/product/${item?.url_key}`}>
                      <div className="-3xs:flex -3xs:justify-center">
                        <Thumbnail
                          className="object-contain border border-solid border-checkoutBorder -3xs:mx-auto"
                          thumbnail={item?.product?.thumbnail?.url}
                          height={108}
                          width={108}
                          alt={item?.product?.name}
                        />
                      </div>
                    </Link>
                    <Grid className="w-full -3xs:pt-7">
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/catalog/product/${item?.product?.url_key}`}
                        >
                          <HTMLRenderer
                            className="cursor-pointer text-[1rem] font-normal leading-5"
                            htmlText={item?.product?.name || ''}
                          ></HTMLRenderer>
                        </Link>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '20px',
                          }}
                          className="line-clamp-2 text-main"
                        >
                          <HTMLRenderer
                            htmlText={item?.product?.description?.html}
                          ></HTMLRenderer>
                        </Typography>
                        <span className="hidden md:flex">
                          {' '}
                          <BundleItem bundle_options={item?.bundle_options} />
                        </span>
                        <Typography className="flex items-center gap-x-2 text-sm font-medium leading-normal text-secondary lg:leading-[1.45rem]">
                          <span className="font-semibold">{t('Qty')} :</span>
                          <span>{item?.quantity}</span>
                        </Typography>
                        {isValidArray(item?.configurable_options) && (
                          <span className="flex -mt-1 mb-1 flex-col gap-1.5">
                            {item?.configurable_options.map(
                              (
                                option: Config,
                                index: Key | null | undefined
                              ) => (
                                <Typography
                                  key={index}
                                  className="flex items-center gap-x-2 text-sm font-medium leading-normal text-secondary lg:leading-[1.45rem]"
                                >
                                  <span className="font-semibold">
                                    {option.option_label} :
                                  </span>
                                  <span>{option.value_label}</span>
                                </Typography>
                              )
                            )}
                          </span>
                        )}
                        {item.product?.__typename === 'BundleProduct' && (
                          <ErrorBoundary>
                            <button
                              className="flex items-center px-0 text-sm font-semibold bg-transparent border-0 max-w-fit md:hidden"
                              onClick={() => setMoreInfo(!moreInfo)}
                            >
                              More Info{' '}
                              <KeyboardArrowDown
                                className={`text-xl ${
                                  moreInfo
                                    ? 'fa-arrow-down-close'
                                    : 'fa-arrow-down'
                                }`}
                              />
                            </button>
                            {moreInfo && (
                              <span className="md:hidden">
                                <BundleItem
                                  bundle_options={item?.bundle_options}
                                />
                              </span>
                            )}
                          </ErrorBoundary>
                        )}
                        <div className="flex flex-col flex-wrap items-center justify-between min-w-full lg:flex-col lg:items-start xl:flex-row xl:items-center -lg:flex-row -md:pb-2 -3xs:pt-2">
                          <Typography
                            variant="filter"
                            sx={{ lineHeight: '20px' }}
                            className="uppercase"
                          >
                            {item?.product?.sku}
                          </Typography>

                          <div className="flex flex-wrap items-center justify-between w-full pt-1">
                            <Typography
                              variant="filter"
                              sx={{ lineHeight: '20px' }}
                              className="gap-nowrap !capitalize text-brand"
                            >
                              {item?.stock_status
                                ? item?.stock_status?.replace(
                                    /[^a-z0-9]/gi,
                                    ' '
                                  )
                                : 'In Stock'}
                            </Typography>
                            <Typography
                              variant="CartItemPrice"
                              sx={{ lineHeight: '20px' }}
                            >
                              {t('Total :')}{' '}
                              {getFormattedPrice(
                                item?.prices?.row_total?.value,
                                item?.prices?.row_total?.currency
                              )}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              ))}
          </div>
          {show && (
            <div className="flex flex-col w-full mx-auto border border-solid rounded-md border-checkoutBorder">
              <div className="px-6 py-2 border-0 border-b border-solid border-checkoutBorder">
                <Typography variant="ProfileName">{t('Summary')}</Typography>
              </div>
              <div className="w-full px-4 mt-3">
                <div className="px-3.5">
                  <CartTotals cart={false} quote={quote} />
                </div>
                <div className="flex justify-between px-6 py-8 mx-px">
                  <Typography
                    variant="h3"
                    className="font-bold leading-normal text-black lg:leading-[1.45rem]"
                  >
                    {t('Total :')}
                  </Typography>
                  <Typography
                    variant="h3"
                    className="font-bold leading-normal text-black lg:leading-[1.45rem]"
                  >
                    {grandTotal}
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </div>
      </Grid>
    </ErrorBoundary>
  );
}
export default OrderSummary;

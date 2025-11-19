import { Trans } from '@lingui/macro';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { getFormattedPrice, isValidArray } from '@utils/Helper';
import { Thumbnail } from '@voguish/module-catalog';
import { HTMLRenderer } from '@voguish/module-theme';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
const AppliedCoupons = dynamic(() => import('../Cart/AppliedCoupons'));
const CartTotals = dynamic(() => import('../Cart/CartTotal'));
function OrderSummary({ onClick, show = true }: any) {
  /**
   * Cart Item from props
   */
  const quote = useSelector((state: RootState) => state.cart?.quote || null);
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

  const cartItem = quote?.items || [];
  return (
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
                <Trans>Order Summary</Trans>
              </Typography>{' '}
              <Button
                variant="text"
                className="text-sm font-normal tracking-wider -lg:hidden text-main leading-normal lg:leading-[1.25rem]"
              >
                {cartItem.length} <Trans>items</Trans>
              </Button>
              <Button
                onClick={onClick}
                variant="text"
                className="tracking-wider lg:hidden text-main"
              >
                {cartItem.length} <Trans>items</Trans>
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
                className="relative p-5 border-0 border-b border-solid -3xs:-ml-2 last:border-b-0 border-checkoutBorder "
              >
                <Grid className="flex space-x-3 -3xs:grid">
                  <Link href={`/catalog/product/${item?.url_key}`}>
                    <div className="-3xs:justify-center -3xs:flex">
                      <Thumbnail
                        className="object-contain border border-solid -3xs:mx-auto border-checkoutBorder"
                        thumbnail={item?.product?.thumbnail?.url}
                        height={108}
                        width={108}
                        alt={item?.product?.name}
                      />
                    </div>
                  </Link>
                  <Grid className="w-full -3xs:pt-7">
                    <div className="flex flex-col gap-2">
                      <Link href={`/catalog/product/${item?.product?.url_key}`}>
                        <HTMLRenderer
                          className="text-[1rem] leading-5 cursor-pointer font-normal"
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
                        className="text-main line-clamp-2"
                      >
                        <HTMLRenderer
                          htmlText={item?.product?.description?.html}
                        ></HTMLRenderer>
                      </Typography>

                      <div className="flex flex-col flex-wrap items-center justify-between min-w-full lg:items-start xl:items-center -lg:flex-row lg:flex-col xl:flex-row -3xs:pt-2 -md:pb-2">
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
                            className="uppercase whitespace-nowrap text-brand"
                          >
                            <Trans>In Stock</Trans>
                          </Typography>
                          <Typography
                            variant="CartItemPrice"
                            sx={{ lineHeight: '20px' }}
                          >
                            <Trans>Total :</Trans>{' '}
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
              <Typography variant="ProfileName">
                <Trans>Summary</Trans>
              </Typography>
            </div>
            <div className="w-full px-4 mt-3">
              <div className="px-3.5">
                <CartTotals cart={false} quote={quote} />
              </div>
              {quote?.applied_coupons &&
                isValidArray(quote?.applied_coupons) > 0 && (
                  <AppliedCoupons appliedCoupons={quote?.applied_coupons} />
                )}
              <div className="flex justify-between px-6 py-8 mx-auto">
                <Typography
                  variant="h3"
                  className="font-bold leading-normal text-black lg:leading-[1.45rem]"
                >
                  <Trans>Total :</Trans>
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
  );
}
export default OrderSummary;

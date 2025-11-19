import styled from '@emotion/styled';
import { Trans } from '@lingui/macro';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getFormattedPrice, isValidArray } from '@utils/Helper';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { EmptyCart } from './EmptyCart';
export interface CartType {
  toggleDrawer?: Function | any;
  cartOpen?: boolean | any;
  cartItems?: [];
}
const LaunchIcon = dynamic(() => import('@mui/icons-material/Launch'));

const CartTotals = dynamic(() => import('./CartTotal'));
const CartDiscount = dynamic(() => import('./CartDiscount'));
const CartItem = dynamic(() => import('./CartItem'));
const AppliedCoupons = dynamic(() => import('./AppliedCoupons'));
const Clear = dynamic(() => import('@mui/icons-material/Clear'));

export function Cart({ toggleDrawer, cartOpen }: CartType) {
  /**
   * Fetching cart date from redux
   */
  const quote = useSelector((state: RootState) => state.cart?.quote || null);
  const grandTotal = quote?.prices?.grand_total?.value
    ? getFormattedPrice(
        quote.prices.grand_total.value,
        quote.prices.grand_total.currency
      )
    : getFormattedPrice(0, 'USD');

  /**
   * Cart Items
   */
  const cartItems = quote?.items || [];

  const Root = styled('div')(({ theme }: any) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));
  const list = () => (
    <Box
      className="overflow-x-hidden "
      sx={{
        width: { xs: '99vw', sm: '98vw', md: 550 },
        minWidth: { xs: '99vw', sm: '98vw', md: 550 },
      }}
      role="presentation"
    >
      <Grid
        className="px-8 py-6 border-0 border-b border-solid border-commonBorder"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography variant="h2">
          <Trans>Shopping Cart</Trans>
        </Typography>
        <Button
          sx={{ minWidth: 0, px: 0 }}
          className="w-10 h-10 text-xs border border-solid rounded-full shadow-none text-closeIconColor border-closeIconColor"
          onClick={toggleDrawer(false)}
        >
          <Clear />
        </Button>
      </Grid>

      <>
        {!isValidArray(cartItems) ? (
          <>
            <EmptyCart />
          </>
        ) : (
          <div className="border-0 border-solid border-y border-commonBorder">
            {cartItems.map((item, index) => (
              <div
                key={item.cartItemId}
                className={`relative p-5 mx-2 ${
                  index > 0 && 'border-t'
                } border-commonBorder border-solid border-0`}
              >
                <CartItem
                  onClick={toggleDrawer(false)}
                  cartItem={item}
                  showAddToActions={true}
                />
              </div>
            ))}
          </div>
        )}
        {isValidArray(cartItems) && (
          <div className="w-full px-4">
            <CartDiscount appliedCoupons={quote?.applied_coupons} />
          </div>
        )}
        {isValidArray(cartItems) && (
          <div className="px-2 py-10 border-0 border-b border-solid border-b-commonBorder">
            <div className="px-2.5">
              <CartTotals quote={quote} />
            </div>
            <div className="flex flex-col items-center justify-center min-w-full gap-4 pt-6">
              <div className="px-2.5 flex justify-start w-full">
                {quote?.applied_coupons &&
                  isValidArray(quote?.applied_coupons) > 0 && (
                    <AppliedCoupons appliedCoupons={quote?.applied_coupons} />
                  )}
              </div>
              <div className="flex items-start justify-between w-full px-6">
                <Typography variant="h3" className="font-bold">
                  <Trans>Total :</Trans>
                </Typography>
                <Typography variant="h3" className="-mr-1 font-bold">
                  {grandTotal}
                </Typography>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center justify-center min-w-full gap-4 py-8">
          {isValidArray(cartItems) && (
            <>
              <Link
                href="/checkout/cart"
                className="w-[85%] mb-3 hover:underline hover:decoration-brand hover:underline-offset-2"
              >
                <Button
                  onClick={toggleDrawer(false)}
                  variant="text"
                  className="flex w-full rounded-none hover:bg-transparent "
                >
                  <Trans>Proceed To Cart Page</Trans>{' '}
                  <LaunchIcon className="pl-2" />
                </Button>
              </Link>
              <Link href="/checkout" className="w-[85%]">
                <Button
                  onClick={toggleDrawer(false)}
                  variant="contained"
                  className="w-full rounded-none shadow-none"
                >
                  <Trans> Checkout</Trans>
                </Button>
              </Link>
              <Root>
                <Divider>
                  <Trans>or</Trans>
                </Divider>
              </Root>
              <Link href="/" className="w-[85%]">
                <Button
                  onClick={toggleDrawer(false)}
                  variant="outlined"
                  className="w-full text-center text-black border-black rounded-none"
                >
                  <Trans> Back To Shopping</Trans>
                </Button>
              </Link>
            </>
          )}
        </div>
      </>
    </Box>
  );

  return (
    <Fragment>
      <Drawer
        anchor="right"
        className="z-[999999]"
        open={cartOpen['right']}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </Fragment>
  );
}

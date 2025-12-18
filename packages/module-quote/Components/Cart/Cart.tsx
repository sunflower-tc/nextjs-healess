import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { getFormattedPrice, isValidArray } from '@utils/Helper';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { EmptyCart } from './EmptyCart';
import Drawer from '@mui/material/Drawer';
import LaunchIcon from '@mui/icons-material/Launch';
import Clear from '@mui/icons-material/Clear';
import { useEffect, useState } from 'react';
import { CartItemSkeleton } from '@voguish/module-marketplace/Components/Placeholder';
import { useRouter } from 'next/router';
export interface CartType {
  toggleDrawer?: Function | any;
  cartOpen?: boolean | any;
  cartItems?: [];
}
const CartTotals = dynamic(() => import('./CartTotal'), { ssr: false });
const CartDiscount = dynamic(() => import('./CartDiscount'));
const CartItem = dynamic(() => import('./CartItem'), {
  loading: () => <CartItemSkeleton />,
  ssr: false,
});
const AppliedCoupons = dynamic(() => import('./AppliedCoupons'), {
  ssr: false,
});
export default function Cart({ toggleDrawer, cartOpen }: CartType) {
  const { t } = useTranslation('common');
  const [loading, setLoader] = useState(true);
  /**
   * Fetching cart date from redux
   */
  const quote = useSelector((state: RootState) => state?.cart?.quote || null);
  const grandTotal = quote?.prices?.grand_total?.value
    ? getFormattedPrice(
        quote.prices.grand_total.value,
        quote.prices.grand_total.currency
      )
    : getFormattedPrice(0);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 600);
  }, []);

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
  const router = useRouter();
  const { locale } = router;
  return (
    <Drawer
      transitionDuration={200}
      anchor={locale === 'ar' ? 'left' : 'right'}
      open={cartOpen.left || cartOpen?.right}
      onClose={() => toggleDrawer(false)}
    >
      <div className="relative w-screen max-w-xl bg-white pointer-events-auto h-[100vh] !overflow-y-auto">
        <div className="fixed w-full top-0 z-20 bg-white border-0 border-b border-solid border-gray-100  !mt-0">
          {' '}
          <div className="flex items-center justify-between max-w-xl px-4 py-4">
            <Typography variant="h2">{t('Shopping Cart')}</Typography>
            <Button
              sx={{ minWidth: 0, px: 0 }}
              className="w-10 h-10 text-xs border border-solid rounded-full shadow-none border-closeIconColor text-closeIconColor"
              onClick={toggleDrawer(false)}
            >
              <Clear />
            </Button>
          </div>
        </div>
        <ErrorBoundary>
          {loading ? (
            [1, 2, 3].map((s) => <CartItemSkeleton key={s} />)
          ) : (
            <>
              {!isValidArray(cartItems) ? (
                <ErrorBoundary>
                  <EmptyCart onClose={toggleDrawer(false)} />
                </ErrorBoundary>
              ) : (
                <div className="w-full mt-20 overflow-y-auto border-0 border-b border-solid border-gray-200">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.cartItemId}
                      className={`relative py-4 lg:px-7 md:px-6 px-5 ${
                        index > 0 && 'border-t'
                      } border-gray-100 border-solid border-0`}
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
            </>
          )}

          {isValidArray(cartItems) && (
            <div className="w-full px-4">
              <CartDiscount appliedCoupons={quote?.applied_coupons} />
            </div>
          )}
          {isValidArray(cartItems) && (
            <div className="px-2 py-10 border-0 border-b border-solid border-b-gray-200">
              <div className="px-2.5">
                <CartTotals quote={quote} />
              </div>
              <div className="flex flex-col items-center justify-center min-w-full gap-4 pt-6">
                <div className="flex w-full justify-start px-2.5">
                  {quote?.applied_coupons &&
                    isValidArray(quote?.applied_coupons) > 0 && (
                      <AppliedCoupons appliedCoupons={quote?.applied_coupons} />
                    )}
                </div>
                <div className="flex items-start justify-between w-full px-6">
                  <Typography variant="h3" className="font-bold">
                    {t('Total :')}
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
              <ErrorBoundary>
                <Link
                  href="/checkout/cart"
                  className="mb-3 w-[85%] hover:underline hover:decoration-brand hover:underline-offset-2"
                >
                  <Button
                    onClick={toggleDrawer(false)}
                    variant="text"
                    className="flex w-full rounded-none hover:bg-transparent"
                  >
                    {t('Proceed To Cart Page')}{' '}
                    <LaunchIcon className="ltr:pl-2 rtl:pr-2" />
                  </Button>
                </Link>
                <Link href="/checkout" className="w-[85%]">
                  <Button
                    onClick={toggleDrawer(false)}
                    variant="contained"
                    className="w-full rounded-none shadow-none"
                  >
                    {' '}
                    {t('Checkout')}
                  </Button>
                </Link>
                <Root>
                  <Divider>{t('or')}</Divider>
                </Root>
                <Link href="/" className="w-[85%]">
                  <Button
                    onClick={toggleDrawer(false)}
                    variant="outlined"
                    className="w-full text-center text-black border-black rounded-none"
                  >
                    {' '}
                    {t('Back To Shopping')}
                  </Button>
                </Link>
              </ErrorBoundary>
            )}
          </div>
        </ErrorBoundary>
      </div>
    </Drawer>
  );
}

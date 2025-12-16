import { Trans } from '@lingui/macro';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { removeOrderId } from '@store/checkout';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RootState } from 'store';

const CheckoutSuccessPage = () => {
  const router = useRouter();

  const orderId = useAppSelector(
    (state: RootState) => state.checkout.lastOrderId
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleRouteChange = () => {
      if ('/checkout/success' == router.pathname) {
        return;
      } else {
        dispatch(removeOrderId());
      }
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.on('routeChangeStart', handleRouteChange);
    };
  }, [dispatch, router.events, router.pathname]);

  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div className="p-4 relative -top-[10%] rounded">
        <div className="flex flex-col items-center space-y-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-32 h-32 text-brand"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <Typography
            variant="ErrorHeading"
            component="h1"
            className="text-4xl font-bold -xs:text-2xl"
          >
            <Trans>Thank You !</Trans>
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            className="font-medium -xs:text-base"
          >
            Order Number:{orderId}
          </Typography>

          <Typography
            variant="h2"
            component="h2"
            className="font-medium -xs:text-base"
          >
            <Trans>Thank you for your purchase! See You Again</Trans>
          </Typography>

          <Button
            variant="contained"
            className="w-full max-w-xs py-4 rounded-none shadow-none"
            onClick={() => {
              router.push('/');
              dispatch(removeOrderId());
            }}
          >
            <Trans>Go To Home</Trans>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;

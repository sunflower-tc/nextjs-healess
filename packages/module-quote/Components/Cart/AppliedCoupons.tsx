import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import { useRemoveCouponFromCart } from '../../hooks/cart-handler';
export const AppliedCoupons = ({ appliedCoupons }: [] | any) => {
  /**
   * Remove Coupon hook
   * ! Callback function need to coupon code and cartId and quantity.
   */
  const { removeCouponHandler } = useRemoveCouponFromCart();

  const removeCoupon = () => {
    removeCouponHandler();
  };
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      <span className="flex flex-col min-w-full gap-3 px-3 py-6">
        <Typography
          variant="CartItemPrice"
          className="font-medium text-black leading-normal lg:leading-[1.45rem]"
        >
          {' '}
          {t('Applied Coupon Code')}
        </Typography>
        {appliedCoupons.map((coupon: { code: string }) => (
          <ErrorBoundary key={coupon.code}>
            <Chip
              className="max-w-fit rtl:px-3"
              label={coupon?.code}
              variant="outlined"
              onDelete={removeCoupon}
            />
          </ErrorBoundary>
        ))}
      </span>
    </ErrorBoundary>
  );
};

export default AppliedCoupons;

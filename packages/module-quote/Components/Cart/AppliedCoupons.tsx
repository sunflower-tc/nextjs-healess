import { Trans } from '@lingui/macro';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
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
  return (
    <span className="flex flex-col min-w-full gap-3 px-3 pb-6">
      <Typography
        variant="CartItemPrice"
        className="font-medium text-black leading-normal lg:leading-[1.45rem]"
      >
        {' '}
        <Trans>Applied Coupon Code</Trans>
      </Typography>
      {appliedCoupons.map((coupon: { code: string }) => (
        <Chip
          key={coupon.code}
          className="max-w-fit"
          label={coupon?.code}
          variant="outlined"
          onDelete={removeCoupon}
        />
      ))}
    </span>
  );
};

export default AppliedCoupons;

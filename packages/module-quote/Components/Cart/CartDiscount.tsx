import { Trans, t } from '@lingui/macro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useApplyCoupon } from '../../hooks/cart-handler';

export const CartDiscount = ({ appliedCoupons }: [] | any) => {
  const { register, handleSubmit } = useForm();
  const { applyCouponHandler } = useApplyCoupon();
  const applyCoupon = (data: object | any, event: any) => {
    event.preventDefault();
    applyCouponHandler(data.couponCode);
  };
  return (
    <React.Fragment>
      {!appliedCoupons && (
        <React.Fragment>
          <Box className="flex flex-col w-full">
            <Box className="max-w-[100%] px-2.5 mt-3">
              <form
                className="flex items-center w-full gap-2 mx-auto lg:gap-5 md:gap-5"
                onSubmit={handleSubmit(applyCoupon)}
              >
                <div className="flex items-center w-full">
                  <div className="flex-grow w-full ">
                    <label className="text-base font-normal text-secondary">
                      <Trans>Apply Coupon Code</Trans>
                    </label>
                    <div className="flex flex-row items-center w-full gap-3 mt-1 md:gap-5">
                      <input
                        id="coupon"
                        type="text"
                        autoComplete="text"
                        placeholder={t`Enter discount code : 'Test'`}
                        {...register('couponCode', {
                          required: t`%1 is required.`,
                        })}
                        className="placeholder:text-[#ADADAD] min-w-[70%]  px-4 py-[0.6rem] flex-1 text-base leading-6 border-transparent outline-[#E7E7E7] focus:outline-brand outline-1 outline"
                      />
                      <Button
                        className="bg-brand shadow-none rounded-none shadow-[unset] w-full py-[0.65rem] px-6 border-transparent"
                        color="primary"
                        variant="contained"
                        type="submit"
                      >
                        <Trans>Apply</Trans>
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Box>
          </Box>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CartDiscount;

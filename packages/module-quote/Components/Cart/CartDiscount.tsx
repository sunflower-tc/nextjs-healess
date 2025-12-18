import Box from '@mui/material/Box';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { ButtonMui } from '@voguish/module-theme/components/ui/ButtonMui';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useApplyCoupon } from '../../hooks/cart-handler';
export const CartDiscount = ({ appliedCoupons }: [] | any) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const { applyCouponHandler, isInProcess } = useApplyCoupon();
  const applyCoupon = (data: any, event: any) => {
    event.preventDefault();
    applyCouponHandler(data.couponCode, (errorMsg: string) => {
      setError(
        'couponCode',
        {
          type: 'manual',
          message: errorMsg as string,
        },
        {
          shouldFocus: true,
        }
      );
    });
  };
  console.log(errors);
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      {!appliedCoupons && (
        <ErrorBoundary>
          <Box className="flex flex-col w-full">
            <Box className="max-w-[100%] px-2.5 mt-3">
              <form
                className="flex items-center w-full gap-2 mx-auto lg:gap-5 md:gap-5"
                onSubmit={handleSubmit(applyCoupon)}
              >
                <div className="flex items-center w-full">
                  <div className=" w-full">
                    <label className="text-base font-normal text-secondary">
                      {t('Apply Coupon Code')}
                    </label>
                    <div className="grid grid-cols-12 w-full gap-3 mt-1 md:gap-5">
                      <div className=" col-span-9 relative">
                        <input
                          id="coupon"
                          type="text"
                          autoComplete="text"
                          // eslint-disable-next-line quotes
                          placeholder={t("Coupon : 'WELCOME'")}
                          {...register('couponCode')}
                          required
                          className="placeholder:text-[#ADADAD] w-full  px-4 py-[0.6rem] flex-1 text-base leading-6 border-transparent outline-[#E7E7E7] focus:outline-brand outline-1 outline"
                        />
                        {errors?.couponCode && (
                          <span className="whitespace-nowrap left-0 text-red-500 text-xs absolute -bottom-[20px]">
                            {errors?.couponCode?.message as string}
                          </span>
                        )}
                      </div>
                      <ButtonMui
                        isLoading={isInProcess || false}
                        className="bg-brand   col-span-3 shadow-none rounded-none shadow-[unset] py-[0.65rem] px-6 border-transparent"
                        color="primary"
                        variant="contained"
                        type="submit"
                      >
                        {t('Apply')}
                      </ButtonMui>
                    </div>
                  </div>
                </div>
              </form>
            </Box>
          </Box>
        </ErrorBoundary>
      )}
    </ErrorBoundary>
  );
};

export default CartDiscount;

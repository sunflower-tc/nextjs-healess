import { useMutation } from '@apollo/client';
import { Trans, t } from '@lingui/macro';
import Button from '@mui/material/Button';
import { showToast } from '@utils/Helper';
import SUBSCRIBE_NEWS_LETTER from '@voguish/module-theme/graphql/mutation/subscribeEmailToNewsletter.graphql';
import { FieldValues, useForm } from 'react-hook-form';
export const Newsletter = () => {
  const [subscribeEmailToNewsletter] = useMutation(SUBSCRIBE_NEWS_LETTER);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: FieldValues) => {
    subscribeEmailToNewsletter({
      variables: data,
    })
      .then(() => {
        showToast({
          type: 'success',
          message: t`Subscribe successfully`,
        });
      })
      .catch((err) => {
        showToast({ message: err.message, type: 'error' });
      });
  };

  return (
    <div className="2xl:max-w-[90rem] mx-auto">
      <div className="grid w-full gap-6 px-4">
        <div className="max-w-xl text-center">
          <h2 className="leading-normal text-[1.375rem] font-bold my-0 lg:leading-[1.65rem]">
            <Trans>Get In Touch</Trans>
          </h2>
          <p className="leading-normal my-0 pt-1.5 text-sm text-[#64687A] lg:leading-[1.25rem]">
            <Trans>
              Connect with us for personalized shopping assistance and prompt
              customer support. Reach out now!
            </Trans>
          </p>
        </div>
        <div className="flex w-full">
          <form
            className="w-[90%] sm:w-[70%] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-row items-center w-full -3xs:flex-col -3xs:gap-y-3 -3xs:gap-x-0">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: t`* Email is required`,
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: t`Please enter a valid email`,
                  },
                })}
                className=" min-w-0 px-4 py-[0.7rem] w-full text-sm leading-6 placeholder:text-[#64687a]  border-0 shadow-sm focus:ring-r-0 focus:outline-r-0 focus:border-r-0 ring-r-0 outline-r-0 border-r-0  ring-1 ring-inset border-[#D2D2D2] ring-[#D2D2D2] focus:border-brand focus:outline-brand focus:outline-1 outline-0 focus:ring-1 focus:ring-inset focus:ring-brand"
                placeholder={t`Enter your mail id`}
              />
              <Button
                className="bg-secondary rounded-none shadow-[unset] lg:py-[0.65rem] md:py-[0.65rem] px-10 -3xs:w-[85%] border-none shadow-none py-[0.6rem]"
                color="secondary"
                variant="contained"
                type="submit"
              >
                <Trans>Subscribe</Trans>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Newsletter;

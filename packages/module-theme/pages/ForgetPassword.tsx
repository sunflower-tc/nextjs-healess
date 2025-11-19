import { useMutation } from '@apollo/client';
import { Trans, t } from '@lingui/macro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import { showToast } from '@utils/Helper';
import { AuthLayout } from '@voguish/module-customer';
import ResetPassword from '@voguish/module-customer/graphql/mutation/resetpasswordTokenEmail.graphql';
import { LoadingButtton } from '@voguish/module-theme';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import type { NextPageWithLayout } from '@voguish/module-theme/page';
import { FieldValues, useForm } from 'react-hook-form';

const Forget: NextPageWithLayout = () => {
  const [requestPasswordResetEmail] = useMutation(ResetPassword);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const forgetEmail = async (data: FieldValues) => {
    requestPasswordResetEmail({
      variables: {
        email: data.email,
      },
    })
      .then(() => {
        showToast({
          type: 'success',
          message: t`Mail has been sent to your registered Email`,
        });
      })
      .catch((err) => {
        showToast({ message: err.message, type: 'error' });
      });
  };

  return (
    <>
      <AuthLayout height="h-60" banner="https://source.unsplash.com/random">
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(forgetEmail)}
          className="w-full mt-2"
        >
          <Typography variant="h6" className="font-semibold">
            <Trans> Forget Password</Trans>
          </Typography>
          <FormGroup className="mt-3 max-h-fit">
            <Typography component="label" htmlFor="email">
              <Trans> Email</Trans>
            </Typography>
            <InputField
              sx={{ mt: 0.5 }}
              placeHolder={t`Email`}
              type="email"
              helperText={errors?.email?.message || ''}
              error={!!errors?.email?.message}
              {...register('email', { required: t`* Please Enter the mail` })}
            />

            <FormGroup
              sx={{
                py: 1,
                gap: 1,
              }}
              className="flex-row items-center mt-8 md:mt-5 -xs:justify-start md:justify-between"
            >
              {isSubmitting ? (
                <LoadingButtton
                  text={t`Link is on the way...`}
                  className="py-3.5 px-7"
                />
              ) : (
                <Button
                  className="px-6 rounded-none lg:py-2 md:py-2 sm:py-1 bg-darkGreyBackground"
                  color="secondary"
                  variant="contained"
                  type="submit"
                >
                  <Trans>Send Link</Trans>
                </Button>
              )}
            </FormGroup>
          </FormGroup>
        </Box>
      </AuthLayout>
    </>
  );
};

export default Forget;

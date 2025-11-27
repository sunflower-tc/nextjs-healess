import { useMutation } from '@apollo/client';
import { Trans, t } from '@lingui/macro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { showToast } from '@utils/Helper';
import { AuthLayout } from '@voguish/module-customer';
import Reset_Password from '@voguish/module-customer/graphql/mutation/ResetPassword.graphql';
import type { NextPageWithLayout } from '@voguish/module-theme';
import { Link, LoadingButtton } from '@voguish/module-theme';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import router, { useRouter } from 'next/router';
import { FieldValues, useForm } from 'react-hook-form';

const NewPassword: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const { query } = useRouter();
  const [resetPassword] = useMutation(Reset_Password);
  const newPassword = async (data: FieldValues) => {
    {
      if (data?.newPassword === data?.confirmPassword) {
        delete data?.confirmPassword;

        resetPassword({
          variables: {
            email: query.id,
            resetPasswordToken: query.token,
            newPassword: data.newPassword,
          },
        })
          .then(() => {
            showToast({
              type: 'success',
              message: t`New password set successfully`,
            });
            router.push('/customer/account/login');
          })
          .catch((err) => {
            showToast({ message: err.message, type: 'error' });
          });
      } else {
        showToast({
          message: t`Confirm Password And New Password Are Not Similar`,
          type: 'error',
        });
      }
    }
  };

  return (
    <AuthLayout banner="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(newPassword)}
        sx={{ mt: 1, width: '100%' }}
      >
        <Typography variant="h6" className="font-semibold">
          <Trans>New Password</Trans>
        </Typography>
        <FormGroup className="grid gap-2 mt-4">
          <Grid className="grid gap-1">
            <Typography component="label" htmlFor="email">
              <Trans>New Password</Trans>
            </Typography>
            <InputField
              placeHolder={t`Set New Password`}
              type="password"
              error={!!errors?.newPassword?.message}
              helperText={errors?.newPassword?.message || ''}
              {...register('newPassword', {
                required: t`* New Password is required`,
              })}
            />
          </Grid>
          <Grid className="grid gap-1">
            <Typography component="label" htmlFor="email">
              <Trans>Confirm Password</Trans>
            </Typography>
            <InputField
              placeHolder={t`Confirm New Password`}
              type="password"
              error={!!errors?.confirmPassword?.message}
              helperText={errors?.confirmPassword?.message || ''}
              {...register('confirmPassword', {
                required: t`*Confirm New Password is required`,
              })}
            />
          </Grid>

          <FormGroup
            sx={{
              my: 1.5,
              gap: 1,
            }}
            className="flex-row items-center -xs:justify-between md:justify-between"
          >
            {isSubmitting ? (
              <LoadingButtton
                text={t`Setting New Password...`}
                className="py-3.5 px-7"
              />
            ) : (
              <Button
                className="px-8 rounded-none lg:py-2 md:py-2 sm:py-1 bg-darkGreyBackground"
                color="secondary"
                variant="contained"
                type="submit"
              >
                <Trans>Set New Password</Trans>
              </Button>
            )}
          </FormGroup>
        </FormGroup>
        <Typography variant="body1" textAlign="center" pt={3}>
          <Trans>Remember your password</Trans>
          <Link
            className="px-1"
            color="primary"
            underline="hover"
            variant="subtitle1"
            href="/customer/account/login"
          >
            <Trans>Sign In</Trans>
          </Link>
          <Trans>now</Trans>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default NewPassword;

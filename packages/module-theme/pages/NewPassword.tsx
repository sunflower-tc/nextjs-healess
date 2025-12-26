import { useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AuthLayout } from '@voguish/module-customer/Components/AuthLayout';
import Reset_Password from '@voguish/module-customer/graphql/mutation/ResetPassword.graphql';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import { useTranslation } from 'next-i18next';
import router, { useRouter } from 'next/router';
import { FieldValues, useForm } from 'react-hook-form';
import ErrorBoundary from '../components/ErrorBoundary';
import { useToast } from '../components/toast/hooks';
import { ButtonMui } from '../components/ui/ButtonMui';
import { Link } from '../components/ui/Link';
import { NextPageWithLayout } from '../page';
const NewPassword: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const { query } = useRouter();
  const { showToast } = useToast();
  const { t } = useTranslation('common');

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
              message: t('New password set successfully'),
            });
            router.push('/customer/account/login');
          })
          .catch((err) => {
            showToast({ message: err.message, type: 'error' });
          });
      } else {
        showToast({
          message: t('Confirm Password And New Password Are Not Similar'),
          type: 'error',
        });
      }
    }
  };

  return (
    <ErrorBoundary>
      {' '}
      <AuthLayout banner="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80">
        <ErrorBoundary>
          {' '}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(newPassword)}
            sx={{ mt: 1, width: '100%' }}
          >
            <Typography variant="h6" className="font-semibold">
              {t('New Password')}
            </Typography>
            <FormGroup className="grid gap-2 mt-4">
              <Grid className="grid gap-1">
                <Typography component="label" htmlFor="email">
                  {t('New Password')}
                </Typography>
                <InputField
                  placeHolder={t('Set New Password')}
                  type="password"
                  error={!!errors?.newPassword?.message}
                  helperText={errors?.newPassword?.message || ''}
                  {...register('newPassword', {
                    required: t('* New Password is required'),
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
                      message: t('Please enter a valid Password'),
                    },
                  })}
                />
              </Grid>
              <Grid className="grid gap-1">
                <Typography component="label" htmlFor="email">
                  {t('Confirm Password')}{' '}
                </Typography>
                <InputField
                  placeHolder={t`Confirm New Password`}
                  type="password"
                  error={!!errors?.confirmPassword?.message}
                  helperText={errors?.confirmPassword?.message || ''}
                  {...register('confirmPassword', {
                    required: t('*Confirm New Password is required'),
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
                      message: t('Please enter a valid Password'),
                    },
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
                <ButtonMui
                  isLoading={isSubmitting || false}
                  className="px-8 rounded-none lg:py-2 md:py-2 sm:py-1 bg-darkGreyBackground"
                  color="secondary"
                  variant="contained"
                  type="submit"
                >
                  {t('Set New Password')}{' '}
                </ButtonMui>
              </FormGroup>
            </FormGroup>
            <Typography variant="body1" textAlign="center" pt={3}>
              {t('Remember your password')}{' '}
              <Link
                className="px-1"
                color="primary"
                underline="hover"
                variant="subtitle1"
                href="/customer/account/login"
              >
                {t('Sign In')}
              </Link>
              {t('now')}
            </Typography>
          </Box>
        </ErrorBoundary>
      </AuthLayout>
    </ErrorBoundary>
  );
};

export default NewPassword;

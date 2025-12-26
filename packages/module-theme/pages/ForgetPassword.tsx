import { useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import { AuthLayout } from '@voguish/module-customer/Components/AuthLayout';
import ResetPassword from '@voguish/module-customer/graphql/mutation/resetpasswordTokenEmail.graphql';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import type { NextPageWithLayout } from '@voguish/module-theme/page';
import { useTranslation } from 'next-i18next';
import { FieldValues, useForm } from 'react-hook-form';
import ErrorBoundary from '../components/ErrorBoundary';
import { useToast } from '../components/toast/hooks';
import { ButtonMui } from '../components/ui/ButtonMui';
const Forget: NextPageWithLayout = () => {
  const [requestPasswordResetEmail] = useMutation(ResetPassword);
  const { t } = useTranslation('common');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { showToast } = useToast();

  const forgetEmail = async (data: FieldValues) => {
    requestPasswordResetEmail({
      variables: {
        email: data.email,
      },
    })
      .then((res) => {
        const status = data?.requestPasswordResetEmail;
        if (status) {
          showToast({
            message: t('Mail has been sent to your registered Email'),
          });
        } else {
          showToast({
            type: 'warning',
            message: t('Something is gone wrong'),
          });
        }
      })
      .catch((err) => {
        showToast({ message: err.message, type: 'error' });
      });
  };

  return (
    <ErrorBoundary>
      <AuthLayout height="h-60" banner="https://source.unsplash.com/random">
        <ErrorBoundary>
          {' '}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(forgetEmail)}
            className="w-full mt-2"
          >
            <Typography variant="h6" className="font-semibold">
              {t('Forget Password')}
            </Typography>
            <FormGroup className="mt-3 max-h-fit">
              <Typography component="label" htmlFor="email">
                {t('Email')}
              </Typography>
              <InputField
                sx={{ mt: 0.5 }}
                placeHolder={t('Email')}
                type="email"
                helperText={errors?.email?.message || ''}
                error={!!errors?.email?.message}
                {...register('email', {
                  required: t('* Please Enter the mail'),
                })}
              />

              <FormGroup
                sx={{
                  py: 1,
                  gap: 1,
                }}
                className="flex-row items-center mt-8 md:mt-5 -xs:justify-start md:justify-between"
              >
                <ButtonMui
                  isLoading={isSubmitting || false}
                  className="px-6 rounded-none lg:py-2 md:py-2 sm:py-1 bg-darkGreyBackground"
                  color="secondary"
                  variant="contained"
                  type="submit"
                >
                  {t('Send Link')}
                </ButtonMui>
              </FormGroup>
            </FormGroup>
          </Box>
        </ErrorBoundary>
      </AuthLayout>
    </ErrorBoundary>
  );
};

export default Forget;

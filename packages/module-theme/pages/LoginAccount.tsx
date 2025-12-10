import { Trans, t } from '@lingui/macro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '@store/hooks';
import { CART_DATA, getLocalStorage } from '@store/local-storage';
import { setUser } from '@store/user';
import { showToast } from '@utils/Helper';
import {
  AuthLayout,
  useCustomerMutation,
  useToken,
} from '@voguish/module-customer';
import MERGE_CART from '@voguish/module-quote/graphql/mutation/MergeCart.graphql';
import type { NextPageWithLayout } from '@voguish/module-theme';
import {
  CheckBoxInputField,
  Link,
  LoadingButtton,
} from '@voguish/module-theme';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
const LoginAccount: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const credential = process.env.DEMO_CREDENTIALS?.split('||');
  const [email = '', password = ''] = credential || [];
  const [mergeCart] = useCustomerMutation(MERGE_CART);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ defaultValues: { email, password, remember: false } });
  const token = useToken();
  const { query } = router;

  useEffect(() => {
    let guestId = getLocalStorage(CART_DATA, true) || {};

    if (session?.user?.token) {
      if (token && guestId.isGuest && guestId.total_quantity > 0) {
        mergeCart({
          variables: { sourceCartId: guestId.id },
        });
        guestId = {};
      }
      router.push('/customer/account');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergeCart, token]);
  const loginUser = async (data: FieldValues) => {
    const result = await signIn('credentials', {
      redirect: false,
      ...data,
      callbackUrl: '/customer/account',
    });
    if (result?.error) {
      showToast({ type: 'error', message: result.error });
    }
    if (result?.ok) {
      dispatch(setUser(session));
      router.push(query?.callbackUrl?.toString() || '/');
    }
  };

  return (
    <AuthLayout
      height="h-[26.5rem]"
      banner="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(loginUser)}
        sx={{ mt: 1, width: '100%' }}
      >
        <Typography variant="h6" className="font-semibold">
          <Trans>Login</Trans>
        </Typography>
        <FormGroup className="grid gap-2 mt-4">
          <Grid className="grid gap-1">
            <Typography component="label" htmlFor="email">
              <Trans>Email</Trans>
            </Typography>
            <InputField
              placeHolder={t`Email`}
              type="text"
              error={!!errors?.email?.message}
              helperText={errors?.email?.message || ''}
              {...register('email', {
                required: t`* Email is required`,
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: t`Please enter a valid email`,
                },
              })}
            />
          </Grid>
          <Grid className="grid gap-1">
            <Typography component="label" htmlFor="password">
              <Trans>Password</Trans>
            </Typography>

            <InputField
              placeHolder={t`Password`}
              type="password"
              error={!!errors?.password?.message}
              helperText={errors?.password?.message || ''}
              {...register('password', {
                required: t`* Password is required`,
              })}
            />
          </Grid>
          <FormGroup sx={{ mt: -0.7 }}>
            <CheckBoxInputField
              label={t`Remember me`}
              {...register('remember')}
            />
          </FormGroup>
          <FormGroup
            sx={{
              my: 1.5,
              gap: 1,
            }}
            className="flex-row items-center -xs:justify-between md:justify-between"
          >
            {isSubmitting ? (
              <LoadingButtton text={t`Logging In...`} className="py-3.5 px-7" />
            ) : (
              <Button
                className="px-8 rounded-none lg:py-2 md:py-2 sm:py-1 bg-darkGreyBackground"
                color="secondary"
                variant="contained"
                type="submit"
              >
                <Trans>Log in</Trans>
              </Button>
            )}

            <Link
              underline="none"
              className="duration-300 hover:underline"
              color="primary"
              variant="subtitle1"
              href="/customer/account/forget-password"
            >
              <Trans>Forget Password</Trans>
            </Link>
          </FormGroup>
        </FormGroup>
        <Typography variant="body1" textAlign="center" pt={3}>
          <Trans>New to Vougish</Trans>
          <Link
            className="px-1"
            underline="hover"
            color="primary"
            variant="subtitle1"
            href="/customer/account/create"
          >
            <Trans>Sign Up</Trans>
          </Link>
          <Trans>now</Trans>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default LoginAccount;

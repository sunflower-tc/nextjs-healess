import { useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { STORE_CONFIG, getKeyFromStorage } from '@store/local-storage';
import { showToast } from '@utils/Helper';
import { AuthLayout } from '@voguish/module-customer';
import CREATE_CUSTOMER from '@voguish/module-customer/graphql/mutation/CreateCustomer.graphql';
import {
  CheckBoxInputField,
  Link,
  LoadingButtton,
  RadioInputField,
} from '@voguish/module-theme';
import { motion } from 'framer-motion';

import { Trans, t } from '@lingui/macro';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import type { NextPageWithLayout } from '@voguish/module-theme/page';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
const CreateAccount: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();

  //commented code is for later use while implementing confirm password
  const [createCustomer, { data /*loading, error*/ }] =
    useMutation(CREATE_CUSTOMER);
  // const [passwordWatch] = watch(['password']);

  useEffect(() => {
    if (data?.createCustomer?.customer) {
      router.push('/customer/account/login');
    }
  }, [data, router]);

  /**
   * Watching fields
   */
  const [isSellerWatch] = watch(['is_seller']);
  useEffect(() => {
    isSellerWatch;
  }, [isSellerWatch]);
  const marketplaceIsActive =
    getKeyFromStorage(STORE_CONFIG, 'marketplace_is_active') || false;

  const registerUser = async (data: FieldValues) => {
    data.is_seller = data?.is_seller === 'yes' ? true : false;
    !marketplaceIsActive && delete data?.is_seller;
    createCustomer({
      variables: {
        input: data,
      },
    })
      .then(() => {
        showToast({
          type: 'success',
          message: t`Account created successfully`,
        });
        router.push('/customer/account/login');
      })
      .catch((err) => {
        showToast({ message: err.message, type: 'error' });
      });
  };
  const show = {
    opacity: 1,
    display: 'block',
  };

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: 'none',
    },
  };
  return (
    <AuthLayout
      height="!h-[52rem]"
      banner="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(registerUser)}
        sx={{ mt: 1, width: '100%' }}
      >
        <Typography variant="h6" className="font-semibold">
          <Trans>Create New Customer Account</Trans>
        </Typography>
        <FormGroup className="grid gap-1 mt-6">
          <Grid className="grid gap-1">
            <Typography component="label" htmlFor="firstname">
              <Trans>First Name</Trans>
            </Typography>
            <InputField
              placeHolder={t`First Name`}
              type="text"
              error={errors?.firstname?.message ? true : false}
              helperText={errors?.firstname ? errors?.firstname?.message : ''}
              {...register('firstname', {
                required: t`* Firstname is required`,
              })}
            />
          </Grid>
          <Grid className="grid gap-1">
            <Typography component="label" htmlFor="lastname">
              <Trans> Last Name</Trans>
            </Typography>
            <InputField
              placeHolder="Last Name"
              type="text"
              {...register('lastname', {
                required: t`* Lastname is required`,
              })}
            />
          </Grid>
          <Grid className="grid gap-1">
            <Typography component="label" htmlFor="email">
              <Trans>Email</Trans>
            </Typography>
            <InputField
              placeHolder={t`Email`}
              type="email"
              error={errors?.email?.message ? true : false}
              helperText={errors?.email ? errors?.email?.message : ''}
              {...register('email', {
                required: t`* Email is required`,
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: t`Please enter a valid email`,
                },
              })}
            />
          </Grid>
          <FormGroup
            sx={{
              rowGap: 1.6,
            }}
          >
            <CheckBoxInputField
              label={t`Sign Up For Newsletter`}
              {...register('is_subscribed')}
            />

            <CheckBoxInputField
              label={t`Allow remote shopping assistance`}
              //not able to unregister so commented for later use
              // {...(unregister('allow_remote'), { keepValue: true })}
            />
          </FormGroup>
          {marketplaceIsActive && (
            <Grid>
              <Grid className="mt-2.5 mb-1">
                <RadioInputField
                  label={t`Do you wand to become a seller/vendor ?`}
                  //not able to unregister so commented for later use
                  // {...(unregister('is_seller'), { keepValue: true })}
                  defaultValue="no"
                  id="become-seller"
                  row
                  {...register('is_seller')}
                  options={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                  ]}
                />
              </Grid>
              <motion.div
                className="box"
                animate={String(isSellerWatch) === 'yes' ? show : hide}
              >
                {String(isSellerWatch) === 'yes' && (
                  <Grid className="mt-2.5 -mb-1">
                    <InputField
                      label={t`Shop URL`}
                      type="text"
                      error={errors?.shop_url?.message ? true : false}
                      helperText={
                        errors?.shop_url ? errors?.shop_url?.message : ''
                      }
                      {...register('profileurl', {
                        required: t`* This is Required field`,
                      })}
                    />
                  </Grid>
                )}
              </motion.div>
            </Grid>
          )}

          <Grid className="grid gap-1">
            <Typography component="label" htmlFor="password">
              <Trans>Password</Trans>
            </Typography>
            <InputField
              placeHolder={t`Password`}
              type="password"
              error={errors?.password?.message ? true : false}
              helperText={errors?.password ? errors?.password?.message : ''}
              {...register('password', {
                required: t` Password is required`,
              })}
            />
          </Grid>
          <Grid className="grid gap-1">
            <Typography component="label" htmlFor="confirmPassword">
              <Trans>Confirm Password</Trans>
            </Typography>
            <InputField
              placeHolder={t`Confirm Password`}
              type="password"
              error={errors?.confirmPassword?.message ? true : false}
              helperText={
                errors?.confirmPassword ? errors?.confirmPassword?.message : ''
              }
              //not able to unregister so commented for later use
              // {...register('confirmPassword', {
              //   required: '* Confirm password is required.',
              // })}
            />
          </Grid>
          <FormGroup
            sx={{
              py: 1.5,
              flexDirection: 'row',
              justifyContent: { xs: 'center', md: 'space-between' },
              alignItems: 'center',
              gap: 1,
              borderBottom: '1px solid',
              borderColor: 'themeAdditional.borderColor',
            }}
          >
            {isSubmitting ? (
              <LoadingButtton
                text={t`Creating Account`}
                className="py-3.5 px-7"
              />
            ) : (
              <Button
                className="rounded-none bg-secondary"
                color="secondary"
                variant="contained"
                type="submit"
                sx={{ px: 6, py: 1.2 }}
              >
                <Trans>Create a account</Trans>
              </Button>
            )}
          </FormGroup>
        </FormGroup>
        <Typography variant="body1" textAlign="center" pt={3}>
          <Trans> Already have an account</Trans>
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

export default CreateAccount;

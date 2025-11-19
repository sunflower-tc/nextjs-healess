import { Trans, t } from '@lingui/macro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomerAccountData from '@utils/CustomerAccountData';
import { showToast } from '@utils/Helper';
import { useCustomerMutation } from '@voguish/module-customer';
import UPDATE_PASSWORD from '@voguish/module-customer/graphql/mutation/updatePassword.graphql';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import { FieldValues, useForm } from 'react-hook-form';
import {
  SuccessIcon,
  WarnIcon,
} from '../../../module-theme/components/elements/Icon';
import Sidebar from '../Layout/Sidebar';

const commonstyle = {
  border: '1px solid',
  borderRadius: 1,
  borderColor: 'themeAdditional.borderColor',
};
const iconStyle = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'auto',
  marginTop: '2px',
  marginBottom: '2px',
};
const PasswordForm = () => {
  const [changeCustomerPassword] = useCustomerMutation(UPDATE_PASSWORD);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  /**
   * Code Password validation
   */
  const watchPassword = watch();
  function containSymbol(newPassword: string) {
    return /[!@#$%^&*>.<]/.test(newPassword);
  }
  function containAlphabet(newPassword: string) {
    return /[A-Z]/.test(newPassword);
  }
  function containNumber(newPassword: string) {
    return /[0-9]/.test(newPassword);
  }
  function checkLength(newPassword: string) {
    if (newPassword?.length >= 8) {
      return true;
    } else {
      return false;
    }
  }

  const setPassword = (data: FieldValues) => {
    if (data.cPassword !== data.newPassword) {
      showToast({
        message: t`new Password & Confirm is not same`,
        type: 'error',
      });
    } else {
      /**
       * Delete the confirm password key:value
       */
      delete data.cPassword;
      /**
       * Run the Mutation without conform password
       */
      changeCustomerPassword({
        variables: data,
      })
        .then(() => {
          showToast({
            type: 'success',
            message: t`Password updaete successfully`,
          });
        })
        .catch((err) => {
          showToast({ message: err.message, type: 'error' });
        });
    }
  };

  return (
    <Sidebar>
      <form onSubmit={handleSubmit(setPassword)}>
        <Box component="div" sx={{ ...commonstyle }}>
          <Grid container>
            <Grid item lg={12} md={12} xs={12} sm={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: 1,
                  p: 1.5,
                  borderColor: 'themeAdditional.borderColor',
                }}
              >
                <Typography
                  variant="h4"
                  className="font-semibold"
                  sx={{ mx: 1, flexGrow: 1 }}
                >
                  {CustomerAccountData.ResetPasswordTitle}
                </Typography>
                <Button
                  className="bg-brand rounded-[unset]"
                  variant="contained"
                  type="submit"
                  sx={{
                    maxWidth: { xs: '50%', md: '35%', lg: '151px' },
                    display: 'inline',
                    borderRadius: 0,
                    flexGrow: 1,
                  }}
                >
                  <span className="hidden sm:block">
                    {CustomerAccountData.buttonLabel}
                  </span>
                  <span className="block sm:hidden">
                    <Trans> Save</Trans>
                  </span>
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
            sx={{ px: 2, pt: 2 }}
          >
            <Grid item lg={6} sm={12} xs={12}>
              <label htmlFor="currentPassword">
                <Trans>Current Password</Trans>
              </label>
              <InputField
                className="mt-0 mb-1 leading-0"
                placeHolder={t`Old password`}
                type="password"
                error={!!errors?.currentPassword?.message}
                helperText={errors?.currentPassword?.message || ''}
                {...register('currentPassword', {
                  required: t`* Current Password is required`,
                })}
              />
              <label htmlFor="newPassword">
                <Trans>New Password</Trans>
              </label>
              <InputField
                placeHolder={t`New password`}
                type="password"
                className="mt-0 mb-1 "
                error={!!errors?.newPassword?.message}
                helperText={errors?.newPassword?.message || ''}
                {...register('newPassword', {
                  required: t`* New Password is required`,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
                    message: t`Please enter a valid Password`,
                  },
                })}
              />
              <label htmlFor="cPassword">
                <Trans>Re-enter Password</Trans>
              </label>
              <InputField
                placeHolder={t`Re-enter Password`}
                type="password"
                className="mt-0 mb-1"
                error={!!errors?.cPassword?.message}
                helperText={errors?.cPassword?.message || ''}
                {...register('cPassword', {
                  required: t`* Re-enter Password is required`,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
                    message: t`Please enter a valid Password`,
                  },
                })}
              />
            </Grid>
            <Grid item lg={5} sm={12} className="-md:w-full">
              <Box
                sx={{
                  borderRadius: 1,
                  border: 1,
                  borderColor: 'themeAdditional.borderColor',
                  p: 2,
                  pt: 1,
                  my: 0.65,
                  pb: 1.95,
                }}
              >
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{ color: '#07bc0c', py: 1 }}
                >
                  <Trans>Password Must contain</Trans>
                </Typography>
                <Box component="div" sx={iconStyle}>
                  {containAlphabet(watchPassword?.newPassword) ? (
                    <SuccessIcon />
                  ) : (
                    <WarnIcon />
                  )}

                  <Typography variant="body2" sx={{ px: 1 }}>
                    <Trans> At least one uppercase (A-Z)</Trans>
                  </Typography>
                </Box>
                <Box sx={iconStyle}>
                  {containNumber(watchPassword?.newPassword) ? (
                    <SuccessIcon />
                  ) : (
                    <WarnIcon />
                  )}
                  <Typography variant="body2" sx={{ px: 1 }}>
                    <Trans>At least one integer (0-9)</Trans>
                  </Typography>
                </Box>
                <Box component="div" sx={iconStyle}>
                  {containSymbol(watchPassword?.newPassword) ? (
                    <SuccessIcon />
                  ) : (
                    <WarnIcon />
                  )}
                  <Typography variant="body2" sx={{ px: 1 }}>
                    <Trans>At least 1 symbol</Trans>
                  </Typography>
                </Box>
                <Box component="div" sx={iconStyle}>
                  {checkLength(watchPassword?.newPassword) ? (
                    <SuccessIcon />
                  ) : (
                    <WarnIcon />
                  )}
                  <Typography variant="body2" sx={{ px: 1 }}>
                    <Trans>At least 8 characters</Trans>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Sidebar>
  );
};
export default PasswordForm;

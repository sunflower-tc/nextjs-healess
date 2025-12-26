import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ButtonMui } from '@packages/module-theme/components/ui/ButtonMui';
import GET_COUNTERIES from '@voguish/module-customer/graphql/GetCountries.graphql';
import CREATE_ADDRESS from '@voguish/module-customer/graphql/mutation/CreateCustomerAddress.graphql';
import { useCustomerMutation } from '@voguish/module-customer/hooks/useCustomerMutation';
import { useCustomerQuery } from '@voguish/module-customer/hooks/useCustomerQuery';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useToast } from '@voguish/module-theme/components/toast/hooks';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
const CircularProgress = dynamic(
  () => import('@mui/material/CircularProgress')
);
const FormControl = dynamic(() => import('@mui/material/FormControl'));
const InputLabel = dynamic(() => import('@mui/material/InputLabel'));
const MenuItem = dynamic(() => import('@mui/material/MenuItem'));
const Select = dynamic(() => import('@mui/material/Select'));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const AddNewAddress = (props: any) => {
  const { t } = useTranslation('common');

  const { data, loading /* error*/ } = useCustomerQuery(GET_COUNTERIES);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  /**
   * County and State Management
   */

  const [createCustomerAddress] = useCustomerMutation(CREATE_ADDRESS);
  const { showToast } = useToast();

  /**
   * Save New Address
   */
  const saveNewAddress = (data: any) => {
    createCustomerAddress({
      variables: {
        input: data,
      },
    })
      .then(() => {
        showToast({
          type: 'success',
          message: t('Address added successfully'),
        });
        props.refetchAddress();
        props.setAddAddress(!props.addAddress);
      })
      .catch((err) => {
        showToast({ message: err.message, type: 'error' });
      });
  };

  return (
    <ErrorBoundary>
      <form onSubmit={handleSubmit(saveNewAddress)}>
        <Box
          sx={{
            mt: 1,
            div: { gap: 2 },
            label: { alignItems: 'flex-start' },
          }}
        >
          <Grid item xs={6} className="h-[3.5rem]">
            <InputField
              label={t('First Name')}
              type="text"
              error={errors?.firstname?.message ? true : false}
              helperText={errors?.firstname ? errors?.firstname?.message : ''}
              {...register('firstname', {
                required: t('* Enter First Name'),
              })}
            />
          </Grid>
          <Grid item xs={6} className="h-[3.5rem]">
            <InputField
              label={t('Last Name')}
              type="text"
              error={errors?.lastname?.message ? true : false}
              helperText={errors?.lastname ? errors?.lastname?.message : ''}
              {...register('lastname', {
                required: t('* Enter Last Name'),
              })}
            />
          </Grid>
          <Grid item xs={12} className="h-[3.5rem]">
            <InputField
              label={t('Company')}
              type="text"
              placeHolder={t('Company')}
              error={errors?.company?.message ? true : false}
              helperText={errors?.company ? errors?.company?.message : ''}
              {...register('company', {
                required: t('* Enter Company Name'),
              })}
            />
          </Grid>
          <Grid item xs={12} className="h-[3.5rem]">
            <InputField
              label={t('Address 1')}
              type="text"
              placeHolder={t('Address 1')}
              error={
                errors.street && (errors?.street as any).address1?.message
                  ? true
                  : false
              }
              helperText={
                errors.street && (errors?.street as any).address1
                  ? (errors?.street as any).address1?.message
                  : ''
              }
              {...register('street.address1', {
                required: t('* Enter Address1'),
              })}
            />
          </Grid>
          <Grid item xs={12} className="h-[3.5rem]">
            <InputField
              label={t('Address 2')}
              type="text"
              placeHolder={t('Address 2')}
              error={
                errors.street && (errors?.street as any).address2?.message
                  ? true
                  : false
              }
              helperText={
                errors.street && (errors?.street as any).address2
                  ? (errors?.street as any).address2?.message
                  : ''
              }
              {...register('street.address2', {
                required: t('* Enter Address2'),
              })}
            />
          </Grid>
          <Grid item xs={6} className="h-[3.5rem]">
            <InputField
              label={t('City')}
              type="text"
              error={errors?.city?.message ? true : false}
              helperText={errors?.city ? errors?.city?.message : ''}
              {...register('city', {
                required: t('* Enter city Name'),
              })}
            />
          </Grid>
          <Grid item xs={6} className="h-[3.5rem]">
            <InputField
              label={t('Zip Code')}
              type="text"
              error={errors?.postcode?.message ? true : false}
              helperText={errors?.postcode ? errors?.postcode?.message : ''}
              {...register('postcode', {
                required: t('* Enter Post Code'),
              })}
            />
          </Grid>
          <Grid item xs={12} className="h-[3.5rem]">
            <InputField
              label={t('Phone')}
              type="text"
              error={errors?.telephone?.message ? true : false}
              helperText={errors?.telephone ? errors?.telephone?.message : ''}
              {...register('telephone', {
                required: t('* Enter Phone Number'),
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: t('* Enter a valid phone number (10-15 digits)'),
                },
              })}
            />
          </Grid>
          <Grid item xs={12} className="h-[3.5rem]">
            <FormControl margin="normal" size="small" sx={{ width: '100%' }}>
              <InputLabel id="demo-select-small-label">
                {t('Country*')}
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                {...register('country_code')}
                label={t('Country*')}
                defaultValue="IN"
                MenuProps={MenuProps}
              >
                {loading ? (
                  <CircularProgress color="inherit" />
                ) : (
                  data.countries?.map((country: any, index: number) => (
                    <MenuItem key={index} value={country.id}>
                      {country.full_name_english}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          {props.addAddress && (
            <ButtonMui variant="contained" type="submit" sx={{ mt: 2 }}>
              {t('Save Address')}
            </ButtonMui>
          )}
        </Box>
      </form>
    </ErrorBoundary>
  );
};

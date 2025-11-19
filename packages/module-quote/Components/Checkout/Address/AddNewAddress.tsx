import { Trans, t } from '@lingui/macro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { showToast } from '@utils/Helper';
import {
  useCustomerMutation,
  useCustomerQuery,
} from '@voguish/module-customer';
import GET_COUNTERIES from '@voguish/module-customer/graphql/GetCountries.graphql';
import CREATE_ADDRESS from '@voguish/module-customer/graphql/mutation/CreateCustomerAddress.graphql';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
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
          message: t`Address added successfully`,
        });
        props.refetchAddress();
        props.setAddAddress(!props.addAddress);
      })
      .catch((err) => {
        showToast({ message: err.message, type: 'error' });
      });
  };

  return (
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
            label={t`First Name`}
            type="text"
            error={errors?.firstname?.message ? true : false}
            helperText={errors?.firstname ? errors?.firstname?.message : ''}
            {...register('firstname', {
              required: t`* Enter First Name`,
            })}
          />
        </Grid>
        <Grid item xs={6} className="h-[3.5rem]">
          <InputField
            label={t`Last Name`}
            type="text"
            error={errors?.lastname?.message ? true : false}
            helperText={errors?.lastname ? errors?.lastname?.message : ''}
            {...register('lastname', {
              required: t`* Enter Last Name`,
            })}
          />
        </Grid>
        <Grid item xs={12} className="h-[3.5rem]">
          <InputField
            label={t`Company`}
            type="text"
            placeHolder={t`Company`}
            error={errors?.company?.message ? true : false}
            helperText={errors?.company ? errors?.company?.message : ''}
            {...register('company', {
              required: t`* Enter Company Name`,
            })}
          />
        </Grid>
        <Grid item xs={12} className="h-[3.5rem]">
          <InputField
            label={t`Address 1`}
            type="text"
            placeHolder={t`Address 1`}
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
              required: t`* Enter Address1`,
            })}
          />
        </Grid>
        <Grid item xs={12} className="h-[3.5rem]">
          <InputField
            label={t`Address 2`}
            type="text"
            placeHolder={t`Address 2`}
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
              required: t`* Enter Address2`,
            })}
          />
        </Grid>
        <Grid item xs={6} className="h-[3.5rem]">
          <InputField
            label={t`city`}
            type="text"
            error={errors?.city?.message ? true : false}
            helperText={errors?.city ? errors?.city?.message : ''}
            {...register('city', {
              required: t`* Enter city Name`,
            })}
          />
        </Grid>
        <Grid item xs={6} className="h-[3.5rem]">
          <InputField
            label={t`Zip Code`}
            type="text"
            error={errors?.postcode?.message ? true : false}
            helperText={errors?.postcode ? errors?.postcode?.message : ''}
            {...register('postcode', {
              required: t`* Enter Post Code`,
            })}
          />
        </Grid>
        <Grid item xs={12} className="h-[3.5rem]">
          <InputField
            label={t`Phone`}
            type="text"
            error={errors?.telephone?.message ? true : false}
            helperText={errors?.telephone ? errors?.telephone?.message : ''}
            {...register('telephone', {
              required: t`* Enter Telephone Number`,
            })}
          />
        </Grid>
        <Grid item xs={12} className="h-[3.5rem]">
          <FormControl margin="normal" size="small" sx={{ width: '100%' }}>
            <InputLabel id="demo-select-small-label">
              <Trans>Country*</Trans>
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              {...register('country_code')}
              label={t`Country*`}
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
        <Grid item xs={12} className="max-h-[3.5rem]">
          {/* <SelectBoxInputField
            label="state/Region*"
            Id={countryId}
            {...register('region.region_id')}
          /> */}
        </Grid>

        {props.addAddress && (
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            <Trans>Save Address</Trans>
          </Button>
        )}
      </Box>
    </form>
  );
};

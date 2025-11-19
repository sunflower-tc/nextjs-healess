import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Trans, t } from '@lingui/macro';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { showToast } from '@utils/Helper';
import {
  CheckBoxInputField,
  CountryRegionDropdown,
} from '@voguish/module-theme';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const Backdrop = dynamic(() => import('@mui/material/Backdrop'));

const style = {
  position: 'absolute',
  left: 0,
  right: 0,

  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: '90%',
  minWidth: 0,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  py: 2,
  px: 3,
};

/**
 * Define Datatype
 */
interface formValue {
  handleClose: Function;
  showModal: boolean;
  createCustomerAddress: Function;
}
interface ErrorType {
  message: string;
}

interface AddressInput {
  city: string;
  company?: string;
  country_code: string;
  firstname: string;
  lastname: string;
  postcode: string;
  street: string[];
  telephone: string;
  region: string;
  region_id: number | string;
  default_billing: boolean;
}
export function AddAddressModal({
  handleClose,
  showModal,
  createCustomerAddress,
}: formValue) {
  /**
   * Use React form Hook
   */
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddressInput>();

  /**
   * Watch value of country select box
   */
  const countryCode = watch('country_code');

  useEffect(() => {
    setValue('region_id', '0');
    setValue('region', 'Canillo');
  }, [countryCode, setValue]);

  const submitAddress = (formdata: FieldValues) => {
    let regionDetail;
    if (formdata?.region_id == '0') {
      regionDetail = {
        region: formdata?.region,
        region_id: 0,
      };
    } else {
      regionDetail = {
        region_id: formdata?.region_id,
      };
    }
    delete formdata?.region_id;
    formdata.region = regionDetail;

    createCustomerAddress({
      variables: {
        input: formdata,
      },
    })
      .then(() => {
        showToast({
          type: 'success',
          message: t`Address craeted successfully`,
        });
        handleClose();
      })
      .catch((err: ErrorType) => {
        showToast({ message: err.message, type: 'error' });
        handleClose();
      });
    reset();
  };
  const HandleClose = () => {
    handleClose();
    reset();
  };
  return (
    <Box component="div" className="overflow-y-auto AddAddress">
      <Modal
        className="flex items-center w-full h-full overflow-y-auto"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={showModal}>
          <Grid
            container
            sx={style}
            className="max-w-2xl overflow-y-auto"
            component="form"
            onSubmit={handleSubmit(submitAddress)}
          >
            <Grid item xs={12}>
              <Typography variant="h5">
                <Trans>Add Address</Trans>
              </Typography>
            </Grid>
            <Grid className="mt-10 overflow-y-auto">
              <span className="grid min-w-full gap-2 sm:grid-cols-2">
                <div>
                  <InputField
                    label={t`First Name`}
                    className="Customized placeholder:text-CheckoutPlaceHolder"
                    type="text"
                    placeHolder={t`First name`}
                    error={!!errors?.firstname?.message}
                    helperText={errors?.firstname?.message || ''}
                    {...register('firstname', {
                      required: t`* Enter First Name`,
                    })}
                  />
                </div>
                <div>
                  <InputField
                    label={t`Last Name`}
                    type="text"
                    placeHolder={t`Last name`}
                    sx="Customized"
                    className="Customized placeholder:text-CheckoutPlaceHolder"
                    error={!!errors?.lastname?.message}
                    helperText={errors?.lastname?.message || ''}
                    {...register('lastname', {
                      required: t`* Enter Last Name`,
                    })}
                  />
                </div>
              </span>
              <Grid item xs={12}>
                <InputField
                  label={t`Company`}
                  type="text"
                  className="Customized placeholder:text-CheckoutPlaceHolder"
                  placeHolder={t`Company`}
                  error={!!errors?.company?.message}
                  helperText={errors?.company?.message || ''}
                  {...register('company', {
                    required: t`* Enter Company Name`,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  label={t`Address 1`}
                  className="Customized placeholder:text-CheckoutPlaceHolder"
                  type="text"
                  placeHolder={t`Address 1`}
                  error={!!errors.street?.[0]?.message}
                  helperText={errors?.street?.[0]?.message || ''}
                  {...register('street.0', {
                    required: t`* Enter Address1`,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  label={t`Address 2`}
                  className="Customized placeholder:text-CheckoutPlaceHolder"
                  type="text"
                  placeHolder={t`Address 2`}
                  error={!!errors?.street?.[0]?.message}
                  helperText={errors?.street?.[0]?.message || ''}
                  {...register('street.1', {
                    required: t`* Enter Address2`,
                  })}
                />
              </Grid>
              <span className="grid min-w-full gap-2 sm:grid-cols-2">
                <div>
                  <InputField
                    label={t`City`}
                    placeHolder={t`City`}
                    type="text"
                    className="Customized placeholder:text-CheckoutPlaceHolder"
                    error={!!errors?.city?.message}
                    helperText={errors?.city?.message || ''}
                    {...register('city', {
                      required: t`* Enter city Name`,
                    })}
                  />
                </div>
                <div>
                  <InputField
                    label={t`Zip Code`}
                    type="text"
                    placeHolder={t`Zip code`}
                    className="Customized placeholder:text-CheckoutPlaceHolder"
                    error={!!errors?.postcode?.message}
                    helperText={errors?.postcode?.message || ''}
                    {...register('postcode', {
                      required: t`* Enter Post Code`,
                    })}
                  />
                </div>
              </span>
              <Grid item className="w-ful">
                <InputField
                  label={t`Phone`}
                  type="text"
                  placeHolder={t`Phone number`}
                  className="Customized placeholder:text-CheckoutPlaceHolder"
                  error={!!errors?.telephone?.message}
                  helperText={errors?.telephone?.message || ''}
                  {...register('telephone', {
                    required: t`* Enter Telephone Number`,
                  })}
                />
              </Grid>

              <div>
                <CountryRegionDropdown
                  labelName
                  selectedCountryCode={countryCode || 'AD'}
                  selectedRegionId=""
                  countryRegister={{
                    ...register('country_code', {
                      required: t`* Select Country`,
                    }),
                    helperText: errors?.country_code?.message || '',
                  }}
                  regionIdRegister={{
                    ...register('region_id', {
                      required: t`* Select State/Region`,
                    }),
                    helperText: errors.region_id?.message || '',
                  }}
                  regionRegister={{
                    ...register('region', {
                      required: t`* Enter State/region`,
                    }),
                    helperText: errors.region?.message || '',
                  }}
                />
              </div>

              <Grid item xs={12} className="pb-2 mt-0 ">
                <div>
                  <CheckBoxInputField
                    label="Set as default address"
                    {...register('default_billing')}
                  />
                </div>
                <Grid className="flex items-center justify-end gap-6">
                  <Button
                    className="xl:w-40 lg:w-40 md:w-40 w-32 mr-5 xl:float-right lg:float-right md:float-right float-left rounded-[unset] text-darkGreyBackground border  border-solid border-darkGreyBackground hover:bg-darkBackground hover:border-darkBackground hover:text-white "
                    variant="outlined"
                    onClick={HandleClose}
                  >
                    <Trans>Cancel</Trans>
                  </Button>

                  <Button
                    type="submit"
                    className="xl:w-40 lg:w-40 md:w-40 w-32 rounded-[unset] pr-0 mr-0 pl-0 text-center  float-right"
                    variant="contained"
                  >
                    <Trans>Submit</Trans>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Box>
  );
}

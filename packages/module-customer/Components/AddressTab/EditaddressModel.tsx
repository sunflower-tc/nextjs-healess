import { Trans, t } from '@lingui/macro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
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
 * Set DataType for address Input field
 */
interface AddressInput {
  firstname: string;
  lastname: string;
  city: string;
  company: string;
  country_code: string;
  postcode: string;
  region_id: string;
  region: string;
  street?: string[];
  telephone: string;
  default_billing?: boolean;
}

/**
 * Props Data datatye of component
 */
interface EditTypeModal {
  showEditModelData: {
    firstname?: string;
    lastname?: string;
    city?: string;
    country_code?: string;
    company?: string;
    postcode?: string;
    region?: {
      region: string;
      region_id: number;
    };
    street?: [];
    telephone?: string;
    default_billing?: boolean;
    id?: number;
  };
  hideModal: Function;
  updateCustomerAddress: Function;
}
/**
 * Show Error Datatype with showtoast
 */
interface ErrorType {
  message: string;
}

export const EditaddressModel = ({
  showEditModelData,
  hideModal,
  updateCustomerAddress,
}: EditTypeModal) => {
  /**
   * Create Object to default value for form
   */
  const AddressDefaultData = {
    firstname: `${showEditModelData.firstname || ''}`,
    lastname: `${showEditModelData.lastname || ''}`,
    city: `${showEditModelData.city || ''}`,
    company: `${showEditModelData.company}`,
    country_code: `${showEditModelData.country_code || ''}`,
    postcode: `${showEditModelData.postcode || ''}`,
    region_id: `${showEditModelData.region?.region_id || ''}`,
    region: `${showEditModelData?.region?.region}`,
    street: showEditModelData?.street,
    telephone: `${showEditModelData?.telephone}`,
    default_billing: showEditModelData?.default_billing,
  };

  /**
   * React Form Hook
   */
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddressInput>({
    values: AddressDefaultData,
  });
  /**
   * This function help in close and open modal box based on true false value
   * @param addressid
   * @returns
   */
  function CheckmodalStatus(addressid?: number) {
    return !!addressid;
  }

  const countryCode = watch('country_code');
  const region_id = watch('region_id');
  useEffect(() => {
    if (countryCode !== showEditModelData?.country_code || region_id == '') {
      setValue('region_id', '0');
    }
  }, [countryCode, region_id, showEditModelData?.country_code, setValue]);
  const submitAddress = (formdata: FieldValues) => {
    let regionDetail;
    if (formdata?.region == '' || formdata?.region_id == 0) {
      regionDetail = {
        region: formdata?.region,
        region_id: 0,
      };
    } else {
      regionDetail = {
        region_id: Number(formdata?.region_id),
      };
    }
    delete formdata?.region_id;
    formdata.region = regionDetail;
    updateCustomerAddress({
      variables: {
        id: showEditModelData?.id,
        input: formdata,
      },
    })
      .then(() => {
        showToast({
          type: 'success',
          message: t`Address updated successfully`,
        });
        hideModal();
      })
      .catch((err: ErrorType) => {
        showToast({ message: err.message, type: 'error' });
        hideModal();
      });
  };

  return (
    <Box component="div" className="AddAddress">
      <Modal
        className="flex items-center w-full h-full overflow-y-auto"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={CheckmodalStatus(showEditModelData?.id)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={CheckmodalStatus(showEditModelData?.id)}>
          <Grid
            container
            className="max-w-2xl overflow-y-auto"
            sx={style}
            component="form"
            onSubmit={handleSubmit(submitAddress)}
          >
            <Grid item xs={12}>
              <Typography variant="h5">
                <Trans>Edit Address</Trans>
              </Typography>
            </Grid>
            <span className="grid min-w-full gap-3 mt-4 sm:grid-cols-2">
              <Grid item>
                <InputField
                  label={t`First Name`}
                  className=" Customized placeholder:text-CheckoutPlaceHolder"
                  placeHolder={t`First Name`}
                  type="text"
                  error={!!errors?.firstname?.message}
                  helperText={errors?.firstname?.message || ''}
                  {...register('firstname', {
                    required: t`* Enter First Name`,
                  })}
                />
              </Grid>
              <Grid item>
                <InputField
                  label={t`Last Name`}
                  type="text"
                  className="Customized placeholder:text-CheckoutPlaceHolder"
                  error={!!errors?.lastname?.message}
                  helperText={errors?.lastname?.message || ''}
                  {...register('lastname', {
                    required: t`* Enter Last Name`,
                  })}
                />
              </Grid>
            </span>
            <Grid item xs={12}>
              <InputField
                label={t`Company`}
                className=" Customized placeholder:text-CheckoutPlaceHolder"
                type="text"
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
                type="text"
                className="Customized placeholder:text-CheckoutPlaceHolder"
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
                type="text"
                className=" Customized placeholder:text-CheckoutPlaceHolder"
                placeHolder={t`Address 2`}
                error={!!errors.street?.[1]?.message}
                helperText={errors?.street?.[1]?.message || ''}
                {...register('street.1', {
                  required: t`* Enter Address2`,
                })}
              />
            </Grid>
            <span className="grid min-w-full gap-3 sm:grid-cols-2">
              <Grid item className="mb-1.5">
                <InputField
                  label={t`City`}
                  type="text"
                  className=" Customized placeholder:text-CheckoutPlaceHolder"
                  {...register('city')}
                  error={!!errors?.city?.message}
                  helperText={errors?.city?.message || ''}
                  {...register('city', {
                    required: t`* Enter city Name`,
                  })}
                />
              </Grid>
              <Grid item className="mb-1.5">
                <InputField
                  label={t`Zip Code`}
                  type="text"
                  className=" Customized placeholder:text-CheckoutPlaceHolder"
                  error={!!errors?.postcode?.message}
                  helperText={errors?.postcode?.message || ''}
                  {...register('postcode', {
                    required: t`* Enter Post Code`,
                  })}
                />
              </Grid>
            </span>
            <Grid item xs={12} className="mb-1.5">
              <InputField
                label={t`Phone`}
                type="text"
                className="Customized placeholder:text-CheckoutPlaceHolder"
                error={!!errors?.telephone?.message}
                helperText={errors?.telephone?.message || ''}
                {...register('telephone', {
                  required: t`* Enter Telephone Number`,
                })}
              />
            </Grid>
            <Grid item xs={12} className="pb-1 mt-1 mb-0">
              {
                <CountryRegionDropdown
                  labelName
                  selectedCountryCode={countryCode}
                  selectedRegionId={`${
                    showEditModelData?.region?.region_id || '0'
                  }`}
                  selectedRegion={showEditModelData?.region?.region || ''}
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
              }
            </Grid>
            <Grid item xs={12} className="mb-1 mt-[-10px]">
              <CheckBoxInputField
                label={t`Set as default address`}
                defaultChecked={showEditModelData?.default_billing}
                {...register('default_billing')}
              />
            </Grid>
            <Grid className="flex items-center justify-end gap-6">
              <Button
                className="xl:w-40 lg:w-40 md:w-40 w-32 mr-5 xl:float-right lg:float-right md:float-right float-left rounded-[unset] text-darkGreyBackground border  border-solid border-darkGreyBackground hover:bg-darkBackground hover:border-darkBackground hover:text-white "
                variant="outlined"
                onClick={() => {
                  hideModal();
                }}
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
        </Fade>
      </Modal>
    </Box>
  );
};

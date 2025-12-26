import Grid from '@mui/material/Grid';
import {
  BillingAddressInput,
  CheckoutStepBillAddress,
} from '@voguish/module-quote/types';

import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import {
  CheckBoxInputField,
  CountryRegionDropdown,
} from '@voguish/module-theme/components/ui/Form/Elements';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import { useTranslation } from 'next-i18next';
import { FieldValues, useForm } from 'react-hook-form';
import { useSetBillingAddressOnCart } from '../../../hooks';
import FormActions from '../FormActions';
import FormWrapper from '../FormWrapper';
const BillingAddress = ({
  handlePrev,
  cartId,
  selectedBillingAddress,
  selectedShippingAddress,
  handleNext,
}: CheckoutStepBillAddress) => {
  const isSameAsShipping =
    JSON.stringify(selectedBillingAddress) ===
    JSON.stringify(selectedShippingAddress);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BillingAddressInput>({
    defaultValues: {
      same_as_shipping: isSameAsShipping || false,
      address: selectedBillingAddress,
    },
  });

  const [countryCode, sameAsShipping] = watch([
    'address.country_code',
    'same_as_shipping',
  ]);

  const { address: addressErrors } = errors;

  /**
   * Apply Shipping Address hook
   * ! Callback function need to pass address.
   */
  const { setBillingAddressHandler, isInProcess } =
    useSetBillingAddressOnCart(handleNext);

  /**
   * Handle Add New Address
   */
  const handleSetBillingAddress = async (data: FieldValues) => {
    await setBillingAddressHandler({ cartId, billingAddress: data });

    // setAddAddress(!addAddress);
  };
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      <Grid
        container
        component="form"
        flexDirection="column"
        onSubmit={handleSubmit(handleSetBillingAddress)}
      >
        <FormWrapper className="pt-6 pb-5 space-y-3 ">
          <div>
            <CheckBoxInputField
              defaultChecked={isSameAsShipping}
              label={t('Copy as Shipping Address')}
              {...register('same_as_shipping')}
            />
          </div>
          {!sameAsShipping && (
            <ErrorBoundary>
              <Grid item className="grid gap-4 md:grid-cols-2">
                <span className="grid">
                  <InputField
                    className="Customized placeholder:text-CheckoutPlaceHolder"
                    type="text"
                    label={t('First Name')}
                    placeHolder={t('First Name')}
                    error={!!addressErrors?.firstname?.message}
                    helperText={addressErrors?.firstname?.message || ''}
                    {...register('address.firstname', {
                      required: t('* Enter First Name'),
                    })}
                  />
                </span>

                <span className="grid">
                  <InputField
                    className="Customized placeholder:text-CheckoutPlaceHolder"
                    type="text"
                    label={t('Last Name')}
                    placeHolder={t('Last Name')}
                    error={!!addressErrors?.lastname?.message}
                    helperText={addressErrors?.lastname?.message || ''}
                    {...register('address.lastname', {
                      required: t('* Enter Last Name'),
                    })}
                  />
                </span>
              </Grid>
              <div>
                <span className="grid">
                  <InputField
                    className="Customized placeholder:text-CheckoutPlaceHolder"
                    type="text"
                    label={t('Company')}
                    placeHolder={t('Company')}
                    {...register('address.company')}
                  />
                </span>
              </div>
              <div>
                <span className="grid">
                  <InputField
                    className="Customized placeholder:text-CheckoutPlaceHolder"
                    type="text"
                    label={t('Address 1')}
                    placeHolder={t('Address 1')}
                    error={!!addressErrors?.street?.[0]?.message}
                    helperText={addressErrors?.street?.[0]?.message || ''}
                    {...register('address.street.0', {
                      required: t('* Enter Line One'),
                    })}
                  />
                </span>
              </div>
              <div>
                <span className="grid">
                  <InputField
                    className="Customized placeholder:text-CheckoutPlaceHolder"
                    type="text"
                    label={t('Address 2')}
                    placeHolder={t('Address 2')}
                    {...register('address.street.1')}
                  />
                </span>
              </div>
              <Grid item className="grid gap-4 md:grid-cols-2">
                <span className="grid">
                  <InputField
                    className="Customized placeholder:text-CheckoutPlaceHolder"
                    type="text"
                    sx="Customized"
                    label={t('City')}
                    placeHolder={t('City')}
                    error={!!addressErrors?.city?.message}
                    helperText={addressErrors?.city?.message || ''}
                    {...register('address.city', {
                      required: t('* Enter city Name'),
                    })}
                  />
                </span>

                <span className="grid">
                  <InputField
                    className="Customized placeholder:text-CheckoutPlaceHolder"
                    type="text"
                    placeHolder={t('Zip Code')}
                    label={t('Zip Code')}
                    sx="Customized"
                    error={!!addressErrors?.postcode?.message}
                    helperText={addressErrors?.postcode?.message || ''}
                    {...register('address.postcode', {
                      required: t('* Enter Post Code'),
                    })}
                  />
                </span>
              </Grid>
              <div>
                <span className="grid">
                  <InputField
                    className="Customized placeholder:text-CheckoutPlaceHolder"
                    placeHolder={t('Phone')}
                    type="text"
                    label={t('Phone')}
                    sx="Customized"
                    error={!!addressErrors?.telephone?.message}
                    helperText={addressErrors?.telephone?.message || ''}
                    {...register('address.telephone', {
                      required: t('* Enter Phone Number'),
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: t(
                          '* Enter a valid phone number (10-15 digits)'
                        ),
                      },
                    })}
                  />
                </span>
              </div>
              <div>
                {
                  <CountryRegionDropdown
                    labelName
                    selectedCountryCode={countryCode ?? ''}
                    selectedRegionId={`${
                      selectedBillingAddress.region_id || ''
                    }`}
                    selectedRegion={selectedBillingAddress.region || ''}
                    countryRegister={{
                      ...register('address.country_code', {
                        required: t('* Select Country'),
                      }),
                      helperText: addressErrors?.country_code?.message || '',
                    }}
                    regionIdRegister={{
                      helperText: addressErrors?.region_id?.message || '',
                      ...register('address.region_id', {
                        required: t('* Select State/Region'),
                      }),
                    }}
                    regionRegister={{
                      helperText: addressErrors?.region?.message || '',
                      ...register('address.region', {
                        required: t('* Enter State/region'),
                      }),
                    }}
                  />
                }
              </div>
              <Grid item className="mx-auto" xs={12}>
                <CheckBoxInputField
                  label={t('Save in Address Book')}
                  {...register('address.save_in_address_book')}
                />
              </Grid>
            </ErrorBoundary>
          )}
        </FormWrapper>
        <FormActions
          process={isInProcess}
          stepLabel={t('Return to shipping method')}
          handlePrev={handlePrev}
        />
      </Grid>
    </ErrorBoundary>
  );
};
export default BillingAddress;

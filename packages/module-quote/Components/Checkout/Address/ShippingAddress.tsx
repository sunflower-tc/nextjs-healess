import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useAppSelector } from '@store/hooks';
import { COUNTRIES, getLocalStorage } from '@store/local-storage';
import { isValidArray } from '@utils/Helper';
import { useToken } from '@voguish/module-customer/hooks/useToken';
import { useSetShippingAddressOnCart } from '@voguish/module-quote/hooks';
import {
  CartAddressInput,
  CheckoutStepShipAddress,
} from '@voguish/module-quote/types';

import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { ButtonMui } from '@voguish/module-theme/components/ui/ButtonMui';
import {
  CheckBoxInputField,
  CountryRegionDropdown,
} from '@voguish/module-theme/components/ui/Form/Elements';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import FormActions from '../FormActions';
import FormWrapper from '../FormWrapper';
import { useToast } from '@packages/module-theme/components/toast/hooks';
interface regionType {
  region?: string | any;
  region_id?: string | number | any;
}
interface addressType {
  id?: number | string | any;
  default_billing?: boolean;
  firstname?: string;
  lastname?: string;
  address?: string | null;
  telephone?: number | null | any;
  company?: string | any;
  street?: [] | string | any;
  city?: string | null | any;
  postcode?: number | string;
  region: {
    region_id?: number | string;
    region?: string;
  };
  country_code?: string | any;
  save_in_address_book: boolean | any;
}
const AddressList = dynamic(() => import('./AddressList'));

const ShippingAddress = ({
  handlePrev,
  handleNext,
  cartId,
  isAccountLoggedIn,
  selectedShippingAddress,
  addresses,
  loading,
}: CheckoutStepShipAddress) => {
  const { showToast } = useToast();

  const { setShippingAddressHandler, isInProcess } =
    useSetShippingAddressOnCart(handleNext);
  const { t } = useTranslation('common');

  const [newAddress, setNewAddress] = useState(
    isAccountLoggedIn ? false : true
  );
  const [isUpdateAddress, setUpdateAddress] = useState<number | null>(null);
  const [needNewShippingAddress, setNeedNewShippingAddress] =
    useState<boolean>(true);
  const [currentRadioValue, setCurrentRadioValue] = useState(0);

  const token = useToken();

  const checkout = useAppSelector((state) => {
    return state?.checkout;
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
    register,
  } = useForm<CartAddressInput>({
    defaultValues: selectedShippingAddress,
  });

  const UserAddressUse = getLocalStorage('UserAddressUse', true);

  useEffect(() => {
    if (
      UserAddressUse &&
      UserAddressUse?.token === token &&
      UserAddressUse?.IsUseShippingAddressForm === true
    ) {
      // setNeedNewShippingAddress(false);
    }
    if (checkout?.selectedShippingAddress?.uid === -1) {
      setNeedNewShippingAddress(false);
    }
  }, [checkout, UserAddressUse, token]);

  const countryCode = watch('country_code');

  useEffect(() => {
    if (checkout?.selectedShippingAddress?.uid) {
      let defaultId = addresses.find(
        (data: any) => data.id === checkout.selectedShippingAddress.uid
      )?.id;
      setCurrentRadioValue(defaultId);
    } else {
      let defaultId = addresses.find(
        (id: { default_billing: boolean; id: number | string }) =>
          id.default_billing
      )?.id;
      setCurrentRadioValue(defaultId);
    }
  }, [addresses, checkout]);

  const handleRadioChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const radioValue = parseInt(event.target.value);
      setCurrentRadioValue(radioValue);
    },
    []
  );

  const updateAddress = useCallback((id?: number) => {
    typeof id === 'number' ? setUpdateAddress(id) : setUpdateAddress(null);
  }, []);

  const closeUpdateHandler = useCallback(() => {
    updateAddress();
    reset();
  }, [updateAddress, reset]);

  const addNewAddress = useCallback(() => {
    reset();
    setNewAddress(() => !newAddress);
    closeUpdateHandler();
  }, [reset, closeUpdateHandler, newAddress]);
  const regionId = watch('region_id');
  /**
   * Handle Add New Address
   */

  const handleAddNewAddress = async (data: FieldValues) => {
    if (currentRadioValue && !newAddress) {
      await setShippingAddressHandler({
        cartId,
        shippingAddresses: [
          {
            customer_address_id: currentRadioValue,
          },
        ],
      });
    } else {
      if (!isValidArray(addresses) && isAccountLoggedIn) {
        showToast({
          message: t('Please add a shipping address to proceed.'),
          type: 'warning',
        });
        return;
      } else {
        await setShippingAddressHandler({
          cartId,
          shippingAddresses: [
            {
              address: {
                firstname: `${data.firstname || ''}`,
                lastname: `${data.lastname || ''}`,
                city: `${data.city || ''}`,
                country_code: data.country_code || '',
                postcode: `${data.postcode || ''}`,
                region: `${data?.region || ''}`,
                street: [
                  `${data?.street?.[0] || ''}`,
                  `${data?.street?.[0] || ''}`,
                ],
                telephone: `${data?.telephone}`,
                region_id:
                  regionId && data?.region_id ? data?.region_id : undefined,
                save_in_address_book: data?.save_in_address_book,
              },
            },
          ],
        });
      }
    }
  };
  const countryText = watch('country_code');
  const countries = getLocalStorage(COUNTRIES, true);
  const changeShippingAddress = (data: FieldValues) => {
    data.region_id = isValidArray(
      countries?.find((item: { id: string }) => item?.id === countryText)
        ?.available_regions
    )
      ? data?.region_id
      : undefined;
    data.region = isValidArray(
      countries?.find((item: { id: string }) => item?.id === countryText)
        ?.available_regions
    )
      ? countries
          ?.find((item: { id: string }) => item?.id === countryText)
          ?.available_regions?.find(
            (item: { id: number }) => item?.id === data?.region_id
          )?.code
      : data?.region;

    setShippingAddressHandler({
      cartId,
      shippingAddresses: [
        {
          address: {
            firstname: `${data.firstname || ''}`,
            lastname: `${data.lastname || ''}`,
            city: `${data.city || ''}`,
            country_code: data.country_code || '',
            postcode: `${data.postcode || ''}`,
            region: `${data?.region || ''}`,
            street: [
              `${data?.street?.[0] || ''}`,
              `${data?.street?.[0] || ''}`,
            ],
            telephone: `${data?.telephone}`,
            region_id: regionId && data?.region_id ? data?.region_id : 0,
            save_in_address_book: data?.save_in_address_book || false,
          },
        },
      ],
    });
  };

  const updateHandlerId = useCallback((id: number) => {
    updateAddress(id);
    const preFilledFormData: addressType = addresses?.find(
      (i: addressType) => i?.id === id
    );
    const setValues = (
      key_: any,
      value: string | number | regionType | undefined
    ) => {
      if (key_ && value) {
        setValue(key_, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      }
    };

    setValues('firstname', preFilledFormData?.firstname);
    setValues('lastname', preFilledFormData?.lastname);
    setValues('company', preFilledFormData?.company);
    setValues('city', preFilledFormData?.city);
    setValues('country_code', preFilledFormData?.country_code);
    setValues('postcode', preFilledFormData?.postcode);
    setValues('region', preFilledFormData?.region);
    setValues('telephone', preFilledFormData?.telephone);
    setValues('street.0', preFilledFormData?.street[0]);
    setValues('street.1', preFilledFormData?.street[1]);
    setValues('region', preFilledFormData?.region?.region);
    setValues('region_id', preFilledFormData?.region.region_id);
    setValues('save_in_address_book', preFilledFormData?.save_in_address_book);
  }, []);

  return (
    <ErrorBoundary>
      <Grid
        container
        component="form"
        flexDirection="column"
        onSubmit={handleSubmit(handleAddNewAddress)}
      >
        <FormWrapper className="space-y-0.5 pb-5 pt-6">
          {isAccountLoggedIn && (
            <ErrorBoundary>
              {Boolean(!newAddress && !isUpdateAddress) && (
                <div className="px-4 py-2">
                  <AddressList
                    updateHandlerId={updateHandlerId}
                    data={addresses}
                    loading={loading}
                    handleRadioChange={handleRadioChange}
                  />
                </div>
              )}
              {needNewShippingAddress && (
                <div className="flex flex-col items-center justify-center mb-4">
                  <Button
                    onClick={addNewAddress}
                    variant="contained"
                    className="mx-auto rounded-none shadow-none"
                  >
                    {newAddress ? 'View Saved Addresses' : 'Add New Address'}
                  </Button>
                </div>
              )}
            </ErrorBoundary>
          )}
          {Boolean(newAddress || isUpdateAddress) && (
            <ErrorBoundary>
              <Grid item className="grid gap-4 md:grid-cols-2">
                <span className="grid">
                  <InputField
                    className="Customized placeholder:text-CheckoutPlaceHolder"
                    type="text"
                    label={t('First Name')}
                    placeHolder={t('First Name')}
                    error={errors?.firstname?.message ? true : false}
                    helperText={
                      errors?.firstname ? errors?.firstname?.message : ''
                    }
                    {...register('firstname', {
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
                    error={errors?.lastname?.message ? true : false}
                    helperText={
                      errors?.lastname ? errors?.lastname?.message : ''
                    }
                    {...register('lastname', {
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
                    error={errors?.company?.message ? true : false}
                    helperText={errors?.company ? errors?.company?.message : ''}
                    {...register('company')}
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
                    error={!!errors.street?.[0]?.message}
                    helperText={errors?.street?.[0]?.message || ''}
                    {...register('street.0', {
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
                    error={errors.street?.[1]?.message ? true : false}
                    helperText={
                      errors.street?.[1] ? errors.street?.[1]?.message : ''
                    }
                    {...register('street.1')}
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
                    error={errors?.city?.message ? true : false}
                    helperText={errors?.city ? errors?.city?.message : ''}
                    {...register('city', {
                      required: t('* Enter city Name'),
                    })}
                  />
                </span>

                <span className="grid">
                  <InputField
                    label={t('Zip Code')}
                    className="Customized placeholder:text-CheckoutPlaceHolder"
                    type="text"
                    placeHolder={t('Zip Code')}
                    sx="Customized"
                    error={errors?.postcode?.message ? true : false}
                    helperText={
                      errors?.postcode ? errors?.postcode?.message : ''
                    }
                    {...register('postcode', {
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
                    error={errors?.telephone?.message ? true : false}
                    helperText={
                      errors?.telephone ? errors?.telephone?.message : ''
                    }
                    {...register('telephone', {
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
                <CountryRegionDropdown
                  labelName
                  selectedCountryCode={countryCode}
                  selectedRegionId={`${
                    selectedShippingAddress.region_id || '0'
                  }`}
                  selectedRegion={selectedShippingAddress.region || ''}
                  countryRegister={{
                    ...register('country_code', {
                      required: t('* Select Country'),
                    }),
                    helperText: errors?.country_code?.message || '',
                  }}
                  regionIdRegister={{
                    ...register('region_id', {
                      required: t('* Select state/Region'),
                    }),
                    helperText: errors.region_id?.message || '',
                  }}
                  regionRegister={
                    !regionId
                      ? {
                          ...register('region', {
                            required: t('* Enter State/region'),
                          }),
                          helperText: errors.region?.message || '',
                        }
                      : null
                  }
                />
              </div>
              {isAccountLoggedIn && (
                <div className="flex justify-between">
                  <CheckBoxInputField
                    label={t('Save in Address Book')}
                    {...register('save_in_address_book')}
                  />

                  <div>
                    <ButtonMui
                      isLoading={(isUpdateAddress && isInProcess) || false}
                      onClick={handleSubmit(changeShippingAddress)}
                      type="submit"
                      variant="contained"
                      className="py-3 mx-auto rounded-none shadow-none"
                    >
                      {t('UPDATE')}
                    </ButtonMui>
                  </div>
                </div>
              )}
            </ErrorBoundary>
          )}
        </FormWrapper>
        <FormActions
          process={
            isAccountLoggedIn
              ? newAddress || isUpdateAddress
                ? false
                : isInProcess
              : isInProcess
          }
          stepLabel={token ? t('Go to cart') : t('Return to personal address')}
          handlePrev={() => {
            setUpdateAddress(null);
            setNewAddress(false);
            handlePrev();
          }}
        />
      </Grid>
    </ErrorBoundary>
  );
};
export default ShippingAddress;

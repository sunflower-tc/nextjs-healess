import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { COUNTRIES, getLocalStorage } from '@store/local-storage';
import { isValidArray } from '@utils/Helper';
import { Country, Region } from '@voguish/module-store';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import {
  Component,
  FocusEvent,
  FormEvent,
  ReactNode,
  RefObject,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import InputField from './Input';
import { SelectorPlaceHolder } from '@voguish/module-marketplace/Components/Placeholder';
/**
 * Code for Mange the Country Select option Silder
 */
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
    },
  },
};

interface BaseProps {
  label?: string;
  name?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void; // eslint-disable-line
  value?: string;
  refs?: RefObject<Component>;
  sx?: string;
  error?: boolean;
  defaultValue?: string;
  helperText?: string;
}

interface ISelectDropDownField extends BaseProps {
  onChange?: (e: SelectChangeEvent<string>, child: ReactNode) => void; // eslint-disable-line
}

interface InputFieldProps extends BaseProps {
  onChange: (e: FormEvent<HTMLInputElement>) => void; // eslint-disable-line
}

interface CountriesProps extends ISelectDropDownField {
  countries: Country[];
  labelName?: boolean;
}

interface RegionsProps extends ISelectDropDownField {
  regions: Region[];
  labelName?: boolean;
}
interface countryProps {
  id: string | number;
}
export const CountryRegionDropdown = ({
  countryRegister,
  regionRegister,
  regionIdRegister,
  selectedCountryCode,
  selectedRegion,
  selectedRegionId,
  labelName = true,
}: {
  countryRegister: ISelectDropDownField;
  regionRegister?: InputFieldProps | null | undefined;
  regionIdRegister?: ISelectDropDownField | null | undefined;
  selectedCountryCode: string;
  selectedRegion?: string;
  selectedRegionId?: string;
  labelName?: boolean;
}) => {
  const { t } = useTranslation('common');
  const countries = getLocalStorage(COUNTRIES, true);
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    if (countries && isValidArray(countries)) {
      const thisRegions =
        countries?.find(
          (country: countryProps) => country.id === selectedCountryCode
        )?.available_regions || [];
      setRegions(thisRegions);
    }
  }, [selectedCountryCode]);

  return (
    <ErrorBoundary>
      {countries && isValidArray(countries) ? (
        <div className="grid gap-2.5">
          <div>
            {!labelName && (
              <InputLabel id="address-select-region-label">
                {t('Enter Region')}
              </InputLabel>
            )}
            <CountryDropdown
              {...{
                ...countryRegister,
                countries: countries,
                defaultValue: selectedCountryCode,
              }}
            />
          </div>
          <div>
            {isValidArray(regions) ? (
              <div className="-mt-4">
                {!labelName && (
                  <InputLabel id="address-select-region-label">
                    {t('Enter Region')}
                  </InputLabel>
                )}
                <RegionsDropDown
                  {...{
                    ...regionIdRegister,
                    regions: regions,
                    defaultValue: selectedRegionId,
                  }}
                />
              </div>
            ) : (
              <ErrorBoundary>
                {!labelName && (
                  <InputLabel id="address-select-region-label">
                    {t('Enter Region')}
                  </InputLabel>
                )}
                <InputField
                  label={labelName ? t('Region/State') : ''}
                  type="text"
                  {...regionRegister}
                  defaultValue={
                    selectedRegion ||
                    regions?.find(
                      (item) => `${selectedRegionId}` === `${item.id}`
                    )?.name
                  }
                />
              </ErrorBoundary>
            )}
          </div>
        </div>
      ) : (
        <SelectorPlaceHolder />
      )}
    </ErrorBoundary>
  );
};

const CountryDropdown = forwardRef(
  (
    {
      onChange,
      value,
      labelName,
      name,
      error,
      label,
      helperText,
      onBlur,
      defaultValue,
      countries,
    }: CountriesProps,
    ref
  ) => {
    const { t } = useTranslation('common');
    return (
      <ErrorBoundary>
        <FormControl
          required
          className={` ${!labelName && '-mt-0'}`}
          margin="normal"
          size="small"
          sx={{ width: '100%' }}
        >
          {labelName ? (
            <InputLabel id="address-select-country-input-label">
              {t('Country')}
            </InputLabel>
          ) : (
            <label
              className="pb-0.5"
              htmlFor="address-select-country-input-label"
            >
              {t('Country')} *
            </label>
          )}
          <Select
            labelId="address-select-country-label"
            required
            id="address-select-country"
            name={name}
            ref={ref}
            value={value || defaultValue}
            error={error}
            MenuProps={MenuProps}
            onBlur={onBlur}
            onChange={onChange}
            label={label}
            size="small"
            defaultValue={defaultValue || ''}
          >
            <MenuItem value="">
              <em>{t('Select Country...')}</em>
            </MenuItem>
            {countries.map((country_detail) => (
              <MenuItem key={country_detail.id} value={country_detail.id}>
                {country_detail.full_name_english}
              </MenuItem>
            ))}
          </Select>
          {helperText && (
            <FormHelperText className="text-red-600 !text-xs">
              {helperText}
            </FormHelperText>
          )}
        </FormControl>
      </ErrorBoundary>
    );
  }
);

CountryDropdown.displayName = 'CountryDropdown';

const RegionsDropDown = forwardRef(
  (
    {
      onChange,
      value,
      labelName,
      regions,
      name,
      label,
      onBlur,
      defaultValue,
      helperText,
      error,
      sx,
    }: RegionsProps,
    ref
  ) => {
    const { t } = useTranslation('common');

    /**
     * Reload the country information data with specific Id
     */

    return (
      <ErrorBoundary>
        <FormControl
          className={`${sx} ${!labelName && 'mt-5'}`}
          margin="normal"
          required
          size="small"
          sx={{ width: '100%' }}
          error={error}
        >
          {labelName ? (
            <InputLabel id="address-select-region-label">
              {t('State/Region')} {label}
            </InputLabel>
          ) : (
            <label className="pb-0.5" htmlFor="address-select-region-label">
              {t('State/Region')} *
            </label>
          )}
          <Select
            labelId="address-select-region-select-label"
            required
            id="address-select-region-select"
            name={name}
            ref={ref}
            value={value}
            error={error}
            MenuProps={MenuProps}
            onBlur={onBlur}
            onChange={onChange}
            label={label}
            size="small"
            defaultValue={defaultValue || ''}
          >
            <MenuItem
              className="mx-3 rounded-md"
              value=""
            >{`${t('Please Select')}  ${label}`}</MenuItem>
            {regions?.map((region_detail: any) => (
              <MenuItem
                className="mx-3 rounded-md"
                key={region_detail.id}
                value={region_detail.id}
              >
                {region_detail.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText className="text-red-600 ">
            {helperText}
          </FormHelperText>
        </FormControl>
      </ErrorBoundary>
    );
  }
);

RegionsDropDown.displayName = 'RegionsDropDown';

export default CountryRegionDropdown;

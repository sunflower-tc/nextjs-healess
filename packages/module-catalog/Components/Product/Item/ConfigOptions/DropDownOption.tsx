// @ts-nocheck
import Typography from '@mui/material/Typography';
import { useAppSelector } from '@store/hooks';
import { AddProductsToCartInput } from '@voguish/module-quote/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { OptionRendererProps } from './types';
import { useEffect } from 'react';

const DropDownOption = ({
  name,
  option,
  index,
  compare,
}: OptionRendererProps) => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<AddProductsToCartInput>();
  const { t } = useTranslation('common');

  watch(name);

  const errMsg = errors?.selected_options?.[index]?.message || '';
  let currentProduct = useAppSelector(
    (state) => state?.storeConfig?.setProduct
  );
  useEffect(() => {
    setValue(name, currentProduct?.attributes?.[index].uid);
  }, [name]);
  return (
    <ErrorBoundary>
      <div className="flex flex-row items-center gap-x-4">
        {!compare && (
          <Typography
            htmlFor={`select-label-${option.attribute_code}`}
            className="w-32"
            component="label"
          >
            {option.label} :
          </Typography>
        )}
        <Controller
          name={name}
          control={control}
          rules={{ required: t('This is a required field.') }}
          defaultValue={currentProduct?.attributes?.[index].uid}
          render={({ field }) => (
            <div className="relative w-52">
              <select
                id={`select-${option.attribute_code}`}
                aria-label={option.label}
                {...field}
                value={field.value || ''}
                className={`block w-full text-md border-r-8 ring-1 ring-slate-300 px-3 py-2.5 border rounded-md shadow-sm focus:outline-none bg-white focus:ring-2 
                  ${errMsg ? 'border-white' : 'border-white'}
                  `}
              >
                <option value="" disabled>
                  - - {t('Choose')} {option.label} - -
                </option>
                {option.values.map((optionValue) => (
                  <option
                    key={optionValue.uid}
                    value={optionValue.uid}
                    title={optionValue.label}
                    className="text-lg capitalize "
                  >
                    {optionValue.label}
                  </option>
                ))}
              </select>
              {errMsg && (
                <Typography
                  className="absolute left-0 px-1 text-xs text-red-600 -bottom-5"
                  variant="caption"
                >
                  {errMsg}
                </Typography>
              )}
            </div>
          )}
        />
      </div>
    </ErrorBoundary>
  );
};

export default DropDownOption;

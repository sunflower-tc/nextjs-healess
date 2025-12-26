import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useAppSelector } from '@store/hooks';
import { AddProductsToCartInput } from '@voguish/module-quote/types';
import { useTranslation } from 'next-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { OptionRendererProps } from './types';
export function TextSwatchOption({
  name,
  option,
  compare,
  index,
}: OptionRendererProps) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<AddProductsToCartInput>();
  const { t } = useTranslation('common');
  const selectedOption = watch(name);

  const errMsg = errors?.selected_options?.[index]?.message || '';
  const validItem = (id: string | number) => {
    if (selectedOption === id) {
      return true;
    }
  };
  let currentProduct = useAppSelector(
    (state) => state?.storeConfig?.setProduct
  ) as any;

  return (
    <ErrorBoundary>
      <Controller
        name={name}
        control={control}
        key={option.uid}
        defaultValue={currentProduct?.attributes?.[index].uid}
        rules={{ required: t('This is a required field.') }}
        render={({ field }) => {
          return (
            <ErrorBoundary>
              <FormControl fullWidth className="flex flex-row items-center">
                <FormLabel
                  sx={{ minWidth: 0 }}
                  id={`swatch-option-${option.attribute_code}`}
                >
                  {!compare && (
                    <Typography variant="body1" className="w-32 text-primary">
                      {option.label} :
                    </Typography>
                  )}
                </FormLabel>

                <RadioGroup
                  className="flex flex-wrap items-center gap-2"
                  {...field}
                  row
                  onChange={(_, value) => field.onChange(value)}
                  value={field.value || ''}
                  aria-labelledby={`swatch-option-${option.attribute_code}-${option.uid}`}
                >
                  {!compare &&
                    option.values.map((optionValue) => (
                      <ErrorBoundary key={optionValue.uid}>
                        <Stack alignItems="center" justifyContent="center">
                          <Avatar
                            className={`!h-10 absolute outline-none min-w-0 !w-10 font-semibold text-[0.875rem] rounded   ${
                              validItem(optionValue.uid)
                                ? 'border border-solid border-black bg-black text-[#F5F5F5]'
                                : 'border border-solid border-transparent text-black bg-[#F5F5F5]'
                            }`}
                          >
                            {optionValue.swatch_data?.value}
                          </Avatar>
                          <FormControlLabel
                            key={optionValue.uid}
                            control={<Radio />}
                            aria-label={optionValue.label}
                            label={optionValue.label}
                            value={optionValue.uid}
                            sx={{
                              margin: 0,
                              fontSize: 0,
                              opacity: 0,
                              '.MuiFormControlLabel-label': { display: 'none' },
                            }}
                          />
                        </Stack>
                      </ErrorBoundary>
                    ))}
                  {compare &&
                    option.values.slice(0, 3).map((optionValue) => (
                      <ErrorBoundary key={optionValue.uid}>
                        <Stack alignItems="center" justifyContent="center">
                          <Avatar
                            className={`!h-10 absolute outline-none min-w-0 !w-10 font-semibold text-[0.875rem] rounded   ${
                              validItem(optionValue.uid)
                                ? 'border border-solid border-black bg-black text-[#F5F5F5]'
                                : 'border border-solid border-transparent text-black bg-[#F5F5F5]'
                            }`}
                          >
                            {optionValue.swatch_data?.value}
                          </Avatar>
                          <FormControlLabel
                            key={optionValue.uid}
                            control={<Radio />}
                            aria-label={optionValue.label}
                            label={optionValue.label}
                            value={optionValue.uid}
                            sx={{
                              margin: 0,
                              fontSize: 0,
                              opacity: 0,
                              '.MuiFormControlLabel-label': { display: 'none' },
                            }}
                          />
                        </Stack>
                      </ErrorBoundary>
                    ))}
                  {compare && option.values.length > 3 && (
                    <Typography className="mt-1 -ml-0.5 text-sm font-semibold cursor-pointer text-secondary">
                      {option.values.length - 3}+
                    </Typography>
                  )}
                </RadioGroup>
              </FormControl>
              {errMsg && (
                <Typography
                  className="relative h-5 text-xs -bottom-2 text-red-600"
                  variant="overline"
                >
                  {errMsg}
                </Typography>
              )}
            </ErrorBoundary>
          );
        }}
      />
    </ErrorBoundary>
  );
}

export default TextSwatchOption;

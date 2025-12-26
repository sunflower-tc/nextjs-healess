import Done from '@mui/icons-material/Done';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useAppSelector } from '@store/hooks';
import { AddProductsToCartInput } from '@voguish/module-quote/types';
import { useTranslation } from 'next-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { OptionRendererProps } from './types';
export const ColorSwatchOption = ({
  name,
  option,
  compare,
  detailsPage = true,
  index,
}: OptionRendererProps) => {
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
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: t('This is a required field.') }}
      key={option.uid}
      defaultValue={currentProduct?.attributes?.[index].uid} // set default value
      render={({ field }) => (
        <ErrorBoundary>
          <FormControl
            fullWidth
            className={`${detailsPage && 'flex flex-row items-center '}`}
          >
            {detailsPage && !compare && (
              <FormLabel
                className="flex flex-row w-32"
                sx={{ minWidth: 0 }}
                id={`swatch-option-${option.attribute_code}`}
              >
                <Typography variant="body1" className="mt-1.5 text-primary">
                  {' '}
                  {t('Select')}
                  {` ${option.label}:`}
                </Typography>
              </FormLabel>
            )}
            <ErrorBoundary>
              <RadioGroup
                className={`col-span-3 ${
                  detailsPage
                    ? 'flex-wrap items-center flex col-span-4 gap-5 sm:col-span-3'
                    : 'gap-2'
                }`}
                {...field}
                row
                aria-labelledby={`swatch-option-${option.attribute_code}-${option.uid}`}
                onChange={(event, value) => field.onChange(value)}
                value={field.value || ''}
              >
                {detailsPage &&
                  option.values.map((optionValue) => (
                    <ErrorBoundary key={optionValue?.uid}>
                      <Grid
                        className="p-0 m-0"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography
                          component="label"
                          sx={{
                            backgroundColor: optionValue.swatch_data?.value,
                            borderColor: validItem(optionValue.uid)
                              ? 'black'
                              : 'transparent',
                          }}
                          className={`!h-8 flex justify-center items-center !w-8 border-solid absolute min-w-0 !rounded-full ${
                            validItem(optionValue.uid) && 'border-spacing-20'
                          } border border-solid`}
                        >
                          {selectedOption === optionValue.uid && (
                            <Done className="font-extrabold text-white" />
                          )}
                        </Typography>
                        <FormControlLabel
                          control={<Radio className="p-0 m-0" />}
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
                      </Grid>
                    </ErrorBoundary>
                  ))}

                {!detailsPage &&
                  option.values.slice(0, 3).map((optionValue) => (
                    <Grid
                      sx={{
                        border: `1px solid ${
                          validItem(optionValue.uid)
                            ? optionValue.swatch_data?.value
                            : '#e4e4e7'
                        }`,
                      }}
                      className="flex items-center justify-center p-0 m-0 rounded-full"
                      key={optionValue.uid}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography
                        component="label"
                        sx={{
                          backgroundColor: optionValue.swatch_data?.value,
                        }}
                        className={` flex justify-center items-center absolute min-w-0 !rounded-full ${
                          validItem(optionValue.uid)
                            ? '!h-5 w-5 shadow'
                            : '!h-6 w-6'
                        }`}
                      ></Typography>
                      <FormControlLabel
                        control={<Radio className="p-0 m-0" />}
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
                    </Grid>
                  ))}
                {!detailsPage && option.values.length > 3 && (
                  <Typography className="-ml-0.5 mt-1 cursor-pointer text-sm font-semibold text-secondary">
                    {option.values.length - 3}+
                  </Typography>
                )}
              </RadioGroup>
            </ErrorBoundary>
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
      )}
    />
  );
};
export default ColorSwatchOption;

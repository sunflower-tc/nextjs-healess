import { Trans, t } from '@lingui/macro';
import Grid from '@mui/material/Grid';

import Done from '@mui/icons-material/Done';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { AddProductsToCartInput } from '@voguish/module-quote/types';
import { Controller, useFormContext } from 'react-hook-form';
import { OptionRendererProps } from './types';
export const ColorSwatchOption = ({
  name,
  option,
  detailsPage = true,
  index,
}: OptionRendererProps) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<AddProductsToCartInput>();

  const selectedOption = watch(name);

  const errMsg = errors?.selected_options?.[index]?.message || '';
  const validItem = (id: string | number) => {
    if (selectedOption === id) {
      return true;
    }
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: t`This is a required field.` }}
      key={option.uid}
      defaultValue={`${option?.values?.[0]?.uid || 0}`} // set default value
      render={({ field }) => (
        <>
          <FormControl
            fullWidth
            className={`${detailsPage && 'flex flex-row items-center '}`}
          >
            {detailsPage && (
              <FormLabel
                className="flex flex-row w-32"
                sx={{ minWidth: 0 }}
                id={`swatch-option-${option.attribute_code}`}
              >
                <Typography variant="body1" className="mt-1.5 text-primary">
                  <Trans> Select</Trans>
                  {option.label}:
                </Typography>

                {/* <Typography variant="subtitle1">
                {option.values.find((value) => value.uid === selectedOption)
                  ?.label || ''}
              </Typography> */}
              </FormLabel>
            )}
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
                  <Grid
                    className="p-0 m-0"
                    key={optionValue.uid}
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
                      className={`!h-8 flex justify-center items-center !w-8 absolute min-w-0 !rounded-full ${
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
                <Typography className="mt-1 -ml-0.5 text-sm font-semibold cursor-pointer text-secondary">
                  {option.values.length - 3}+
                </Typography>
              )}
            </RadioGroup>
          </FormControl>
          {errMsg && (
            <Typography
              className="relative h-5 text-xs -bottom-2 text-error"
              variant="overline"
            >
              {errMsg}
            </Typography>
          )}
        </>
      )}
    />
  );
};
export default ColorSwatchOption;

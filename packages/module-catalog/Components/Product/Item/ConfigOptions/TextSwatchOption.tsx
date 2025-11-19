import { t } from '@lingui/macro';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AddProductsToCartInput } from '@voguish/module-quote/types';
import { Controller, useFormContext } from 'react-hook-form';
import { OptionRendererProps } from './types';

export function TextSwatchOption({ name, option, index }: OptionRendererProps) {
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
      key={option.uid}
      rules={{ required: t`This is a required field.` }}
      render={({ field }) => {
        return (
          <>
            <FormControl fullWidth className="flex flex-row items-center">
              <FormLabel
                className=""
                sx={{ minWidth: 0 }}
                id={`swatch-option-${option.attribute_code}`}
              >
                <Typography variant="body1" className="w-32 text-primary">
                  {option.label}:
                </Typography>
                {/* <Typography variant="subtitle1">
                {option.values.find((value) => value.uid === selectedOption)
                  ?.label || ''}
              </Typography> */}
              </FormLabel>

              <RadioGroup
                className="flex-wrap gap-2"
                {...field}
                row
                onChange={(event, value) => field.onChange(value)}
                value={field.value || ''}
                aria-labelledby={`swatch-option-${option.attribute_code}-${option.uid}`}
              >
                {option.values.map((optionValue) => (
                  <Stack
                    key={optionValue.uid}
                    alignItems="center"
                    justifyContent="center"
                  >
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
                ))}
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
        );
      }}
    />
  );
}

export default TextSwatchOption;

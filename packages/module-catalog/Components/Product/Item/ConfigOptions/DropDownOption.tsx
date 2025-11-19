// @ts-nocheck
import { Trans, t } from '@lingui/macro';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { AddProductsToCartInput } from '@voguish/module-quote/types';
import { Controller, useFormContext } from 'react-hook-form';
import { OptionRendererProps } from './types';
const DropDownOption = ({ name, option, index }: OptionRendererProps) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<AddProductsToCartInput>();

  {
    /* const selectedOption =*/
  }
  watch(name);

  const errMsg = errors?.selected_options?.[index]?.message || '';

  return (
    <div className="flex flex-row items-center">
      <Typography
        htmlFor={`select-label-${option.attribute_code}`}
        className="w-32"
        component="label"
      >
        {option.label} :
      </Typography>
      {/* <Typography variant="subtitle1">
          {option.values.find((value) => value.uid === selectedOption)?.label ||
            ''}
        </Typography> */}
      <Controller
        name={name}
        defaultValue={t`Placeholder`}
        rules={{ required: t`This is a required field.` }}
        control={control}
        render={({ field }) => (
          <>
            <FormControl className="col-span-3">
              <Select
                {...field}
                labelId={`select-label-${option.attribute_code}`}
                id={`select-${option.attribute_code}`}
                fullWidth
                error={!!errMsg}
                native={false}
                sx={{ width: '100%', height: 35 }}
              >
                <MenuItem disabled value={t`Placeholder`}>
                  <em>
                    - -<Trans> Choose </Trans>
                    {option.label} - -
                  </em>
                </MenuItem>
                {option.values.map((optionValue) => (
                  <MenuItem
                    className="m-2 rounded-md"
                    key={optionValue.uid}
                    value={optionValue.uid}
                  >
                    {optionValue.label}
                  </MenuItem>
                ))}
              </Select>
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
    </div>
  );
};

export default DropDownOption;

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Controller, useFormContext } from 'react-hook-form';

export interface IRadioOptions {
  id: string;
  label: string;
  value: string;
}

interface IFormElementTypes {
  name: string;
  required?: boolean;

  options: IRadioOptions[];
}

export function RadioFieldElement({
  name,
  options,
  required,
}: IFormElementTypes) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <FormControl className="items-center" fullWidth>
          <RadioGroup
            {...field}
            row
            onChange={(event, value) => field.onChange(value)}
            value={field.value}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
}

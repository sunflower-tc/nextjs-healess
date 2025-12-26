import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { isValidArray } from '@utils/Helper';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { forwardRef } from 'react';

export interface RadioOptions {
  label: any;
  value: string;
}

interface IRadioInputField {
  label?: string;
  id: string;
  options: RadioOptions[];
  name?: string;
  onChange?: any;
  onBlur?: any;
  row?: boolean;
  value?: string;
  defaultValue?: string;
  refs?: any;
}

export const RadioInputField = forwardRef(
  (
    {
      label,
      id,
      options,
      name,
      defaultValue,
      onChange,
      row = false,
      onBlur,
      value,
    }: IRadioInputField,
    ref
  ) => {
    return (
      <ErrorBoundary>
        <div className="rtl:-mr-6">
          {isValidArray(options) ? (
            <FormControl>
              <FormLabel id={`${id}-label`}>{label}</FormLabel>
              <RadioGroup
                ref={ref}
                row={row}
                aria-labelledby={`${id}-label`}
                defaultValue={defaultValue}
                name={name}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
              >
                {options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ) : (
            ''
          )}
        </div>
      </ErrorBoundary>
    );
  }
);

RadioInputField.displayName = 'RadioInputField';

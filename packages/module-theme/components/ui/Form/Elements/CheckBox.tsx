import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React from 'react';
export interface ICheckBoxInputField {
  label: string;
  name?: string;
  onChange?: any;
  onBlur?: any;
  value?: string;
  refs?: any;
  defaultChecked?: boolean;
}

export const CheckBoxInputField = React.forwardRef(
  (
    {
      label,
      name,
      onChange,
      defaultChecked,
      onBlur,
      value,
    }: ICheckBoxInputField,
    ref
  ) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={defaultChecked}
            name={name}
            onChange={onChange}
            value={value}
            ref={ref as any}
            onBlur={onBlur}
          />
        }
        label={label}
      />
    );
  }
);

CheckBoxInputField.displayName = 'CheckBoxInputField';

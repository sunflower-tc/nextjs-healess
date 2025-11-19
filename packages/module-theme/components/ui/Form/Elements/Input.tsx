import TextField from '@mui/material/TextField';
import Style from '@styles/Checkout.module.css';
import React from 'react';

export interface IInputField {
  label?: string;
  type: 'password' | 'email' | string;
  placeHolder?: string;
  error?: boolean;
  helperText?: any;
  name?: string;
  onChange?: any;
  onBlur?: any;
  value?: string;
  multiline?: boolean;
  maxRows?: number | string;
  minRows?: number | string;
  defaultValue?: string;
  refs?: any;
  sx?: any;
  className?: string;
}

const InputField = React.forwardRef(
  (
    {
      label,
      type,
      placeHolder,
      error,
      helperText,
      name,
      onChange,
      onBlur,
      value,
      multiline,
      minRows,
      maxRows,
      defaultValue,
      sx,
      className,
    }: IInputField,
    ref
  ) => {
    return (
      <div>
        {label && (
          <label className="mt-0.5" htmlFor={name}>
            {label}
          </label>
        )}
        <TextField
          autoSave={type}
          className={`mt-0 mb-0 ${Style.CheckoutInputError} [&>div.MuiOutlinedInput-root]:!max-h-fit min-h-[4rem] md:min-h-[3.5rem] w-full [&>div.MuiOutlinedInput-root]:min-w-full border-commonBorder ${className} `}
          sx={{
            ...sx,
          }}
          type={type}
          name={name}
          placeholder={placeHolder}
          ref={ref as any}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          fullWidth
          margin="normal"
          autoFocus={true}
          FormHelperTextProps={{ className: 'text-xs' }}
          autoComplete={type}
          helperText={helperText}
          error={error}
          size="small"
          InputProps={{
            style: { border: '1px solid transparent' },
          }}
          multiline={multiline}
          maxRows={maxRows}
          minRows={minRows}
        />
      </div>
    );
  }
);

InputField.displayName = 'Input';
export default InputField;

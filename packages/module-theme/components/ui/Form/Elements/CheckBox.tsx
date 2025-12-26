import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { forwardRef } from 'react';
import { useTranslation } from 'next-i18next';
export interface ICheckBoxInputField {
  label: string;
  name?: string;
  onChange?: any;
  onBlur?: any;
  value?: string;
  refs?: any;
  defaultChecked?: boolean;
  disabled?: boolean;
}

export const CheckBoxInputField = forwardRef(
  (
    {
      label,
      name,
      onChange,
      defaultChecked,
      onBlur,
      value,
      disabled,
    }: ICheckBoxInputField,
    ref
  ) => {
    const { t } = useTranslation('common');
    return (
      <ErrorBoundary>
        <div className="rtl:-mr-6">
          <FormControlLabel
            control={
              <Checkbox
                disabled={disabled}
                defaultChecked={defaultChecked}
                name={name}
                onChange={onChange}
                value={value}
                ref={ref as any}
                onBlur={onBlur}
              />
            }
            label={t(label)}
          />
        </div>
      </ErrorBoundary>
    );
  }
);

CheckBoxInputField.displayName = 'CheckBoxInputField';

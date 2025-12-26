import Button from '@mui/material/Button';
import { FC } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { SpinnerIcon } from '../elements/Icon';

export const ButtonMui: FC<any> = ({
  component,
  onClick,
  children,
  variant,
  isLoading = false,
  endIcon,
  isDisabled = false,
  type,
  color,
  size,
  style,
  className,
  startIcon,
}) => {
  return (
    <ErrorBoundary>
      <Button
        component={component || ''}
        variant={variant || 'outlined'}
        endIcon={endIcon || ''}
        disabled={isLoading ? true : isDisabled}
        color={color || 'primary'}
        size={size || 'medium'}
        type={type || 'button'}
        startIcon={startIcon}
        onClick={onClick}
        sx={style}
        className={'relative align-[unset]' + className}
      >
        {isLoading && (
          <div className="absolute flex items-center justify-center h-full width-full">
            <SpinnerIcon />
          </div>
        )}
        {children}
      </Button>{' '}
    </ErrorBoundary>
  );
};

/**
 * variants
 */

const PrimaryBtnVariant = {
  width: '100%',
};
const SecondaryBtnVariant = {
  backgroundColor: '#2c3145',
  width: '100%',
};

export { PrimaryBtnVariant, SecondaryBtnVariant };

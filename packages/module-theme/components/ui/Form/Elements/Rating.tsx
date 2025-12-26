import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Rating from '@mui/material/Rating';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
const StarRoundedIcon = dynamic(
  () => import('@mui/icons-material/StarRounded')
);
export interface IRatingInputField {
  label: string;
  name?: string;
  onChange?: any;
  value?: number;
  refs?: any;
  id: string;
  sx?: object;
}

const RatingInputField = forwardRef(
  ({ label, id, name, onChange, value }: IRatingInputField, ref) => {
    return (
      // <FormControl sx={{ my: '0.25rem' }}   error={Boolean(errors.rating)}>
      <ErrorBoundary>
        <FormControl sx={{ my: '0.25rem' }}>
          <FormLabel sx={{ mt: '0.25rem' }} id={`${id}-label`}>
            {label}
          </FormLabel>
          <ErrorBoundary>
            <Rating
              aria-labelledby={`${id}-label`}
              name={name}
              onChange={onChange}
              value={value}
              icon={
                <StarRoundedIcon
                  //   use direct color for Star icon
                  sx={{ fontSize: '2rem', color: '#FFC930' }}
                />
              }
              emptyIcon={
                <StarRoundedIcon
                  //   use direct color for Star icon
                  sx={{ fontSize: '2rem', color: '#E9E8E8' }}
                />
              }
              ref={ref as any}
              sx={{ '& span': { pr: '1rem' } }}
            />
          </ErrorBoundary>
        </FormControl>
      </ErrorBoundary>

      //  {errors.rating && (
      //          <FormHelperText>{errors.rating.message}</FormHelperText>
      //  )}
    );
  }
);
export default RatingInputField;
RatingInputField.displayName = 'RatingInputField';

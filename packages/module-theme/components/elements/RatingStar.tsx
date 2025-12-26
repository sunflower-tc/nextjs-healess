import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/system';
import { FC } from 'react';
import ErrorBoundary from '../ErrorBoundary';
type props = {
  defaultValue: number;
  precision: number;
  sx?: SxProps;
  sx2?: SxProps;
  readonly: boolean;
};
export const RatingStar: FC<props> = ({
  defaultValue,
  precision,
  sx,
  sx2,
  readonly,
}) => {
  return (
    <ErrorBoundary>
      <Stack spacing={1} sx={{ ...sx }}>
        {!readonly ? (
          <Rating
            defaultValue={defaultValue}
            precision={precision}
            sx={{ ...sx2 }}
          />
        ) : (
          <Rating
            defaultValue={defaultValue}
            precision={precision}
            sx={{ ...sx2 }}
            readOnly
          />
        )}
      </Stack>
    </ErrorBoundary>
  );
};

import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/system';
import { FC } from 'react';
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
  );
};

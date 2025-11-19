import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/system';
import { FC } from 'react';
type props = {
  defaultValue: number;
  precision: number;
  sx?: SxProps;
  ratingStyle?: SxProps;
  readonly: boolean;
  max: number;
  props: any;
};
export const RatingStar: FC<props> = ({
  defaultValue,
  precision,
  sx,
  ratingStyle,
  readonly,
  max,
  props,
}) => {
  return (
    <Stack spacing={1} sx={{ ...sx }}>
      {!readonly ? (
        <Rating
          {...props}
          max={max ? max : 5}
          defaultValue={defaultValue}
          precision={precision}
          sx={{ ...ratingStyle }}
        />
      ) : (
        <Rating
          {...props}
          max={max ? max : 5}
          defaultValue={defaultValue}
          precision={precision}
          sx={{ ...ratingStyle }}
          readOnly
        />
      )}
    </Stack>
  );
};

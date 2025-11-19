import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
export const PlaceHolder = () => {
  return (
    <Stack gap={1} maxHeight={150}>
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
    </Stack>
  );
};

export default PlaceHolder;

export const LayeredPlaceHolder = () => {
  return (
    <Stack gap={1} maxHeight={150}>
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
    </Stack>
  );
};

import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
export function ImageGalleryPlaceHolder() {
  return (
    <>
      <Stack gap={1} maxHeight={900} className="-mt-20">
        <Skeleton animation="wave" height={800} />
        <Grid className="flex justify-center -mt-28" gap={1}>
          <Skeleton animation="wave" height={100} width={100} />
          <Skeleton animation="wave" height={100} width={100} />
          <Skeleton animation="wave" height={100} width={100} />
        </Grid>
      </Stack>
    </>
  );
}
export default ImageGalleryPlaceHolder;

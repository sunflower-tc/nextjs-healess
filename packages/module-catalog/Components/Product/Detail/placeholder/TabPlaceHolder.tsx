import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
export function TabPlaceHolder() {
  return (
    <>
      <Stack gap={1} className="md:hidden" maxHeight={900}>
        <Skeleton animation="wave" height={50} width={500} />
        <Skeleton animation="wave" height={50} width={500} />
        <Skeleton animation="wave" height={50} width={500} />
      </Stack>
      <Stack gap={1} className="-md:hidden" maxHeight={900}>
        <Grid display="flex" gap={1}>
          <Skeleton animation="wave" height={50} width={100} />
          <Skeleton animation="wave" height={50} width={100} />
          <Skeleton animation="wave" height={50} width={100} />
        </Grid>
        <Skeleton animation="wave" className="-mt-28" height={500} />
      </Stack>
    </>
  );
}
export default TabPlaceHolder;

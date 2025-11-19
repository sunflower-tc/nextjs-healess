import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
export const TopSortPlaceHolder = () => {
  return (
    <>
      <Stack gap={1} className="md:hidden" maxHeight={900}>
        <Skeleton animation="wave" height={40} />
        <Grid display="flex" gap={0.5} maxHeight={200}>
          <Skeleton animation="wave" height={50} width={500} />
          <Skeleton animation="wave" height={50} width={500} />
        </Grid>
      </Stack>
      <Stack gap={1} className="-md:hidden" maxHeight={900}>
        <Grid className="flex justify-between" gap={0.5} maxHeight={200}>
          <Skeleton animation="wave" height={50} width={200} />
          <Grid display="flex" gap={1}>
            <Skeleton animation="wave" height={50} width={200} />
            <Skeleton animation="wave" height={50} width={50} />
            <Skeleton animation="wave" height={50} width={50} />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

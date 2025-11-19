import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
export function DetailsPlaceHolder() {
  return (
    <>
      <Stack
        gap={1}
        className="max-w-full mt-10"
        maxHeight={900}
        maxWidth="100%"
      >
        <Skeleton animation="wave" height={30} width={200} />
        <Skeleton animation="wave" height={30} width={400} />
        <Skeleton animation="wave" height={30} width={300} />
        <Grid className="flex justify-between" gap={1} width={400}>
          <Skeleton animation="wave" height={30} width={100} />
          <Skeleton animation="wave" height={30} width={100} />
        </Grid>
        <Skeleton animation="wave" height={50} width={300} />
        <Skeleton animation="wave" height={50} width={300} />
        <Skeleton animation="wave" height={50} width={300} />
        <Grid
          className="flex items-center justify-between -md:flex-col -md:space-y-5 md:space-x-5"
          gap={1}
          width={400}
        >
          <Skeleton animation="wave" height={100} width={300} />
          <Skeleton animation="wave" height={100} width={300} />
        </Grid>
      </Stack>
    </>
  );
}
export default DetailsPlaceHolder;

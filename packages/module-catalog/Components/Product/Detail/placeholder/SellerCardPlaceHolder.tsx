import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export default function SellerCardPlaceHolder() {
  return (
    <Grid
      className="w-full mt-10 border border-solid rounded-md border-commonBorder"
      gap={1}
      width={400}
    >
      <Grid className="px-4 py-2 border-0 border-b border-solid border-commonBorder">
        <Skeleton className="animate-pulse" height={30} width={100} />
      </Grid>
      <div className="flex items-center justify-between px-4 py-2 ">
        <Grid className="flex items-center justify-center gap-4">
          <Skeleton className="flex w-10 rounded-full py-7 aspect-square animate-pulse" />
          <Grid className="flex flex-col items-center justify-center">
            <Skeleton className="animate-pulse" height={30} width={100} />
            <Skeleton className="animate-pulse" height={30} width={100} />
          </Grid>
        </Grid>
        <Grid className="flex flex-col items-center justify-center">
          <Skeleton className="animate-pulse" height={60} width={80} />
        </Grid>
      </div>
    </Grid>
  );
}

import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Containers from '../../ui/Container';

export function HeaderPlaceHolder() {
  return (
    <Containers>
      <div className="fixed top-0 left-0 z-50 flex items-center justify-between w-full p-1 -mb-24 lg:px-4 bg-neutral-100">
        <Grid className="flex">
          <Grid className="block md:hidden">
            <Skeleton
              className="mt-[-4px]"
              animation="wave"
              height={60}
              width={30}
            />
          </Grid>
          <Grid className="pl-2">
            <Skeleton
              className="mt-0.5 "
              animation="wave"
              height={50}
              width={100}
            />
          </Grid>
          <Grid
            className="flex space-x-3 -md:hidden"
            sx={{ maxWidth: 345, m: 2 }}
          >
            <Skeleton
              animation="wave"
              height={20}
              width={60}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={20}
              width={60}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={20}
              width={60}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={20}
              width={60}
              style={{ marginBottom: 6 }}
            />
          </Grid>
        </Grid>
        <Grid display="flex" className="space-x-2">
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        </Grid>
      </div>
    </Containers>
  );
}

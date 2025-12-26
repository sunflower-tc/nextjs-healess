import { Grid, Skeleton } from '@mui/material';
import Container from '../../ui/Container';

export function HeaderPlaceHolder() {
  return (
    <Container>
      <div className="fixed top-0 left-0 z-50 h-16 flex items-center justify-between w-full p-2 -mb-24 max-w-[100vw] lg:px-4 bg-neutral-100">
        <Grid className="flex">
          <Grid className="block pr-1 md:hidden">
            <Skeleton height={50} width={25} style={{ marginBottom: 6 }} />
          </Grid>
          <Grid>
            <Skeleton height={50} width={86} style={{ marginBottom: 6 }} />
          </Grid>
          <Grid
            className="flex gap-x-3 -md:hidden"
            sx={{ maxWidth: 345, m: 2 }}
          >
            <Skeleton height={20} width={60} style={{ marginBottom: 6 }} />
            <Skeleton height={20} width={60} style={{ marginBottom: 6 }} />
            <Skeleton height={20} width={60} style={{ marginBottom: 6 }} />
            <Skeleton height={20} width={60} style={{ marginBottom: 6 }} />
          </Grid>
        </Grid>
        <Grid display={'flex'} className="flex items-center gap-x-2">
          <Skeleton
            variant="circular"
            className="w-8 h-8 lx:w-9 lg:w-9 lx:h-9 lg:h-9 "
          />
          <Skeleton
            variant="circular"
            className="w-8 h-8 lx:w-9 lg:w-9 lx:h-9 lg:h-9 "
          />
          <Skeleton
            variant="circular"
            className="w-8 h-8 lx:w-9 lg:w-9 lx:h-9 lg:h-9 "
          />
          <Skeleton
            variant="circular"
            className="w-8 h-8 lx:w-9 lg:w-9 lx:h-9 lg:h-9 "
          />
        </Grid>
      </div>
    </Container>
  );
}

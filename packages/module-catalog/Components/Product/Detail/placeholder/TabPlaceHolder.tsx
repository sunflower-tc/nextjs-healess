import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';

export function TabPlaceHolder() {
  return (
    <ErrorBoundary>
      {/* Mobile layout: stacked skeletons */}
      <Stack
        gap={1}
        sx={{ display: { xs: 'flex', md: 'none' }, maxHeight: 900 }}
      >
        <Skeleton animation="wave" height={50} width="100%" />
        <Skeleton animation="wave" height={50} width="100%" />
        <Skeleton animation="wave" height={50} width="100%" />
      </Stack>

      {/* Desktop layout: horizontal skeletons + content */}
      <Stack
        gap={1}
        sx={{ display: { xs: 'none', md: 'flex' }, maxHeight: 900 }}
      >
        <Grid container spacing={1}>
          <Grid item>
            <Skeleton animation="wave" height={50} width={100} />
          </Grid>
          <Grid item>
            <Skeleton animation="wave" height={50} width={100} />
          </Grid>
          <Grid item>
            <Skeleton animation="wave" height={50} width={100} />
          </Grid>
        </Grid>

        <div className="w-full rounded-md h-60 bg-neutral-300 animate-pulse" />
      </Stack>
    </ErrorBoundary>
  );
}

export default TabPlaceHolder;

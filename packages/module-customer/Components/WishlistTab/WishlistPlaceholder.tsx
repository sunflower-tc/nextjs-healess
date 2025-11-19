import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
export const WishlistPlaceholder = () => {
  return (
    <Grid container spacing={2} sx={{ my: 0.5 }}>
      <Grid item lg={3} md={4} sm={4} xs={12}>
        {/*------------ div 1 for product detail---------- */}
        <Box component="div" className="py-1">
          <Skeleton variant="rounded" width="100%" height={150} />
        </Box>
        <Box component="div" className="py-1">
          <Skeleton variant="rounded" width="100%" height={20} />
        </Box>
        <Box component="div" className="py-1">
          <Skeleton variant="rounded" width="50%" height={20} />
        </Box>
      </Grid>
      <Grid item lg={3} md={4} sm={4} xs={12}>
        {/*------------ div 1 for product detail---------- */}
        <Box component="div" className="py-1">
          <Skeleton variant="rounded" width="100%" height={150} />
        </Box>
        <Box component="div" className="py-1">
          <Skeleton variant="rounded" width="100%" height={20} />
        </Box>
        <Box component="div" className="py-1">
          <Skeleton variant="rounded" width="50%" height={20} />
        </Box>
      </Grid>
      <Grid item lg={3} md={4} sm={4} xs={12}>
        {/*------------ div 1 for product detail---------- */}
        <Box component="div" className="py-1">
          <Skeleton variant="rounded" width="100%" height={150} />
        </Box>
        <Box component="div" className="py-1">
          <Skeleton variant="rounded" width="100%" height={20} />
        </Box>
        <Box component="div" className="py-1">
          <Skeleton variant="rounded" width="50%" height={20} />
        </Box>
      </Grid>
      <Grid item lg={3} md={4} sm={4} xs={12}>
        {/*------------ div 1 for product detail---------- */}
        <Box component="div" className="py-1">
          <Skeleton variant="rounded" width="100%" height={150} />
        </Box>
        <Box component="div" className="py-1">
          <Skeleton variant="rounded" width="100%" height={20} />
        </Box>
        <Box component="div" className="py-1">
          <Skeleton variant="rounded" width="50%" height={20} />
        </Box>
      </Grid>
    </Grid>
  );
};

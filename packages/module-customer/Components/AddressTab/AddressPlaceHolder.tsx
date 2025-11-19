import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
const commonStyles = {
  bgcolor: 'background.paper',
  mt: 1,
  border: 1,
  borderRadius: 1,
  borderColor: 'themeAdditional.borderColor',
};
export const AddressPlaceHolder = () => {
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        sx={{ ...commonStyles, px: 2, py: 3 }}
      >
        <Grid item lg={10} md={9} sm={9} xs={8}>
          <Skeleton variant="rounded" sx={{ width: 1 / 2, my: 2 }} />
          <Skeleton variant="rounded" sx={{ width: 1 }} />
        </Grid>
        <Grid item lg={2} md={3} sm={3} xs={4} sx={{ textAlign: 'right' }}>
          <IconButton aria-label="edit">
            <Skeleton variant="rounded" width={40} height={40} />
          </IconButton>
          <IconButton aria-label="delete">
            <Skeleton variant="rounded" width={40} height={40} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        sx={{ ...commonStyles, px: 2, py: 3 }}
      >
        <Grid item lg={10} md={9} sm={9} xs={8}>
          <Skeleton variant="rounded" sx={{ width: 1 / 2, my: 2 }} />
          <Skeleton variant="rounded" sx={{ width: 1 }} />
        </Grid>
        <Grid item lg={2} md={3} sm={3} xs={4} sx={{ textAlign: 'right' }}>
          <IconButton aria-label="edit">
            <Skeleton variant="rounded" width={40} height={40} />
          </IconButton>
          <IconButton aria-label="delete">
            <Skeleton variant="rounded" width={40} height={40} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        sx={{ ...commonStyles, px: 2, py: 3 }}
      >
        <Grid item lg={10} md={9} sm={9} xs={8}>
          <Skeleton variant="rounded" sx={{ width: 1 / 2, my: 2 }} />
          <Skeleton variant="rounded" sx={{ width: 1 }} />
        </Grid>
        <Grid item lg={2} md={3} sm={3} xs={4} sx={{ textAlign: 'right' }}>
          <IconButton aria-label="edit">
            <Skeleton variant="rounded" width={40} height={40} />
          </IconButton>
          <IconButton aria-label="delete">
            <Skeleton variant="rounded" width={40} height={40} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

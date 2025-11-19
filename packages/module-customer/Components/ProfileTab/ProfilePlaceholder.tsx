import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
export const ProfilePlaceholder = () => {
  return (
    <Grid
      container
      sx={{
        px: 3,
        py: 1,
        border: '1px solid',
        borderColor: 'themeAdditional.borderColor',
      }}
    >
      <Grid item lg={4} md={5} xs={6} sx={{ py: 1 }}>
        <Skeleton sx={{ width: 1 / 2 }} height={30} />
      </Grid>

      <Grid item lg={8} md={7} xs={6} sx={{ mt: 1.5 }}>
        <Skeleton sx={{ width: 1 / 2 }} height={30} />
      </Grid>
      <Grid item lg={4} md={5} xs={6} sx={{ py: 1 }}>
        <Skeleton sx={{ width: 1 / 2 }} height={30} />
      </Grid>

      <Grid item lg={8} md={7} xs={6} sx={{ mt: 1.5 }}>
        <Skeleton sx={{ width: 1 / 2 }} height={30} />
      </Grid>
      <Grid item lg={4} md={5} xs={6} sx={{ py: 1 }}>
        <Skeleton sx={{ width: 1 / 2 }} height={30} />
      </Grid>

      <Grid item lg={8} md={7} xs={6} sx={{ mt: 1.5 }}>
        <Skeleton sx={{ width: 1 / 2 }} height={30} />
      </Grid>
      <Grid item lg={4} md={5} xs={6} sx={{ py: 1 }}>
        <Skeleton sx={{ width: 1 / 2 }} height={30} />
      </Grid>

      <Grid item lg={8} md={7} xs={6} sx={{ mt: 1.5 }}>
        <Skeleton sx={{ width: 1 / 2 }} height={30} />
      </Grid>
      <Grid item lg={4} md={5} xs={6} sx={{ py: 1 }}>
        <Skeleton sx={{ width: 1 / 2 }} height={30} />
      </Grid>

      <Grid item lg={8} md={7} xs={6} sx={{ mt: 1.5 }}>
        <Skeleton sx={{ width: 1 / 2 }} height={30} />
      </Grid>
    </Grid>
  );
};

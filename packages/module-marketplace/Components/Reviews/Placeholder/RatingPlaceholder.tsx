import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
export const RatingPlaceholder = () => {
  const ratingPlaceHolder = new Array(5).fill(0);
  return (
    <Grid
      item
      pl={{ xs: '0rem', sm: '2rem', md: '2rem', lg: '4rem' }}
      borderLeft={{ xs: 'none', sm: 1, md: 1 }}
      borderColor={{ xs: 'none', sm: 'divider', md: 'divider' }}
      xs={12}
      md={5.5}
      lg={4.5}
      sm={4.5}
      sx={{ maxHeight: { xs: 'unset', sm: 600, lg: 600 } }}
    >
      <Skeleton
        animation="wave"
        variant="text"
        width="100%"
        sx={{ fontSize: '2rem', marginTop: 1 }}
      />
      <Grid
        item
        container
        gap={1.5}
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          marginBottom: '1rem',
          paddingBottom: '1rem',
        }}
        xs="auto"
      >
        <Grid item container xs="auto">
          <Skeleton
            animation="wave"
            variant="circular"
            height={120}
            width={120}
          />
        </Grid>
        <Grid item container xs={7.25} sm={7.5} md={6} lg={7}>
          <Skeleton
            animation="wave"
            variant="text"
            width="100%"
            sx={{ fontSize: '1rem' }}
          />
          <Skeleton
            animation="wave"
            variant="text"
            width="100%"
            sx={{ fontSize: '1rem', marginTop: -1 }}
          />
          <Skeleton
            animation="wave"
            variant="text"
            width="100%"
            sx={{
              fontSize: '1.75rem',
              marginTop: -0.75,
            }}
          />
        </Grid>
      </Grid>
      {ratingPlaceHolder.map((item, index) => (
        <Skeleton
          key={`${item + index}`}
          animation="wave"
          variant="text"
          width="100%"
          sx={{ fontSize: '3rem', marginBottom: -1.5 }}
        />
      ))}
    </Grid>
  );
};

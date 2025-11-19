import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
export const ReviewPlaceholder = () => {
  const placeHolder = new Array(10).fill(0);
  return (
    <Grid
      pt={{ xs: '0rem', md: '3rem' }}
      item
      xs={12}
      md={6.5}
      lg={7.5}
      sm={7.5}
      pr={{ xs: '0rem', sm: '2.5rem', md: '2.5rem', lg: '3.5rem' }}
    >
      {placeHolder.map((item, index) => (
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
          key={`${item + index}`}
        >
          <Grid item container xs="auto">
            <Skeleton
              animation="wave"
              variant="circular"
              height={50}
              width={50}
            />
          </Grid>
          <Grid item container xs={9.5} sm={10.875}>
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
              sx={{ fontSize: '1rem' }}
            />
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              sx={{ fontSize: '1rem', marginTop: 1 }}
            />
          </Grid>
        </Grid>
      ))}
      <Skeleton
        animation="wave"
        variant="text"
        width="100%"
        sx={{
          fontSize: '3rem',
          marginTop: -2,
        }}
      />
    </Grid>
  );
};

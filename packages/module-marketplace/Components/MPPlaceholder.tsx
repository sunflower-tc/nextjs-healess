import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Containers from '@voguish/module-theme/components/ui/Container';

export const MPPlaceholder = () => {
  const muiTheme = useTheme();
  const placeHolderThree = new Array(3).fill(0);
  const placeHolderFour = new Array(4).fill(0);

  return (
    <>
      {/* Seller Banner Placeholder */}
      <>
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{ height: { xs: 250, sm: 309 } }}
          width="100%"
        />
      </>
      <Containers>
        {/* MP Steps Placeholder */}
        <>
          <Skeleton
            variant="text"
            sx={{ fontSize: '1.5rem', marginY: { xs: '20px', sm: '32px' } }}
          />
          <Grid
            container
            columnGap={{ sm: 2, md: 3, lg: 2.125 }}
            rowGap={{ xs: 2, sm: 3 }}
            justifyContent="center"
          >
            <Grid
              container
              px="0.5rem"
              gap={{ xs: '20px', sm: '32px' }}
              alignItems="center"
            >
              {placeHolderFour.map((item, index) => (
                <Grid
                  item
                  key={`${index + item}`}
                  container
                  xs={12}
                  sm={5}
                  md={4}
                  lg={2.75}
                  gap={1}
                  padding={2}
                  border={`1px solid ${muiTheme.palette.divider}`}
                  borderRadius={1}
                >
                  <Grid item container xs="auto">
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      height={46}
                      width={46}
                    />
                  </Grid>
                  <Grid item container xs={9}>
                    <Skeleton
                      variant="text"
                      width="100%"
                      sx={{ fontSize: '1.5rem' }}
                    />
                  </Grid>
                </Grid>
              ))}
            </Grid>
            {placeHolderThree.map((item, index) => (
              <Grid
                item
                container
                key={`${index + item}`}
                xs={10}
                lg={2.875}
                sm={5}
              >
                <Card sx={{ maxHeight: 416, width: '100%' }}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{ height: 300 }}
                    width="100%"
                  />
                  <Grid container px="0.5rem" gap="0.5rem" alignItems="center">
                    <Grid item container xs="auto">
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        height={86}
                        width={86}
                      />
                    </Grid>
                    <Grid item container xs={7.75} direction="column">
                      <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                      <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                      <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>

        {/* Seller Page Content Placeholder */}
        <>
          <Skeleton
            variant="text"
            sx={{ fontSize: '1.5rem', marginTop: { xs: '20px', sm: '32px' } }}
          />
          {placeHolderFour.map((item, index) => (
            <Grid
              container
              gap={{ xs: 2, sm: 0 }}
              key={`${index + item}`}
              justifyContent="center"
              alignItems="center"
              display="flex"
              sx={{
                '&:nth-of-type(even)': {
                  flexDirection: { sm: 'row-reverse' },
                },
              }}
            >
              <Grid item xs={12} sm={4.25}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  sx={{ height: { xs: '250px', sm: '317px' } }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={7.75}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                padding={{ xs: 0, sm: 4 }}
                gap={2}
              >
                <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                <Skeleton
                  variant="text"
                  sx={{ marginTop: -4, fontSize: '10rem' }}
                />
              </Grid>
            </Grid>
          ))}
        </>

        {/* 4 Sellers Section Placeholder */}
        <>
          <Skeleton
            variant="text"
            sx={{
              fontSize: '1.5rem',
              marginTop: { xs: '20px', sm: '32px' },
              marginBottom: '20px',
            }}
          />

          <Skeleton
            variant="text"
            sx={{ fontSize: '1.5rem', marginY: { xs: '20px', sm: '32px' } }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: '2rem', marginY: { xs: '20px', sm: '32px' } }}
          />
        </>
      </Containers>
    </>
  );
};

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IMPProcess } from '@voguish/module-marketplace';

const SellerMPRunProcess = ({
  processData,
  label,
}: {
  processData?: IMPProcess[];
  label?: string | undefined | null;
}) => {
  return (
    <>
      {processData && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={4}
          width="100%"
          padding="44px 0 0"
        >
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight="fontWeightBold"
          >
            {label}
          </Typography>
          <Grid
            container
            gap={{ xs: 2, sm: 5, lg: '2rem' }}
            width={{ xs: '100%', sm: '90%', lg: '98%' }}
            justifyContent={{
              xs: 'none',
              sm: 'space-between',
              lg: 'space-between',
            }}
            ml={{ lg: 'auto' }}
          >
            {processData.map((process, index) => (
              <Grid
                item
                container
                key={process.label}
                borderRadius={1.5}
                boxShadow="0 0 4px rgba(0, 0, 0, 0.15)"
                xs={12}
                marginLeft={{ xs: 2, sm: '0' }}
                gap={3}
                sm={5.5}
                lg={2.0675}
                padding={{ xs: '12px 0', sm: '24px 0' }}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent={{
                  xs: 'unset',
                  sm: 'space-between',
                  lg: 'unset',
                }}
              >
                <Grid
                  item
                  xs="auto"
                  sm="auto"
                  color="#d9efff"
                  marginLeft={{ sm: 0, lg: -3.0625, xs: -2.75 }}
                  justifyContent={{
                    xs: 'unset',
                    sm: 'space-between',
                    lg: 'unset',
                  }}
                >
                  <Typography variant="ProcessStep" lineHeight="1">
                    {index + 1}
                  </Typography>
                </Grid>
                <Grid item xs="auto" sm={7}>
                  <Typography
                    textTransform="capitalize"
                    variant="body1"
                    fontWeight="500.3"
                  >
                    {process.label}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};
export default SellerMPRunProcess;

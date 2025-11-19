import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BannerThumbnail, IMPProcess } from '@voguish/module-marketplace';
const SellerProcess = ({
  processData,
  label,
}: {
  processData: IMPProcess[];
  label: string;
}) => {
  const muiTheme = useTheme();
  return (
    <>
      {processData && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            component="h2"
            fontWeight="fontWeightBold"
            className="py-[4rem] text-[1.375rem] leading-6"
          >
            {label}
          </Typography>
          <Grid
            container
            className="flex flex-col w-full sm:grid xs:justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            gap={{ xs: 2 }}
          >
            {processData.map((process) => (
              <Grid
                item
                className="flex min-w-full p-3 flex-nowrap"
                container
                gap="10px"
                key={process.label}
                alignItems="center"
                sx={{
                  borderRadius: '8px',
                  border: `1px solid ${muiTheme.typography.caption.color} `,
                }}
              >
                <Stack
                  height="44px"
                  width="44px"
                  position="relative"
                  borderRadius="4px"
                >
                  <BannerThumbnail
                    thumbnail={process.image}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="i"
                  />
                </Stack>
                <Stack>
                  <Typography
                    variant="body1"
                    className="font-medium leading-5"
                    component="span"
                  >
                    {process.label}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};
export default SellerProcess;

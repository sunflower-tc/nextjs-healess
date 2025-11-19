import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
export const PlaceHolder = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ mt: 1 }}>
        <Paper variant="outlined" sx={{ p: 1 }}>
          <Stack direction="row">
            <Box component="div" sx={{ p: 1 }}>
              <Skeleton variant="rounded" height={77} width={77}></Skeleton>
            </Box>
            <Box component="div" width={300}>
              <Skeleton variant="rounded" sx={{ my: 2, width: 1 / 2 }} />
              <Skeleton variant="rounded" sx={{ width: 1 }} />
            </Box>
          </Stack>
        </Paper>
      </Grid>

      {[...Array(4)].map((x, i) => (
        <Grid key={i} item lg={4} md={6} sm={6} xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row">
              <Box component="div">
                <Skeleton variant="rounded" width={20} />
              </Box>
              <Box component="div" width={700} sx={{ px: 1 }}>
                <Skeleton variant="rounded" height={24} />
                <Skeleton variant="rounded" sx={{ my: 0.5, width: 1 }} />
                <Skeleton variant="rounded" />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

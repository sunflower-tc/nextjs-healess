import { Trans } from '@lingui/macro';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
const SearchOffIcon = dynamic(() => import('@mui/icons-material/SearchOff'));

export const NoAddress = () => {
  return (
    <Grid container justifyContent="space-between" sx={{ px: 2, py: 3 }}>
      <Grid item lg={12} md={12} textAlign="center" sm={12} xs={12}>
        <Box component="div">
          <SearchOffIcon sx={{ fontSize: 200, color: 'green' }} />
        </Box>
        <Typography variant="h4">
          <Trans>No Address found!</Trans>
        </Typography>
      </Grid>
    </Grid>
  );
};

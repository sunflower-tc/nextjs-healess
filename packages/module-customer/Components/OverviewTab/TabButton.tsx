import { Trans } from '@lingui/macro';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const ListAltOutlinedIcon = dynamic(
  () => import('@mui/icons-material/ListAltOutlined')
);
const EditNoteIcon = dynamic(() => import('@mui/icons-material/EditNote'));
const FavoriteBorderIcon = dynamic(
  () => import('@mui/icons-material/FavoriteBorder')
);
const PermIdentityIcon = dynamic(
  () => import('@mui/icons-material/PermIdentity')
);
const PaidOutlinedIcon = dynamic(
  () => import('@mui/icons-material/PaidOutlined')
);
const TabButton = () => {
  return (
    <Grid
      container
      className="gap-3 my-2 grid grid-cols-3 -lg:grid-cols-2 -xs:grid-cols-1"
    >
      <Grid item component={Link} href="/wishlist">
        <Paper
          variant="outlined"
          className="hover:shadow-lg group min-h-full"
          sx={{ p: 2 }}
        >
          <Stack direction="row">
            <Box component="div" sx={{ mt: 0.5, color: '#000' }}>
              <FavoriteBorderIcon />
            </Box>
            <Box component="div" sx={{ px: 1 }}>
              <Typography
                variant="subtitle1"
                className="group-hover:text-brand"
              >
                <Trans> Wishlist</Trans>
              </Typography>
              <Typography variant="body2">
                <Trans>Handpicked products in your Personal Wishlist</Trans>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>
      <Grid item component={Link} href="/sales/order/history/">
        <Paper
          variant="outlined"
          className="hover:shadow-lg min-h-full"
          sx={{ p: 2, '&:hover': { color: '#24ab85' } }}
        >
          <Stack direction="row">
            <Box component="div" sx={{ mt: 0.5, color: '#000' }}>
              <ListAltOutlinedIcon />
            </Box>
            <Box component="div" sx={{ px: 1 }}>
              <Typography variant="subtitle1">Order</Typography>
              <Typography variant="body2">
                <Trans>
                  Track, manage, and revisit your shopping orders history
                </Trans>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>
      <Grid item component={Link} href="/customer/account/address/">
        <Paper
          variant="outlined"
          sx={{ p: 2, '&:hover': { color: '#24ab85' } }}
          className="hover:shadow-lg min-h-full"
        >
          <Stack direction="row">
            <Box component="div" sx={{ mt: 0.5, color: '#000' }}>
              <EditNoteIcon />
            </Box>
            <Box component="div" sx={{ px: 1 }}>
              <Typography variant="subtitle1">
                <Trans>Address</Trans>
              </Typography>
              <Typography variant="body2">
                <Trans>
                  Address Update and manage your preferred addresses
                </Trans>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>
      <Grid item component={Link} href="/customer/account/profile/">
        <Paper
          variant="outlined"
          sx={{ p: 2, '&:hover': { color: '#24ab85' } }}
          className="hover:shadow-lg min-h-full"
        >
          <Stack direction="row">
            <Box component="div" sx={{ mt: 0.5, color: '#000' }}>
              <PermIdentityIcon />
            </Box>
            <Box component="div" sx={{ px: 1 }}>
              <Typography variant="subtitle1">
                <Trans>Profile</Trans>
              </Typography>
              <Typography variant="body2">
                <Trans>Manage profile for enhanced shopping experience</Trans>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default TabButton;

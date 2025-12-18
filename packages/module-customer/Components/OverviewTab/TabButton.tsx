import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
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

const TabButton = () => {
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      <Grid
        container
        className="grid grid-cols-3 gap-3 my-2 -lg:grid-cols-2 -xs:grid-cols-1"
      >
        <Grid item component={Link} href="/wishlist">
          <Paper
            variant="outlined"
            className="min-h-full hover:shadow-lg group"
            sx={{ p: 2 }}
          >
            <Stack direction="row">
              <Box component="div" sx={{ mt: 0.5, color: '#000' }}>
                <FavoriteBorderIcon />
              </Box>
              <Box component="div" sx={{ px: 1 }}>
                <Typography
                  variant="subtitle1"
                  className="group-hover:text-brand text-brand"
                >
                  {t('Wishlist')}
                </Typography>
                <Typography variant="body2">
                  {t('Handpicked products in your Personal Wishlist')}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item component={Link} href="/sales/order/history/">
          <Paper
            variant="outlined"
            className="min-h-full hover:shadow-lg"
            sx={{ p: 2, '&:hover': { color: '#24ab85' } }}
          >
            <Stack direction="row">
              <Box component="div" sx={{ mt: 0.5, color: '#000' }}>
                <ListAltOutlinedIcon />
              </Box>
              <Box component="div" sx={{ px: 1 }}>
                <Typography
                  className="group-hover:text-brand  text-brand"
                  variant="subtitle1"
                >
                  {t('Orders')}
                </Typography>
                <Typography variant="body2">
                  {t('Track, manage, and revisit your shopping orders history')}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item component={Link} href="/customer/account/address/">
          <Paper
            variant="outlined"
            sx={{ p: 2, '&:hover': { color: '#24ab85' } }}
            className="min-h-full hover:shadow-lg"
          >
            <Stack direction="row">
              <Box component="div" sx={{ mt: 0.5, color: '#000' }}>
                <EditNoteIcon />
              </Box>
              <Box component="div" sx={{ px: 1 }}>
                <Typography
                  className="group-hover:text-brand text-brand"
                  variant="subtitle1"
                >
                  {t('Address')}
                </Typography>
                <Typography variant="body2">
                  {t('Address Update and manage your preferred addresses')}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item component={Link} href="/customer/account/profile/">
          <Paper
            variant="outlined"
            sx={{ p: 2, '&:hover': { color: '#24ab85' } }}
            className="min-h-full hover:shadow-lg"
          >
            <Stack direction="row">
              <Box component="div" sx={{ mt: 0.5, color: '#000' }}>
                <PermIdentityIcon />
              </Box>
              <Box component="div" sx={{ px: 1 }}>
                <Typography
                  className="group-hover:text-brand text-brand"
                  variant="subtitle1"
                >
                  {t('Profile')}
                </Typography>
                <Typography variant="body2">
                  {t('Manage profile for enhanced shopping experience')}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </ErrorBoundary>
  );
};
export default TabButton;

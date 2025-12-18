import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { BRAND_HEX_CODE } from '@utils/Constants';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
const SearchOffIcon = dynamic(() => import('@mui/icons-material/SearchOff'));

export const NoAddress = () => {
  const { t } = useTranslation('common');

  return (
    <Grid container justifyContent="space-between" sx={{ px: 2, py: 3 }}>
      <Grid item lg={12} md={12} textAlign="center" sm={12} xs={12}>
        <Box component="div">
          <SearchOffIcon sx={{ fontSize: 200, color: BRAND_HEX_CODE }} />
        </Box>
        <Typography variant="h4">{t('No Address found!')}</Typography>
      </Grid>
    </Grid>
  );
};

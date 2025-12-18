import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
export const NoOrderProduct = () => {
  const { t } = useTranslation('common');

  return (
    <Grid item xs={12} sx={{ p: 2 }}>
      <Typography variant="body2" sx={{ my: 3 }}>
        {t('You haven placed any orders yet.')}
      </Typography>
      <Button
        className="bg-brand rounded-[unset]"
        variant="contained"
        component={Link}
        href="/"
      >
        {t('Start Shopping')}
      </Button>
    </Grid>
  );
};

import { Trans } from '@lingui/macro';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
export const NoOrderProduct = () => {
  return (
    <Grid item xs={12} sx={{ p: 2 }}>
      <Typography variant="body2" sx={{ my: 3 }}>
        <Trans>You haven placed any orders yet.</Trans>
      </Typography>
      <Button
        className="bg-brand rounded-[unset]"
        variant="contained"
        component={Link}
        href="/"
      >
        <Trans>Start Shopping</Trans>
      </Button>
    </Grid>
  );
};

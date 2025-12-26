import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CartAddressInterface } from '@voguish/module-quote/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
const AddressCard = ({ address }: { address: CartAddressInterface }) => {
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      <Grid
        className="rounded-md"
        sx={{ height: '84%', backgroundColor: '#F3F3F3' }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 16, fontWeight: 500 }}
            color="text.main"
            gutterBottom
            variant="subtitle1"
          >
            {`${address.firstname} ${address.lastname}`}
          </Typography>
          <Typography
            sx={{ fontSize: 16, fontWeight: 500 }}
            variant="subtitle1"
            color="text.main"
          >
            {address.street}
            <br />
            {address.city}
            <br />
            {address.region.label}, {address.country.label}
            <br />
            {t('Mobile :')} {address.telephone}
          </Typography>
        </CardContent>
      </Grid>
    </ErrorBoundary>
  );
};

export default AddressCard;

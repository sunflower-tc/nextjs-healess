import { Trans } from '@lingui/macro';
import { Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CartAddressInterface } from '@voguish/module-quote/types';

const AddressCard = ({ address }: { address: CartAddressInterface }) => {
  return (
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
          <Trans>Mobile :</Trans> {address.telephone}
        </Typography>
      </CardContent>
    </Grid>
  );
};

export default AddressCard;

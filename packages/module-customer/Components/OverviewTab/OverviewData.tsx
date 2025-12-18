import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import dynamic from 'next/dynamic';
const AccountBoxIcon = dynamic(() => import('@mui/icons-material/AccountBox'));
type dataType = {
  data: {
    customer: {
      firstname: string;
      lastname?: string;
      email: string;
    };
  };
};
const OverviewData = ({ data }: dataType) => {
  const userData = data?.customer;
  return (
    <ErrorBoundary>
      <Grid
        container
        className="items-center break-all pt-[6px]  gap-2 -xs:gap-5 flex -xs:grid -xs:grid-cols-12"
      >
        <span className="text-black -xs:col-span-3">
          <AccountBoxIcon sx={{ fontSize: 70 }} />
        </span>
        <span className="grid -xs:col-span-9">
          <Typography variant="body2">
            {userData?.firstname || ''}
            {userData?.lastname || ''}
          </Typography>
          <Typography variant="body2">{userData?.email || ''}</Typography>
        </span>
      </Grid>
    </ErrorBoundary>
  );
};
export default OverviewData;

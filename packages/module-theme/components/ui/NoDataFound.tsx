import { Trans, t } from '@lingui/macro';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { NoData } from '../elements';

export interface INODataFound {
  text?: string;
}

export default function NoDataFound({ text }: INODataFound) {
  return (
    <span className="flex flex-col items-center justify-center py-5 space-y-2">
      <NoData />
      <Typography variant="ErrorHeading" component="h2">
        {text ? text : t`No Data Found`}
      </Typography>
      <Typography variant="ErrorSubHeading" className="-xs:text-base">
        <Trans>No return, No Exchange - All Sales Final.</Trans>
      </Typography>
      <Link href="/">
        <Button
          variant="contained"
          className="w-full py-[13px] px-[38px]  rounded-none shadow-none"
          type="submit"
        >
          <Trans>Go To Home</Trans>
        </Button>
      </Link>
    </span>
  );
}

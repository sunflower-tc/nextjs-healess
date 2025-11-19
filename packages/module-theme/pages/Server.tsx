import { Trans } from '@lingui/macro';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ServerErrorIcon } from '@voguish/module-theme';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Containers from '../components/ui/Container';

export default function Server() {
  const route = useRouter();
  const onClick = (e: any) => {
    e.preventDefault();
    route.back();
  };
  return (
    <Containers>
      <div className="relative flex flex-col items-center justify-center h-screen max-w-2xl mx-auto mt-28">
        <div className="h-full gap-4 py-10 mx-auto text-center ">
          <ServerErrorIcon />
          <span className="grid py-6">
            <Typography variant="ErrorHeading">
              <Trans>500 Error!</Trans>{' '}
            </Typography>
            <Typography variant="ErrorSubHeading">
              <Trans>Internal Server Error</Trans>
            </Typography>
          </span>
          <span className="w-[85%]">
            <Button
              onClick={onClick}
              variant="contained"
              className="w-full py-4"
            >
              <Trans>Go Back</Trans>
            </Button>
          </span>
          <Link href="/" className="w-[85%]">
            <Button
              color="secondary"
              variant="outlined"
              className="w-full py-4 mx-auto my-10"
              type="submit"
            >
              <Trans>Go To Home</Trans>
            </Button>
          </Link>
        </div>
      </div>
    </Containers>
  );
}

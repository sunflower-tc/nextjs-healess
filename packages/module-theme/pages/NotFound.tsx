import { Trans } from '@lingui/macro';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NotFountIcon } from '@voguish/module-theme';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Containers from '../components/ui/Container';
export default function NotFoundError() {
  const route = useRouter();
  const onClick = (e: any) => {
    e.preventDefault();
    route.back();
  };
  return (
    <Containers>
      <div className="relative flex flex-col items-center justify-center max-w-2xl min-h-screen mx-auto mt-28">
        <div className="h-full gap-4 py-10 mx-auto text-center ">
          <NotFountIcon />
          <span className="grid py-6">
            <Typography variant="ErrorHeading">
              <Trans>404 Error!</Trans>
            </Typography>
            <Typography variant="ErrorSubHeading">
              <Trans>
                Whoops, our bad! The page you &apo; re looking for does not
                exist.
              </Trans>
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

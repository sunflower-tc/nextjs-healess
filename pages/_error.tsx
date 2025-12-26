import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ServerErrorIcon } from '@voguish/module-theme/components/elements/Icon';
import Containers from '@voguish/module-theme/components/ui/Container';
import { PageOptions } from '@voguish/module-theme/page';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
function Error(statusCode: string | number) {
  const route = useRouter();
  const onClick = (e: any) => {
    e.preventDefault();
    route.back();
  };
  const { t } = useTranslation('common');

  return (
    <Containers>
      <div className="relative flex flex-col items-center justify-center h-screen max-w-2xl mx-auto mt-28">
        <div className="h-full gap-4 py-10 mx-auto text-center ">
          <ServerErrorIcon />
          <span className="grid py-6">
            <Typography variant="ErrorHeading">500 Error! </Typography>
            <Typography variant="ErrorSubHeading">
              {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
            </Typography>
          </span>
          <span className="w-[85%]">
            <Button
              onClick={onClick}
              variant="contained"
              className="w-full py-4"
            >
              {' '}
              {t('Go Back')}
            </Button>
          </span>
          <Link href="/" className="w-[85%]">
            <Button
              color="secondary"
              variant="outlined"
              className="w-full py-4 mx-auto my-10"
              type="submit"
            >
              {' '}
              {t('Go To Home')}
            </Button>
          </Link>
        </div>
      </div>
    </Containers>
  );
}

Error.getInitialProps = (res: any, err: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

const pageProps: PageOptions = {
  title: 'An error occurred',
};
Error.pageOptions = pageProps;

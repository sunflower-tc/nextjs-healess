import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ServerErrorIcon } from '../components/elements/Icon';
import Containers from '../components/ui/Container';
export default function Server() {
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
            <Typography variant="ErrorHeading">{t('500 Error!')}</Typography>
            <Typography variant="ErrorSubHeading">
              {t('Internal Server Error')}
            </Typography>
          </span>
          <span className="w-[85%]">
            <Button
              onClick={onClick}
              variant="contained"
              className="w-full py-4"
            >
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
              {t('Go To Home')}
            </Button>
          </Link>
        </div>
      </div>
    </Containers>
  );
}

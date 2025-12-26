import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { NoData } from '../elements/Icon';
export interface INODataFound {
  text?: string;
}

export default function NoDataFound({ text }: INODataFound) {
  const { t } = useTranslation('common');

  return (
    <span className="flex flex-col items-center justify-center py-5 space-y-2">
      <NoData />
      <Typography variant="ErrorHeading" component="h2">
        {text ? text : t('No Data Found')}
      </Typography>
      <Typography variant="ErrorSubHeading" className="-xs:text-base">
        {t('No return, No Exchange - All Sales Final.')}
      </Typography>
      <Link href="/" passHref>
        <Button
          variant="contained"
          className="w-full py-[13px] px-[38px]  rounded-none shadow-none"
          type="submit"
        >
          {t('Go To Home')}
        </Button>
      </Link>
    </span>
  );
}

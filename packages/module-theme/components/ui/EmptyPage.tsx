import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { EmptyPageIcon } from '../elements/Icon';
export default function EmptyPage() {
  const { t } = useTranslation('common');

  return (
    <div className="relative flex flex-col items-center justify-center h-[60vh] max-w-2xl mx-auto mt-28">
      <div className="h-full gap-4 py-10 mx-auto text-center ">
        <EmptyPageIcon />
        <span className="grid py-6">
          <Typography variant="ErrorHeading" className="-xs:text-lg">
            {t('Oops! There are no products here.')}
          </Typography>
          <Typography variant="ErrorSubHeading" className="-xs:text-base">
            {t('Please discover new products here.')}
          </Typography>
        </span>
        <Link href="/" className="w-[85%]">
          <Button
            variant="contained"
            className="w-full py-4 rounded-none shadow-none"
            type="submit"
          >
            {t('Go To Home')}
          </Button>
        </Link>
      </div>
    </div>
  );
}

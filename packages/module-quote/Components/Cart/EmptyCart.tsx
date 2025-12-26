import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
export function EmptyCart({ onClose }: { onClose?: () => void }) {
  const { t } = useTranslation('common');
  return (
    <ErrorBoundary>
      <div className="flex flex-col text-center items-center h-full justify-center max-w-[90%] mx-auto gap-4 py-10">
        <Box className="grid">
          <Box className="m-auto bg-[#EFF9FB] -sm:h-[7.5rem] -sm:w-[7.5rem] h-60 w-60 flex items-center justify-center rounded-full">
            <ShoppingCartOutlinedIcon className="text-[120px] ml-2 -md:ml-0 text-brand -sm:text-[60px]" />
          </Box>
        </Box>
        <span className="grid py-4">
          <Typography variant="ErrorHeading" className="-xs:text-lg">
            {t('Your cart is empty!')}
          </Typography>
          <Typography
            variant="ErrorSubHeading"
            className="capitalize -xs:text-base"
          >
            {t("Look's Like You Haven't Made Your Choice Yet..")}
          </Typography>
        </span>
        <Link onClick={onClose} href="/" className="w-[85%]">
          <Button
            variant="contained"
            className="w-full max-w-xs py-4 rounded-none shadow-none"
          >
            {t('Continue Shopping')}
          </Button>
        </Link>
      </div>
    </ErrorBoundary>
  );
}

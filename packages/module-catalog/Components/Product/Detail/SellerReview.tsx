import Typography from '@mui/material/Typography';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
const StarRoundedIcon = dynamic(
  () => import('@mui/icons-material/StarRounded')
);
const Box = dynamic(() => import('@mui/material/Box'));
const CircularProgress = dynamic(
  () => import('@mui/material/CircularProgress')
);
const Stack = dynamic(() => import('@mui/material/Stack'));

const SellerReview = ({ totalRating }: { totalRating: string }) => {
  const { t } = useTranslation('common');

  return (
    <div className="p-2 backdrop-blur-sm">
      <Typography
        className="flex items-center justify-center py-2"
        variant="OverallRating"
      >
        {t('Overall Rating')}
      </Typography>
      <Stack className="flex flex-row gap-4 pb-4">
        <Stack>
          <ErrorBoundary>
            <Box className="relative inline-flex">
              <CircularProgress
                size={120}
                variant="determinate"
                value={(-parseInt(totalRating) / 5) * 100}
              />
              <Box className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                <StarRoundedIcon className="text-[3.875rem] text-[#FFC930]" />
              </Box>
            </Box>
          </ErrorBoundary>
        </Stack>
        <ErrorBoundary>
          <Stack className="flex justify-center">
            <Typography
              variant="body1"
              className="border-0 border-b border-white border-solid"
            >
              {totalRating} {t('out of 5')}
            </Typography>
            <Typography variant="body2" className="pt-1 pb-2 text-white">
              {t('Based on users reviews')}
            </Typography>
          </Stack>
        </ErrorBoundary>
      </Stack>
    </div>
  );
};
export default SellerReview;

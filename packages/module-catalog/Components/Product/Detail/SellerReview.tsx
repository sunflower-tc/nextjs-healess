import { Trans } from '@lingui/macro';
import Typography from '@mui/material/Typography';
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
  return (
    <div className="p-2 backdrop-blur-sm">
      <Typography
        className="flex items-center justify-center py-2"
        variant="OverallRating"
      >
        <Trans>Overall Rating</Trans>
      </Typography>
      <Stack className="flex flex-row gap-4 pb-4">
        <Stack>
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
        </Stack>
        <Stack className="flex justify-center">
          <Typography
            variant="body1"
            className="border-0 border-b border-white border-solid"
          >
            {totalRating} <Trans>out of 5</Trans>
          </Typography>
          <Typography variant="body2" className="pt-1 pb-2 text-white">
            <Trans>Based on users reviews</Trans>
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};
export default SellerReview;

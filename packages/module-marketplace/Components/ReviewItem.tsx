import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getFormattedDate, stringAvatar } from '@utils/Helper';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import { ISellerReviewsItems } from '../type';

export const ReviewItem = ({ review }: ReviewProps) => {
  const { t } = useTranslation('common');

  let totalRating =
    (parseInt(review.feed_price) || 0) +
    (parseInt(review.feed_quality) || 0) +
    (parseInt(review.feed_value) || 0);
  totalRating = totalRating > 0 ? Math.round((totalRating / 60) * 10) / 10 : 0;
  const muiTheme = useTheme();
  return (
    <ErrorBoundary>
      <Stack className="gap-3 pt-8 pb-6 border-0 border-b border-solid lg:pr-8 border-commonBorder">
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar {...stringAvatar(review.feed_nickname || '')} />
          <Box sx={{ width: '100%' }}>
            <Stack>
              <Stack direction="row" justifyContent="space-between">
                <Stack>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={muiTheme.palette.common.black}
                  >
                    {review.feed_nickname !== null
                      ? review.feed_nickname
                      : t('Guest')}
                  </Typography>
                  <Rating
                    size="small"
                    name="review"
                    value={totalRating}
                    readOnly
                  />
                </Stack>
                <Typography variant="caption">
                  {getFormattedDate(review.created_at)}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <Stack ml={8}>
          <Typography variant="body2">{review.feed_review}</Typography>
        </Stack>
      </Stack>
    </ErrorBoundary>
  );
};

interface ReviewProps {
  review: ISellerReviewsItems;
}

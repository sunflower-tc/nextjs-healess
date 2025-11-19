import { t } from '@lingui/macro';
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getFormattedDate } from '@utils/Helper';
import { ISellerReviewsItems } from '@voguish/module-marketplace';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const getInitials = (name: string) => {
  const initials = name
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('');

  return initials;
};

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 50,
      height: 50,
    },
    children: getInitials(name),
  };
}

export const ReviewItem = ({ review }: ReviewProps) => {
  let totalRating =
    (parseInt(review.feed_price) || 0) +
    (parseInt(review.feed_quality) || 0) +
    (parseInt(review.feed_value) || 0);
  totalRating = totalRating > 0 ? Math.round((totalRating / 60) * 10) / 10 : 0;
  const muiTheme = useTheme();
  return (
    <Stack
      gap={1.5}
      pr={{ lg: '2rem' }}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        paddingTop: '2rem',
        paddingBottom: '1.5rem',
      }}
    >
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
                    : t`Guest`}
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
  );
};

interface ReviewProps {
  review: ISellerReviewsItems;
}

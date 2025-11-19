import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const ReviewItem = ({ review, ratingCount }: ReviewProps) => {
  let totalRating =
    (parseInt(review.feed_price) || 0) +
    (parseInt(review.feed_quality) || 0) +
    (parseInt(review.feed_value) || 0);
  totalRating = totalRating > 0 ? Math.round(totalRating / 3) : 0;
  const muiTheme = useTheme();
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
  return (
    <Stack
      direction="row"
      columnGap={2}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        marginBottom: '1rem',
        paddingBottom: '1rem',
      }}
    >
      <Avatar {...stringAvatar(review.feed_nickname || '')} />

      <Box sx={{ width: '100%' }}>
        <Stack gap={1.5}>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography
                variant="body2"
                fontWeight={500}
                color={muiTheme.palette.common.black}
              >
                {review?.feed_nickname
                  ? review?.feed_nickname
                  : review?.nickname || 'Guest'}
              </Typography>
              <Rating
                size="small"
                name="review"
                value={totalRating ? totalRating : ratingCount}
                readOnly
              />
            </Stack>
            <Typography variant="caption">{review.created_at}</Typography>
          </Stack>

          <Stack>
            <Typography variant="subtitle1" className="font-bold">
              {review?.feed_summary}
            </Typography>
            <Typography variant="body2">
              {review.feed_review ? review.feed_review : review.text}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
export default ReviewItem;
interface ReviewProps {
  review: any;
  ratingCount?: number;
}

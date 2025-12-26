import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { stringAvatar } from '@utils/Helper';
import ErrorBoundary from './ErrorBoundary';

const ProductReviewItem = ({ review }: ReviewProps) => {
  const muiTheme = useTheme();
  return (
    <ErrorBoundary>
      {' '}
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
        {review?.nickname && (
          <Avatar
            {...stringAvatar(review?.nickname !== null ? review?.nickname : '')}
            className="w-[48px] border border-solid border-gray-200 h-[48px]"
          />
        )}
        <Box sx={{ width: '100%' }}>
          <Stack gap={1.5} className="-md:py-4">
            <Stack
              className="flex-col md:flex-row"
              justifyContent="space-between"
            >
              <Stack>
                <Typography
                  variant="body2"
                  className="tracking-wide"
                  fontWeight={500}
                  color={muiTheme.palette.common.black}
                >
                  {review?.nickname ? review?.nickname : 'Guest'}
                </Typography>
                <Rating
                  size="small"
                  name="review"
                  value={review?.average_rating / 20}
                  readOnly
                />
              </Stack>
              <Typography
                variant="caption"
                className="uppercase text-fadedText"
              >
                {review?.created_at}
              </Typography>
            </Stack>
            <Stack className="flex flex-col gap-1 md:mt-4">
              <Typography variant="subtitle1" className="font-bold">
                {review?.summary}
              </Typography>
              <Typography
                variant="body2"
                className="leading-normal text-reviewText lg:leading-[1.25rem]"
              >
                {review?.text}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </ErrorBoundary>
  );
};

interface ReviewProps {
  review?: any;
  ratingCount?: number;
}
export default ProductReviewItem;

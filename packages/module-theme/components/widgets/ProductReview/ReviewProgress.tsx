import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReviewBreakdown } from '@voguish/module-catalog/types';
import ErrorBoundary from '../../ErrorBoundary';
interface LinearProps {
  value: number;
  star: number;
  arrayLength: number;
}
function LinearProgressWithLabel(props: LinearProps) {
  const { value, star, arrayLength } = props;
  const progressValue = value !== 0 && (value / arrayLength) * 100;
  return (
    <ErrorBoundary>
      {' '}
      <div className="flex items-center">
        <Box sx={{ width: { xs: '88%', sm: '90%' }, mr: 1.5 }}>
          <ErrorBoundary>
            <LinearProgress
              className={` ${star > 3 ? 'productReview1 ' : ''} ${
                star > 2 ? 'productReview3' : ''
              }:`}
              variant="determinate"
              value={progressValue || 0}
            />
          </ErrorBoundary>
        </Box>
        <Box sx={{ width: 3 }}>
          <ErrorBoundary>
            <Typography
              className="px-1"
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center' }}
            >
              {value <= 10 ? `0${value}` : value}
            </Typography>
          </ErrorBoundary>
        </Box>
      </div>
    </ErrorBoundary>
  );
}
export default function ReviewProgress({
  filteredReviews,
  totalRating,
}: {
  filteredReviews: ReviewBreakdown;
  totalRating: number;
}) {
  return (
    <ErrorBoundary>
      {' '}
      <Stack
        className="pt-4 md:py-8"
        gap="1.125rem"
        sx={{
          paddingTop: '1.125rem',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        {Object.keys(filteredReviews).map((star) => {
          const starVal = star.replace('__', '');
          return (
            <Stack key={starVal}>
              <ErrorBoundary>
                {' '}
                <Rating
                  size="small"
                  name="reviews"
                  value={Number(starVal)}
                  readOnly
                />
              </ErrorBoundary>

              <ErrorBoundary>
                <LinearProgressWithLabel
                  star={Number(starVal)}
                  value={filteredReviews[star]}
                  arrayLength={totalRating}
                />
              </ErrorBoundary>
            </Stack>
          );
        })}
      </Stack>
    </ErrorBoundary>
  );
}

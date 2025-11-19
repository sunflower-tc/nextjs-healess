import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ReviewBreakdown } from '@voguish/module-catalog';
import dynamic from 'next/dynamic';
interface LinearProps {
  value: number;
  star: number;
  arrayLength: number;
}
const Rating = dynamic(() => import('@mui/material/Rating'));
function LinearProgressWithLabel(props: LinearProps) {
  const { value, star, arrayLength } = props;
  const progressValue = value !== 0 && (value / arrayLength) * 100;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: { xs: '88%', sm: '90%' }, mr: 1.5 }}>
        <LinearProgress
          className={` ${star > 3 ? 'productReview1 ' : ''} ${
            star > 2 ? 'productReview3' : ''
          }:`}
          variant="determinate"
          value={progressValue || 0}
        />
      </Box>
      <Box sx={{ width: 3 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          {value <= 10 ? `0${value}` : value}
        </Typography>
      </Box>
    </Box>
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
            <Rating
              size="small"
              name="reviews"
              value={Number(starVal)}
              readOnly
            />

            <LinearProgressWithLabel
              star={Number(starVal)}
              value={filteredReviews[star]}
              arrayLength={totalRating}
            />
          </Stack>
        );
      })}
    </Stack>
  );
}

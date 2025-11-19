import { useQuery } from '@apollo/client';
import { Trans } from '@lingui/macro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { isValidArray } from '@utils/Helper';
import { useToken } from '@voguish/module-customer';
import {
  FilteredArrays,
  ISellerReviewsItems,
  RatingPlaceholder,
} from '@voguish/module-marketplace';
import SELLER_REVIEWS_QUERY from '@voguish/module-marketplace/graphql/SellerReviews.graphql';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
const StarRoundedIcon = dynamic(
  () => import('@mui/icons-material/StarRounded')
);
const Rating = dynamic(() => import('@mui/material/Rating'));
const CircularProgress = dynamic(
  () => import('@mui/material/CircularProgress')
);
const LinearProgress = dynamic(() => import('@mui/material/LinearProgress'));
const AddReviewForm = dynamic(() => import('./form/AddReviewForm'));
const LinearProgressWithLabel = ({
  value,
  arrayLength,
}: {
  value: number;
  arrayLength: number;
}) => {
  const progressValue = (value / arrayLength) * 100;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: { xs: '88%', sm: '90%' }, mr: 1.5 }}>
        <LinearProgress variant="determinate" value={progressValue} />
      </Box>
      <Box sx={{ width: 3 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          {value < 10 ? `0${value}` : value}
        </Typography>
      </Box>
    </Box>
  );
};

const OverallRating = ({
  id,
  totalRating,
}: {
  id: number;
  totalRating: string;
}) => {
  const router = useRouter();

  const { data: ratingData, loading } = useQuery(SELLER_REVIEWS_QUERY, {
    variables: {
      pageSize: 9,
      currentPage: 1,
      sellerId: id,
    },
  });

  const [open, setOpen] = useState(false);
  const token = useToken();
  const addReviewHandler = () => {
    if (token) {
      setOpen(true);
    } else {
      router.push('/customer/account/login');
    }
  };

  // Initialize an array with objects initial value 0 for the desired keys
  const filteredReviews: FilteredArrays[] = [
    { 5: 0 },
    { 4: 0 },
    { 3: 0 },
    { 2: 0 },
    { 1: 0 },
  ];

  // Use map to populate the appropriate arrays

  if (ratingData && isValidArray(ratingData?.getSellerReview.items)) {
    ratingData.getSellerReview.items.map((review: ISellerReviewsItems) => {
      let totalRating =
        parseInt(review.feed_value) +
        parseInt(review.feed_value) +
        parseInt(review.feed_value);
      totalRating = totalRating > 0 ? Math.round((totalRating / 300) * 100) : 0;

      const ratingKey: number | null =
        totalRating === 100
          ? 5
          : totalRating >= 80
          ? 4
          : totalRating >= 60
          ? 3
          : totalRating >= 40
          ? 2
          : totalRating >= 20
          ? 1
          : null;

      if (ratingKey !== null) {
        const index = 5 - ratingKey;
        filteredReviews[index][ratingKey]++;
      }
    });
  }

  return (
    <>
      {loading && (
        <Grid
          pt={{ xs: '0rem', md: '3rem' }}
          item
          xs={12}
          md={6.5}
          lg={7.5}
          sm={7.5}
          pr={{ xs: '0rem', sm: '2.5rem', md: '2.5rem', lg: '3.5rem' }}
        >
          <RatingPlaceholder />
        </Grid>
      )}

      <Stack pb={{ xs: '1rem', sm: '2rem', md: '2rem' }}>
        <Typography variant="OverallRating">
          <Trans>Overall Rating</Trans>
        </Typography>
      </Stack>
      <Stack
        direction="row"
        columnGap="1rem"
        pb={{ xs: '1rem', sm: '1rem', md: '1rem' }}
      >
        <Stack>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              size={120}
              variant="determinate"
              value={(-parseInt(totalRating) / 5) * 100}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StarRoundedIcon
                //   use direct color for Star icon
                sx={{ fontSize: '3.875rem', color: '#FFC930' }}
              />
            </Box>
          </Box>
        </Stack>
        <Stack justifyContent="flex-end">
          <Typography
            variant="body1"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {totalRating} out of 5
          </Typography>
          <Typography pt="0.25rem" pb="0.5rem" variant="body2">
            <Trans>Based on</Trans> {ratingData?.getSellerReview.total_count}{' '}
            <Trans>reviews</Trans>
          </Typography>

          <Button
            className="border-brand whitespace-nowrap xl:py-[9px] lg:py-[9px]  rounded-[unset]"
            variant="outlined"
            onClick={addReviewHandler}
          >
            <Trans>Add your review</Trans>
          </Button>
        </Stack>
      </Stack>
      <Stack
        gap="1.125rem"
        sx={{
          paddingTop: '1.125rem',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        {filteredReviews.map((star) => (
          <Stack key={Number(Object.keys(star))}>
            <Rating
              size="small"
              name="reviews"
              value={Number(Object.keys(star))}
              readOnly
            />
            <LinearProgressWithLabel
              value={Number(Object.values(star))}
              arrayLength={
                ratingData?.getSellerReview.total_count !== 0
                  ? ratingData?.getSellerReview.total_count
                  : 1
              }
            />
          </Stack>
        ))}
      </Stack>
      <AddReviewForm open={open} setOpen={setOpen} submitReview={id} />
    </>
  );
};
export default OverallRating;

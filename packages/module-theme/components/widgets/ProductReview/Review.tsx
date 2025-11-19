import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { isValidArray } from '@utils/Helper';
import {
  ProductItemInterface,
  ProductReviewRatingsMetadata,
  ReviewBreakdown,
} from '@voguish/module-catalog';
import RATINGS_QUERY from '@voguish/module-catalog/graphql/ProductRatings.graphql';
import ReviewPlaceholder from './ReviewPlaceholder';

import dynamic from 'next/dynamic';
const ReviewProgress = dynamic(() => import('./ReviewProgress'));
const ReviewsList = dynamic(() => import('./ReviewsList'));
const FormSection = dynamic(() => import('./FormSection'));
export const Review = ({ product }: { product: ProductItemInterface }) => {
  const { data, loading } =
    useQuery<ProductReviewRatingsMetadata>(RATINGS_QUERY);
  const ratingsFields = data?.productReviewRatingsMetadata?.items || [];

  const {
    rating_summary,
    review_count,
    reviews: { items: reviewItems },
    sku,
    name,
  } = product;

  // Initialize an object with empty arrays for the desired keys
  const filteredReviews: ReviewBreakdown = {
    __5: 0,
    __4: 0,
    __3: 0,
    __2: 0,
    __1: 0,
  };

  if (reviewItems && isValidArray(reviewItems)) {
    reviewItems.forEach(({ ratings_breakdown }) => {
      if (isValidArray(ratings_breakdown)) {
        ratings_breakdown.forEach(({ value }) => {
          filteredReviews[`__${value}`]++;
        });
      }
    });
  }
  return (
    <>
      {loading ? (
        <ReviewPlaceholder />
      ) : (
        <Grid
          className="max-w-[98vw]"
          container
          display="flex -md:justify-center"
          flexDirection={{ xs: 'column-reverse', md: 'row' }}
          rowGap={3}
        >
          <ReviewsList reviews={reviewItems} />
          <Grid
            justifyContent="center"
            item
            pl={{ xs: '0rem', md: '2rem', lg: '4rem' }}
            borderLeft={{ xs: 'none', md: 1 }}
            borderColor={{ xs: 'none', md: 'divider' }}
            xs={12}
            md={5.5}
            lg={4.5}
          >
            <Stack pb={{ xs: '1rem', md: '2rem' }}>
              <Typography
                variant="OverallRating"
                className="leading-normal lg:leading-[1.25rem] tracking-wider"
              >
                Overall Rating
              </Typography>
            </Stack>
            <FormSection
              productName={name}
              ratingsFields={ratingsFields}
              reviewCount={review_count}
              sku={sku}
              reviewSummary={rating_summary}
            />

            <ReviewProgress
              filteredReviews={filteredReviews}
              totalRating={review_count}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Review;

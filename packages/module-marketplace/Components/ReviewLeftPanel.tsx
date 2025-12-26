import { useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { isValidArray } from '@utils/Helper';

import SELLER_REVIEWS_QUERY from '@voguish/module-marketplace/graphql/SellerReviews.graphql';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import ReviewItem from '@voguish/module-theme/components/ReviewItem';
import { useTranslation } from 'next-i18next';
import { ISellerReviewsItems } from '../type';
import { ReviewPlaceholder } from './Reviews/Placeholder';
const ReviewLeftPanel = ({ id }: { id: number }) => {
  const offSet = 5;
  const currentPage = 1;
  const {
    data: reviewData,
    loading,
    fetchMore,
  } = useQuery(SELLER_REVIEWS_QUERY, {
    variables: {
      pageSize: offSet,
      currentPage: currentPage,
      sellerId: id,
    },
  });

  /**
   * ToDo - implement passing pageSize without using same query twice
   */

  const loadMoreReviews = () => {
    fetchMore({
      variables: {
        currentPage: currentPage + 1,
      },

      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          getSellerReview: {
            ...fetchMoreResult.getSellerReview,
            items: [
              ...prev.getSellerReview.items,
              ...fetchMoreResult.getSellerReview.items,
            ],
          },
        });
      },
    });
  };

  const reviews = reviewData?.getSellerReview?.items || [];
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      {loading && (
        <Grid
          container
          display="flex"
          flexDirection={{ xs: 'column-reverse', md: 'row', sm: 'row' }}
          rowGap={3}
          pr={{ lg: '2rem' }}
        >
          <ReviewPlaceholder />
        </Grid>
      )}

      {reviewData?.getSellerReview?.items &&
        isValidArray(reviewData.getSellerReview.items) && (
          <ErrorBoundary>
            {reviews.map((review: ISellerReviewsItems) => (
              <ReviewItem key={review.entity_id} review={review} />
            ))}
            {reviews &&
              reviewData?.getSellerReview.total_count > reviews.length && (
                <ErrorBoundary>
                  {loading ? (
                    <div className="flex justify-center mx-auto">
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-20 h-20 text-brand animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        ></path>
                        <path
                          className="fill-green-200"
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <Box my={{ xs: '1rem', sm: '1.5rem' }}>
                      <Button
                        className="bg-primary rounded-[unset]"
                        color="secondary"
                        variant="contained"
                        type="submit"
                        onClick={loadMoreReviews}
                        sx={{
                          px: '1.25rem',
                          py: '0.5rem',
                          borderRadius: 'unset',
                          textTransform: 'capitalize',
                          width: { xs: '100%', sm: 'unset' },
                        }}
                      >
                        <Typography variant="subtitle1">
                          {' '}
                          {t('Load more reviews')}
                        </Typography>
                      </Button>
                    </Box>
                  )}
                </ErrorBoundary>
              )}
          </ErrorBoundary>
        )}
      {reviewData?.getSellerReview &&
        !isValidArray(reviewData.getSellerReview.items) && (
          <Typography variant="body2">
            {t('For now no reviews added.')}
          </Typography>
        )}
    </ErrorBoundary>
  );
};
export default ReviewLeftPanel;

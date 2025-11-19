import Grid from '@mui/material/Grid';
import { IProps } from '@voguish/module-marketplace';
import dynamic from 'next/dynamic';
const OverallRating = dynamic(() => import('../ReviewRightPanel'));
const ReviewLeftPanel = dynamic(() => import('../ReviewLeftPanel'));
const Review = (props: IProps) => {
  const { totalRating, id } = props;

  return (
    <>
      <Grid
        container
        display="flex"
        flexDirection={{ xs: 'column-reverse', md: 'row' }}
        rowGap={3}
        pt={{ lg: 4 }}
      >
        <Grid
          pt={{ xs: '0rem', md: '3rem' }}
          item
          xs={12}
          md={6.5}
          lg={7.5}
          pr={{ xs: '0rem', md: '2.5rem', lg: '3.5rem' }}
          py={{ lg: '1rem' }}
        >
          <ReviewLeftPanel id={id} />
        </Grid>
        <Grid
          item
          pl={{ xs: '0rem', md: '2rem', lg: '4rem' }}
          borderLeft={{ xs: 'none', md: 1 }}
          borderColor={{ xs: 'none', md: 'divider' }}
          xs={12}
          md={5.5}
          lg={4.5}
          sx={{ maxHeight: { xs: 'unset', sm: 500, lg: 500 } }}
        >
          <OverallRating id={id} totalRating={totalRating} />
        </Grid>
      </Grid>
    </>
  );
};
export default Review;

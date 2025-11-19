import styled from '@emotion/styled';
import Rating from '@mui/material/Rating';

import dynamic from 'next/dynamic';
const StarRoundedIcon = dynamic(
  () => import('@mui/icons-material/StarRounded')
);
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});
export const ReviewRating = ({
  setRatingvalue,
  Ratingvalue,
}: {
  Ratingvalue: number;
  setRatingvalue: (Ratingvalue: number) => void;
}) => {
  return (
    <StyledRating
      onChange={(_event, newValue: any) => {
        setRatingvalue(newValue);
      }}
      value={Ratingvalue}
      className="mb-2.5 mt-0.5"
      name="customized-color"
      defaultValue={2}
      precision={1}
      icon={
        <StarRoundedIcon
          //   use direct color for Star icon
          sx={{ fontSize: '2rem', color: '#FFC930' }}
        />
      }
      emptyIcon={
        <StarRoundedIcon
          //   use direct color for Star icon
          sx={{ fontSize: '2rem', color: '#E9E8E8' }}
        />
      }
    />
  );
};

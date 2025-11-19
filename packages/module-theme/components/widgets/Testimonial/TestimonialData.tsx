import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PLACEHOLDER_IMG, Pattern } from '@utils/Constants';
import Image from 'next/image';
import { FC } from 'react';
import { RatingStar } from '../../elements';

type props = {
  name: string;
  location: string;
  content: string;
  thumbnail: string;
  rating: number;
};
const TestimonialData: FC<props> = ({
  name,
  location,
  content,
  thumbnail,
  rating,
}) => {
  /**
   * Image Alt
   */
  const alt = 'Image';

  return (
    <Card
      className="box-border flex border mb-[2.3rem] rounded-md border-solid"
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 4,
        marginInline: 0.5,
        gap: 1,
        transition: 'transform 0.3s, border 0.3s',
        '&:hover': {
          boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.11)',
          transform: 'scale(0.95)',
        },

        marginRight: 2,
      }}
    >
      <Grid sx={{ position: 'relative', height: 115, width: 250 }}>
        <Avatar
          variant="rounded"
          sx={{
            position: 'relative',
            top: 6,
            left: 6,
            height: '100%',
            width: '100%',
          }}
        >
          <Image
            className="aspect-auto"
            src={Pattern}
            fill
            placeholder="blur"
            blurDataURL={PLACEHOLDER_IMG}
            alt={alt ? alt : 'Lorem Ipsum'}
          />
        </Avatar>
        <Avatar
          variant="rounded"
          sx={{
            position: 'absolute',
            height: '100%',
            top: -6,
            left: -6,
            width: '100%',
          }}
        >
          <Image
            className="aspect-auto"
            src={thumbnail}
            fill
            placeholder="blur"
            blurDataURL={PLACEHOLDER_IMG}
            alt={alt ? alt : 'Lorem Ipsum'}
          />
        </Avatar>
      </Grid>
      <Grid marginLeft={1}>
        <Typography maxWidth={{ xs: '100%', md: '80%' }} variant="body2">
          {content}
        </Typography>
        <RatingStar
          sx={{ paddingBlock: 1 }}
          defaultValue={rating}
          precision={0.5}
          readonly
        />
        <Typography
          paddingY={0.5}
          color="primary.main"
          variant="h3"
          fontWeight={600}
        >
          {name}
        </Typography>
        <Typography variant="body2">{location}</Typography>
      </Grid>
    </Card>
  );
};
export default TestimonialData;

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMPFeaturesData from '@utils/MPFeaturesData';
import Thumbnail from '@voguish/module-catalog/Components/Product/Item/Thumbnail';

const MPFeatures = () => {
  const { MPFeaturesData } = useMPFeaturesData();
  return (
    <Grid
      item
      container
      gap={{ xs: 3, sm: 4, lg: 6.5 }}
      justifyContent={{ md: 'center', lg: 'unset' }}
    >
      {MPFeaturesData.map((item, index) => (
        <Grid
          key={`${item.label + index}`}
          item
          container
          xs={12}
          sm={4}
          lg={2.6125}
          direction="column"
          gap={1}
        >
          <Thumbnail
            alt="Feature Image"
            thumbnail={item.icon}
            height={46}
            width={46}
          />
          <Typography variant="body1" fontWeight={500} paddingTop={1}>
            {item.label}
          </Typography>
          <Typography variant="body2" fontSize="0.75rem">
            {item.content}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};
export default MPFeatures;

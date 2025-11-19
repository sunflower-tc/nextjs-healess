import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
const style = {
  border: '1px solid',
  borderRadius: 1,
  borderColor: 'themeAdditional.borderColor',
};

type PlaceHolderType = {
  placeHolders: Array<number | string> | any;
};
export const OrderPlaceHolder = ({ placeHolders }: PlaceHolderType) => {
  return placeHolders.map((item: object, index: number) => (
    <Grid item xs={12} key={index}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, my: 2, ...style }}
      >
        <Grid item lg={6} md={9} xs={12}>
          <Skeleton animation="wave" sx={{ width: 1 / 2 }} height={50} />
          <Skeleton animation="wave" sx={{ width: 0.9 }} height={30} />
          <Skeleton animation="wave" sx={{ width: 0.2 }} height={30} />
        </Grid>
        <Grid item lg={3} md={3} xs={12} justifyContent="flex-end">
          <Box component="div" display="flex" justifyContent="center">
            <Skeleton animation="wave" width="20%" height={40} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  ));
};

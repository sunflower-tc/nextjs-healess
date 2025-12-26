import Placeholder from '@voguish/module-catalog/Components/Product/Item/Placeholder';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { itemsArray } from '@store/local-storage';
import { LayeredPlaceHolder } from '@voguish/module-catalog/Components/Product/Detail/placeholder/PlaceHolder';

export default function ListFall() {
  return (
    <Stack>
      <Grid container spacing={2} mt={1}>
        <Grid className="rounded-md -lg:hidden" item xs={12} sm={12} lg={3}>
          <LayeredPlaceHolder />
        </Grid>
        <Grid item xs={12} sm={12} lg={9}>
          <Grid container spacing={4}>
            {itemsArray.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={`${index + item}`}>
                <Placeholder />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { STORE_CONFIG, getLocalStorage } from '@store/local-storage';
import { PLACEHOLDER_IMG } from '@utils/Constants';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { Link } from '@voguish/module-theme/components/ui/Link';
import dynamic from 'next/dynamic';
import { IStoreProps } from '../type';
import { BannerThumbnail } from './BannerThumbnail';
import { Thumbnail } from './LogoThumbnail';
const Rating = dynamic(() => import('@mui/material/Rating'));
const StoreItem = (props: IStoreProps) => {
  const { store } = props;
  const storeData = getLocalStorage(STORE_CONFIG, true) || {};

  const baseUrl = storeData?.base_url;
  const muiTheme = useTheme();
  return (
    <ErrorBoundary>
      <Grid
        className="duration-300 aspect-video hover:shadow-md min-w-[10rem] lg:min-w-[17rem] group"
        item
        container
        key={store.seller_id}
        sx={{
          borderRadius: '0.375rem',
          border: `1px solid ${muiTheme.palette.customGrey[400]}`,
        }}
      >
        <Card
          sx={{
            width: '100%',
            border: 'none',
            boxShadow: 'none',
            paddingBottom: 0,
          }}
        >
          <Link
            href={`/marketplace/seller/profile/shop/${store?.shop_url}`}
            sx={{ textDecoration: 'none' }}
          >
            <Grid item container>
              <Box
                sx={{ position: 'relative' }}
                width="100%"
                height={{ xs: 68, lg: 118 }}
              >
                <BannerThumbnail
                  thumbnail={
                    store?.banner_pic != null && baseUrl != null
                      ? `${baseUrl}media/avatar/${store?.banner_pic}`
                      : PLACEHOLDER_IMG
                  }
                  fill
                  className="object-cover duration-300 group-hover:scale-105"
                  alt={
                    store?.shop_title != null
                      ? store?.shop_title
                      : store?.shop_url
                  }
                />
              </Box>
              <Grid item container>
                <Thumbnail
                  className="w-8 h-8 p-1 mb-[-1rem] lg:mb-[-1.595rem] xl:mb-[-1.895rem] bg-white group-hover:scale-[1.02] duration-300 border border-solid ltr:translate-x-[0.6rem] rtl:-translate-x-[0.6rem] translate-y-[-1rem] lg:translate-y-[-1.8rem] xl:translate-y-[-1.7rem] rounded-lg lg:h-12 lg:w-12 border-colorBorder"
                  style={{
                    position: 'relative',
                  }}
                  thumbnail={
                    store?.logo_pic != null && baseUrl != null
                      ? `${baseUrl}media/avatar/${store?.logo_pic}`
                      : PLACEHOLDER_IMG
                  }
                  height={59}
                  width={59}
                  alt={
                    store?.shop_title != null
                      ? store?.shop_title
                      : store?.shop_url
                  }
                />
              </Grid>
            </Grid>
            <CardContent className="px-1 !pt-0 !pb-2 mx-0 my-0">
              <Grid px="0.5rem" className="pt-1.5 pb-0" direction="column">
                <Typography className="my-0 text-lg break-all">
                  {store?.shop_title != null
                    ? store?.shop_title
                    : store?.shop_url}
                </Typography>

                <Grid
                  item
                  container
                  direction="row"
                  gap={0.5}
                  sx={{ alignItems: 'center' }}
                >
                  <Rating
                    size="small"
                    sx={{ color: muiTheme.palette.primary.main }}
                    max={1}
                    defaultValue={1}
                    readOnly
                  />
                  <Typography
                    className="pt-1 pb-0 my-0 text-sm"
                    variant="button"
                    sx={{ color: muiTheme.palette.common.black }}
                  >
                    {store?.seller_rating}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Link>
        </Card>
      </Grid>
    </ErrorBoundary>
  );
};
export default StoreItem;

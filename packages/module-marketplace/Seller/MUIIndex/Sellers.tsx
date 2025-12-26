import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { isValidArray } from '@utils/Helper';
import { BannerThumbnail } from '@voguish/module-marketplace/Components/BannerThumbnail';
import { Thumbnail } from '@voguish/module-marketplace/Components/LogoThumbnail';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const Sellers = (props: { sellers: ISellers[] }) => {
  const { sellers } = props;
  const items = sellers.slice(0, 3);
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      {isValidArray(items) && (
        <Grid className="grid items-center w-full gap-6 px-0 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((store) => (
            <Grid item key={store.profileurl}>
              <Box sx={{ justifyContent: 'center' }}>
                <ImageList
                  cols={store.products.length === 1 ? 1 : 2}
                  sx={{
                    position: 'relative',
                    my: 0,
                    minWidth: '100%',
                    flex: 1,
                    p: 0,

                    height: 187,
                  }}
                  gap={6}
                >
                  {store.products.map((product, index) => (
                    <ImageListItem
                      key={product.id}
                      rows={
                        (index === 0 && store.products.length === 3) ||
                        store.products.length !== 3
                          ? 2
                          : 1
                      }
                      sx={{
                        justifyContent: 'center',
                        backgroundColor: 'themeAdditional.bgColor',
                        borderRadius: '4px',
                      }}
                    >
                      <BannerThumbnail
                        thumbnail={product.thumbnail}
                        fill
                        style={{
                          objectFit: 'contain',
                          mixBlendMode: 'multiply',
                        }}
                        alt={product.name}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>

                <Box
                  sx={{
                    p: 1.5,
                    justifyContent: 'center',
                  }}
                >
                  <Grid item container gap="1rem" alignItems="center">
                    <Thumbnail
                      className="w-[5rem] h-[5rem]"
                      thumbnail={
                        store.sellerIcon != null
                          ? store.sellerIcon
                          : '/assets/img/dummy/seller-image.png'
                      }
                      height={80}
                      width={80}
                      alt={
                        store?.shopTitle != null
                          ? store.shopTitle
                          : store.profileurl
                      }
                      style={{
                        borderRadius: '50%',
                      }}
                    />

                    <Grid item container xs="auto" direction="column">
                      <Typography
                        variant="OverallRating"
                        fontWeight={700}
                        pb={0.5}
                      >
                        {store.shopTitle}
                      </Typography>
                      <Typography variant="body1">
                        {store.sellerProductCount} {t('Products')}
                      </Typography>
                      <Link
                        className="text-lg font-semibold no-underline cta text-brand"
                        href={`/marketplace/seller/profile/shop/${store.profileurl}`}
                      >
                        <span className=" hover-underline-animation">
                          {' '}
                          {t('View Seller')}
                        </span>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </ErrorBoundary>
  );
};
export default Sellers;
export interface ISellers {
  products: ISellerProducts[];
  profileurl: string;
  store_id: number;
  sellerProductCount: string;
  sellerIcon: string;
  shopTitle: string;
}

export interface ISellerProducts {
  id: number;
  thumbnail: string;
  name: string;
  type: string;
}

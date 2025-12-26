import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getLabelText, labels } from '@utils/Helper';
import Thumbnail from '@voguish/module-catalog/Components/Product/Item/Thumbnail';
import { BannerThumbnail } from '@voguish/module-marketplace/Components/BannerThumbnail';
import SellerContactForm from '@voguish/module-marketplace/Components/form/ContactSellerForm';
import { IProfileBannerProps } from '@voguish/module-marketplace/type';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import Containers from '@voguish/module-theme/components/ui/Container';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const SPBanner = (props: IProfileBannerProps) => {
  const userEmail = useSelector((state: RootState) => state?.user?.email);
  const { id, banner, logo, name, rating, orderCount, productCount } = props;

  const { t } = useTranslation('common');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <ErrorBoundary>
      <div className="overflow-hidden">
        <div className="h-[20rem] relative w-full -xs:h-[12.25] -xs:w-screen">
          <BannerThumbnail
            thumbnail={banner}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <Containers>
          <div>
            <Grid
              key={id}
              item
              container
              xs={12}
              sm={5}
              lg={6}
              columnGap={3.5}
              rowGap={2}
              sx={{ paddingLeft: { sm: 0, lg: '24px' } }}
            >
              <Grid
                item
                xs="auto"
                sm="auto"
                md="auto"
                sx={{ height: '3.5rem' }}
              >
                <Box
                  className="p-1 border translate-y-[-4.25rem] border-solid rounded-lg border-colorBorder"
                  sx={{
                    position: 'relative',
                    width: 129,
                    height: 129,
                    padding: 0.5,
                    background: 'white',
                  }}
                >
                  <Thumbnail
                    className="duration-300 cursor-pointer hover:scale-110"
                    thumbnail={logo}
                    alt="img"
                    height={121}
                    width={121}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs="auto"
                sm="auto"
                lg="auto"
                sx={{ display: 'flex', flexDirection: 'column', pt: 1 }}
              >
                <Typography variant="ProfileName" component="span">
                  {name}
                </Typography>
                <Stack
                  direction="row"
                  spacing={{ xs: 2, sm: 1, lg: 4 }}
                  sx={{ alignItems: 'center' }}
                >
                  <Rating
                    size="small"
                    getLabelText={getLabelText}
                    className="text-brand"
                    name="simple-controlled"
                    value={Math.round(Number(rating))}
                    readOnly
                    precision={0.25}
                  />
                  <Typography variant="body1">
                    {labels[String(Math.round(Number(rating)))]}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <div className="flex flex-col justify-between gap-5 my-6 sm:items-center sm:flex-row lg:mx-6">
              <div className="flex items-center gap-4">
                <Stack
                  direction="row"
                  spacing={1}
                  className="px-3 py-1 font-medium border border-solid rounded border-commonBorder"
                >
                  <Typography variant="button">{t('Total Count :')}</Typography>
                  <Typography variant="overline">
                    {parseInt(productCount)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  className="border border-solid border-commonBorder"
                  sx={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.25rem',
                  }}
                >
                  <Typography variant="button">{t('Sale :')}</Typography>
                  <Typography variant="overline">
                    {parseInt(orderCount)}
                  </Typography>
                </Stack>
              </div>
              {userEmail && (
                <div className="flex items-center justify-end">
                  {' '}
                  <Button
                    className="bg-brand rounded-[unset] w-full sm:max-w-fit"
                    color="primary"
                    variant="contained"
                    type="submit"
                    fullWidth
                    onClick={handleOpen}
                    sx={{
                      px: 3,
                      py: 1.2,
                      textTransform: 'capitalize',
                    }}
                  >
                    <Typography variant="subtitle1">
                      {t('Contact Seller')}{' '}
                    </Typography>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Containers>
      </div>
      <ErrorBoundary>
        <SellerContactForm handleClose={handleClose} open={open} id={id} />
      </ErrorBoundary>
    </ErrorBoundary>
  );
};
export default SPBanner;

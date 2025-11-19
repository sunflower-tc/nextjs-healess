import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import {
  BannerThumbnail,
  IProfileBannerProps,
  Thumbnail,
} from '@voguish/module-marketplace';
import SellerContactForm from '@voguish/module-marketplace/Components/form/ContactSellerForm';
import Containers from '@voguish/module-theme/components/ui/Container';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const SPBanner = (props: IProfileBannerProps) => {
  const userEmail = useSelector((state: RootState) => state?.user.email);
  const { id, banner, logo, name, rating, orderCount, productCount } = props;
  const labels: { [index: string]: string } = {
    0: '(0/5)',
    1: '(1/5)',
    2: '(2/5)',
    3: '(3/5)',
    4: '(4/5)',
    5: '(5/5)',
  };

  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
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
                  className="p-1 border border-solid rounded-lg border-colorBorder"
                  sx={{
                    position: 'relative',
                    width: 129,
                    height: 129,
                    padding: 0.5,
                    translate: '0 -4.25rem',
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
                {' '}
                <Stack
                  direction="row"
                  spacing={1}
                  className="border border-solid border-commonBorder"
                  sx={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '0.25rem',

                    fontWeight: 500,
                  }}
                >
                  <Typography variant="button">
                    <Trans>Total Count :</Trans>
                  </Typography>
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
                  <Typography variant="button">
                    <Trans>Sale :</Trans>
                  </Typography>
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
                      <Trans>Contact Seller </Trans>
                    </Typography>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Containers>
      </div>
      <SellerContactForm handleClose={handleClose} open={open} id={id} />
    </>
  );
};
export default SPBanner;

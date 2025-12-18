import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { STORE_CONFIG, getKeyFromStorage } from '@store/local-storage';
import { LAYOUT_1, LAYOUT_2, LAYOUT_3 } from '@utils/Constants';
import { isValidArray } from '@utils/Helper';
import {
  MPPlaceholder,
  ProcessPlaceHolder,
  placeHolderFour,
} from '@voguish/module-marketplace/Components/MPPlaceholder';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import Containers from '@voguish/module-theme/components/ui/Container';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { NextRouter } from 'next/router';
const SellerPageContent = dynamic(
  () => import('../Seller/MUIIndex/SellerPageContent'),
  {
    loading: () => (
      <ErrorBoundary>
        <Skeleton
          variant="text"
          sx={{
            fontSize: '1.5rem',
            marginTop: { xs: '20px', sm: '32px' },
            marginBottom: '20px',
          }}
        />

        <Skeleton
          variant="text"
          sx={{ fontSize: '1.5rem', marginY: { xs: '20px', sm: '32px' } }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: '2rem', marginY: { xs: '20px', sm: '32px' } }}
        />
      </ErrorBoundary>
    ),
  }
);
const SellerProcess = dynamic(
  () => import('../Seller/MUIIndex/SellerProcess'),
  {
    loading: () => <ProcessPlaceHolder />,
  }
);
const Sellers = dynamic(() => import('../Seller/MUIIndex/Sellers'), {
  loading: () => (
    <ErrorBoundary>
      <Skeleton
        variant="text"
        sx={{ fontSize: '1.5rem', marginTop: { xs: '20px', sm: '32px' } }}
      />
      {placeHolderFour.map((item, index) => (
        <Grid
          container
          gap={{ xs: 2, sm: 0 }}
          key={`${index + item}`}
          justifyContent="center"
          alignItems="center"
          display="flex"
          sx={{
            '&:nth-of-type(even)': {
              flexDirection: { sm: 'row-reverse' },
            },
          }}
        >
          <Grid item xs={12} sm={4.25}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              sx={{ height: { xs: '250px', sm: '317px' } }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={7.75}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            padding={{ xs: 0, sm: 4 }}
            gap={2}
          >
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
            <Skeleton
              variant="text"
              sx={{ marginTop: -4, fontSize: '10rem' }}
            />
          </Grid>
        </Grid>
      ))}
    </ErrorBoundary>
  ),
});
const SellerPageBanner = dynamic(
  () => import('../Seller/MUIIndex/SellerPageBanner'),
  {
    loading: () => (
      <Skeleton
        animation="wave"
        variant="rectangular"
        sx={{ height: { xs: 250, sm: 309 } }}
        width="100%"
      />
    ),
  }
);
const SellerMPRunProcess = dynamic(
  () => import('../Seller/MUIIndex/SellerMPRunProcess'),
  {
    loading: () => <ProcessPlaceHolder />,
  }
);
const MPFeatures = dynamic(() => import('../Seller/MUIIndex/MPFeatures'), {
  loading: () => <ProcessPlaceHolder />,
});
const Main = ({ data, router }: { data: any; router: NextRouter }) => {
  const loading = router?.isFallback;
  const landingPageData = data?.marketplaceLandingPage || null;
  const labelData = landingPageData?.banner || null;
  const headTitle = landingPageData?.headTitle || null;
  const sellers = landingPageData?.sellers || [];
  const pageLayout = landingPageData?.pageLayout;
  const aboutImage = landingPageData?.aboutImage;
  const marketplaceIsActive =
    getKeyFromStorage(STORE_CONFIG, 'marketplace_is_active') || false;
  const { t } = useTranslation('common');

  return (
    <ErrorBoundary>
      <span className="hidden gap-10 gap-x-20" />
      {loading ? (
        <MPPlaceholder />
      ) : (
        marketplaceIsActive && (
          <ErrorBoundary>
            <Box sx={{ mt: 0, mb: 5 }}>
              {pageLayout === LAYOUT_1 &&
                landingPageData?.layoutOne?.bannerDisplay == '1' && (
                  <SellerPageBanner
                    bannerData={landingPageData}
                    theme={pageLayout === LAYOUT_1}
                  />
                )}

              {pageLayout === LAYOUT_2 &&
                landingPageData?.layoutTwo?.bannerDisplay == '1' && (
                  <SellerPageBanner
                    bannerData={landingPageData?.banner}
                    theme={pageLayout}
                  />
                )}

              {pageLayout === LAYOUT_3 &&
                landingPageData?.layoutThree?.bannerDisplay == '1' && (
                  <SellerPageBanner
                    bannerData={landingPageData?.banner}
                    theme={pageLayout}
                  />
                )}
              <Containers>
                {pageLayout === LAYOUT_1 && (
                  <SellerProcess
                    label={headTitle}
                    processData={landingPageData?.layoutOne?.icons}
                  />
                )}
                {pageLayout === LAYOUT_2 && (
                  <ErrorBoundary>
                    <Typography
                      className="mb-3 sm:mb-7 pt-[1.38rem] text-center"
                      variant="h5"
                      component="h3"
                      fontWeight="fontWeightBold"
                    >
                      {headTitle || t('Process of selling with us')}
                    </Typography>
                    <MPFeatures />
                  </ErrorBoundary>
                )}
                {pageLayout === LAYOUT_3 && (
                  <SellerMPRunProcess
                    label={headTitle}
                    processData={landingPageData?.layoutThree?.icons}
                  />
                )}
                {pageLayout === LAYOUT_1 && (
                  <Box className="flex flex-col items-center justify-center">
                    <Typography
                      variant="h5"
                      component="h3"
                      fontWeight="fontWeightBold"
                      className="py-[4rem] text-[1.375rem] leading-6"
                    >
                      {landingPageData.layoutOne?.marketplacelabel2}
                    </Typography>

                    {sellers && isValidArray(sellers) && (
                      <Sellers sellers={sellers}></Sellers>
                    )}

                    <Box className="flex flex-col items-center justify-center gap-5 pt-[4rem] sm:gap-6">
                      <Typography
                        className="font-semibold text-center"
                        variant="body1"
                      >
                        {landingPageData.layoutOne?.marketplacelabel3}
                      </Typography>
                      <Button
                        color="primary"
                        className="rounded-none shadow-none"
                        variant="contained"
                        type="submit"
                        onClick={() =>
                          router.push('/marketplace/seller/sellerlist')
                        }
                      >
                        {t('View All Sellers')}
                      </Button>
                    </Box>
                  </Box>
                )}

                {(pageLayout === LAYOUT_1 || pageLayout === LAYOUT_3) && (
                  <SellerPageContent
                    label={
                      landingPageData.layoutOne?.marketplacelabel4 ||
                      landingPageData.layoutOne?.marketplacelabel1
                    }
                    aboutImage={aboutImage}
                  />
                )}
                {(pageLayout === LAYOUT_2 || pageLayout === LAYOUT_3) && (
                  <Box
                    className={`flex flex-col items-center justify-center ${
                      pageLayout === LAYOUT_2 ? 'sm:pt-[6.25rem]' : 'sm:pt-12'
                    } md:pb-24 gap-5 pt-5 sm:gap-6`}
                  >
                    <Typography
                      variant="subtitle1"
                      textAlign="center"
                      fontWeight="fontWeightBold"
                    >
                      {labelData?.[2]?.['label']
                        ? labelData?.[2]?.['label']
                        : 'Open your Online shop & explore a new world of marketplace with more and millions of shoppers'}
                    </Typography>
                    {landingPageData?.banner && (
                      <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={() => router.push('/customer/account/create')}
                      >
                        {landingPageData?.banner?.[0]?.['label']}
                      </Button>
                    )}
                  </Box>
                )}
              </Containers>
            </Box>
          </ErrorBoundary>
        )
      )}
    </ErrorBoundary>
  );
};

export default Main;

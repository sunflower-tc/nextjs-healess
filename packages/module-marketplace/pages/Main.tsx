import { useQuery } from '@apollo/client';
import { Trans, t } from '@lingui/macro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { STORE_CONFIG, getKeyFromStorage } from '@store/local-storage';
import { LAYOUT_1, LAYOUT_2, LAYOUT_3 } from '@utils/Constants';
import { isValidArray } from '@utils/Helper';
import { MPPlaceholder } from '@voguish/module-marketplace/Components/MPPlaceholder';
import Marketplace_Landing_Page from '@voguish/module-marketplace/graphql/MarketplaceLandingPage.graphql';
import { NextPageWithLayout } from '@voguish/module-theme';
import Containers from '@voguish/module-theme/components/ui/Container';
import { useRouter } from 'next/router';
import React from 'react';
import MPFeatures from '../Seller/MUIIndex/MPFeatures';
import SellerMPRunProcess from '../Seller/MUIIndex/SellerMPRunProcess';
import SellerPageBanner from '../Seller/MUIIndex/SellerPageBanner';
import SellerPageContent from '../Seller/MUIIndex/SellerPageContent';
import SellerProcess from '../Seller/MUIIndex/SellerProcess';
import Sellers from '../Seller/MUIIndex/Sellers';

const Main: NextPageWithLayout = () => {
  const router = useRouter();
  const { data, loading } = useQuery(Marketplace_Landing_Page);
  console.log('data', data)
  const landingPageData = data?.marketplaceLandingPage || null;
  const labelData = landingPageData?.banner || null;
  const headTitle = landingPageData?.headTitle || null;
  const sellers = landingPageData?.sellers || [];
  const pageLayout = landingPageData?.pageLayout;
  const aboutImage = landingPageData?.aboutImage;
  const marketplaceIsActive =
    getKeyFromStorage(STORE_CONFIG, 'marketplace_is_active') || false;
  return (
    <>
      <span className="hidden gap-10 gap-x-20" />
      {!marketplaceIsActive && !loading ? (
        <MPPlaceholder />
      ) : (
        marketplaceIsActive && (
          <React.Fragment>
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
                  <>
                    <Typography
                      className="mb-3 sm:mb-7 pt-[1.38rem] text-center"
                      variant="h5"
                      component="h3"
                      fontWeight="fontWeightBold"
                    >
                      {headTitle || t`Process of selling with us`}
                    </Typography>
                    <MPFeatures />
                  </>
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
                        <Trans>View All Sellers</Trans>
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
                    className={`flex flex-col items-center justify-center ${pageLayout === LAYOUT_2 ? 'sm:pt-[6.25rem]' : 'sm:pt-12'
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
          </React.Fragment>
        )
      )}
    </>
  );
};

export default Main;

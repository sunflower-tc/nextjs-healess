import { client } from '@lib/apollo-client';
import { Trans } from '@lingui/macro';
import Typography from '@mui/material/Typography';
import {
  STORE_CONFIG,
  getKeyFromStorage,
  getLocalStorage,
} from '@store/local-storage';
import { PLACEHOLDER_IMG } from '@utils/Constants';
import { isMarketplaceEnable } from '@utils/Helper';
import { IParams, IStore } from '@voguish/module-marketplace';
import SELLER_PATHS_QUERY from '@voguish/module-marketplace/graphql/SellerPaths.graphql';
import SELLER_QUERY from '@voguish/module-marketplace/graphql/SellersList.graphql';
import Containers from '@voguish/module-theme/components/ui/Container';
import type {
  NextPageWithLayout,
  PageOptions,
} from '@voguish/module-theme/page';
import dynamic from 'next/dynamic';
const SPBanner = dynamic(
  () => import('@voguish/module-marketplace/Seller/SellerProfile/ProfileBanner')
);
const Profile = dynamic(
  () =>
    import('@voguish/module-marketplace/Seller/SellerProfile/Profile/Profile')
);
const SellerPage: NextPageWithLayout = (prop) => {
  // To Do : correct the type of data
  const { data, loading }: any = prop;
  const sellerData = data.sellerData;
  const storeData = getLocalStorage(STORE_CONFIG, true) || {};

  const baseUrl = storeData?.base_url;
  const marketplaceIsActive =
    getKeyFromStorage(STORE_CONFIG, 'marketplace_is_active') || false;
  return (
    <div>
      {marketplaceIsActive && (
        <>
          <Containers>
            <Typography variant="h4" mb={2}>
              <Trans> Seller Profile</Trans>
            </Typography>
          </Containers>
          <SPBanner
            id={sellerData?.seller_id}
            banner={
              sellerData?.banner_pic != null && baseUrl != null
                ? `${baseUrl}media/avatar/${sellerData?.banner_pic}`
                : PLACEHOLDER_IMG
            }
            logo={
              sellerData?.logo_pic != null && baseUrl !== null
                ? `${baseUrl}media/avatar/${sellerData?.logo_pic}`
                : PLACEHOLDER_IMG
            }
            name={sellerData?.shop_title || sellerData?.shop_url}
            orderCount={sellerData?.order_count}
            productCount={sellerData?.product_count}
            rating={sellerData?.seller_rating}
          />
          <Containers className="pt-3 -sm:px-2">
            <Profile
              loading={loading}
              id={Number(sellerData?.seller_id)}
              rating={sellerData?.seller_rating}
              returnPolicy={
                sellerData?.return_policy !== null
                  ? sellerData?.return_policy
                  : ''
              }
              shippingPolicy={
                sellerData?.shipping_policy !== null
                  ? sellerData?.shipping_policy
                  : ''
              }
              contactNumber={
                sellerData?.contact_number !== null
                  ? sellerData?.contact_number
                  : '1'
              }
              email={sellerData?.email}
            />
          </Containers>
        </>
      )}
    </div>
  );
};

export default SellerPage;

const pageProps: PageOptions = {
  title: 'Seller Profile',
  description: 'Seller Profile',
  showBreadcrumb: true,
};

SellerPage.pageOptions = pageProps;

export async function getStaticPaths() {
  const marketplaceIsActive = await isMarketplaceEnable();
  let paths = {};
  if (!marketplaceIsActive) {
    paths = [];
    return {
      paths,
      fallback: 'blocking', // can also be true or false
    };
  }
  const { data } = await client.query({
    query: SELLER_PATHS_QUERY,
    variables: {
      filter: { is_seller: { eq: '1' } },
    },
  });
  paths = data?.sellersList?.items.map((store: IStore) => ({
    params: {
      shop_url: store.shop_url,
    },
  }));
  return {
    paths,
    fallback: 'blocking', // can also be true or false
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(props: IParams) {
  const { params } = props;
  const marketplaceIsActive = await isMarketplaceEnable();
  if (!marketplaceIsActive) {
    return {
      notFound: true,
    };
  }
  const { data: sellerData } = await client.query({
    query: SELLER_QUERY,
    variables: {
      filter: { shop_url: { eq: params.shop_url } },
    },
  });

  const sellerId = sellerData?.sellersList?.items[0]?.seller_id;

  if (sellerId) {
    return {
      props: {
        data: { sellerData: sellerData?.sellersList.items[0] },
      },
      revalidate: 10,
    };
  }

  return {
    props: {},
    notFound: true,
    revalidate: 10,
  };
}

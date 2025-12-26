import { graphqlRequest } from '@utils/Fetcher';
import { getLocalStore, isMarketplaceEnable } from '@utils/Helper';
import { MPPlaceholder } from '@voguish/module-marketplace/Components/MPPlaceholder';
import Marketplace_Landing_Page from '@voguish/module-marketplace/graphql/MarketplaceLandingPage.graphql';
import { PageOptions } from '@voguish/module-theme/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import STORE_LIST from '@voguish/module-catalog/graphql/StoreList.query.graphql';

const Main = dynamic(() => import('@voguish/module-marketplace/pages/Main'), {
  loading: () => <MPPlaceholder />,
});
const SellerIndex = ({ pageData }: { pageData: any }) => {
  const router = useRouter();
  return <Main data={pageData} router={router} />;
};

export default SellerIndex;

export async function getStaticProps({ locale }: { locale: string }) {
  const pageProps: PageOptions = {
    title: 'Turn Your Passion Into a Business',
    description: 'Turn Your Passion Into a Business',
    showBreadcrumb: false,
  };
  const marketplaceIsActive = await isMarketplaceEnable();
  if (!marketplaceIsActive) {
    return {
      notFound: true,
    };
  }

  const storListResponse = await graphqlRequest({
    query: STORE_LIST,
    variables: {},
  });
  const stores = storListResponse?.data?.availableStores || [];

  try {
    const data = await graphqlRequest({
      query: Marketplace_Landing_Page,
      variables: {},
      options: {
        context: {
          headers: {
            Store: getLocalStore(stores, locale as string),
          },
        },
        fetchPolicy: 'no-cache',
      },
    });
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),

        pageOptions: pageProps,
        pageData: data || {},
      },
      revalidate: 60, // Time In which it revalidate or check for changes
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

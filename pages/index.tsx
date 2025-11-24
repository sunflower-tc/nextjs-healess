import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { graphqlRequest } from '@utils/Fetcher';
import { isValidObject } from '@utils/Helper';
import HOME_PAGE_QUERY from '@voguish/module-theme/graphql/home.graphql';
import { PageOptions } from '@voguish/module-theme/page';
import HomePage from '@voguish/module-theme/pages/Home';
import { HomePageData } from '@voguish/module-theme/types/home-page';
import { LRUCache } from '~utils/LRUCache';

const homePageCache = new LRUCache<HomePageData>(50, 5);

const Home = ({ pageData }: { pageData: HomePageData }) => {
  return (
    <div className="4xl:max-w-[160.5rem] w-full mx-auto">
      <HomePage pageData={pageData} />
    </div>
  );
};

const pageProps: PageOptions = {
  title: i18n._(t`Home Page - Voguish`),
  description: i18n._(t`Welcome to Voguish Theme`),
  showBreadcrumb: false,
};

Home.pageOptions = pageProps;
export default Home;

export async function getServerSideProps() {
  const cacheKey = 'homepage_data';

  try {
    // Check cache first
    const cachedData = homePageCache.get(cacheKey);
    if (cachedData) {
      return {
        props: {
          pageData: cachedData,
        },
      };
    }

    // Fetch fresh data
    const data = await graphqlRequest({
      query: HOME_PAGE_QUERY,
      variables: {},
      options: {
        fetchPolicy: 'network-only',
      },
    });

    if (!isValidObject(data)) {
      return { notFound: true };
    }

    // Cache the result
    homePageCache.set(cacheKey, data);

    return {
      props: {
        pageData: data,
      },
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return { notFound: true };
  }
}

import { graphqlRequest } from '@utils/Fetcher';
import { PageOptions } from '@voguish/module-theme';
import Home_Page from '@voguish/module-theme/graphql/home.graphql';
import { HomePageData } from '@voguish/module-theme/types/home-page';
import HomePage from '~packages/module-theme/pages/Home';

const Home = ({ pageData }: { pageData: HomePageData }) => {
  return (
    <div className="4xl:max-w-[160.5rem] w-full mx-auto">
      <HomePage pageData={pageData} />
    </div>
  );
};

const pageProps: PageOptions = {
  title: 'Home Page - Voguish',
  description: 'Welcome to Voguish Theme',
  showBreadcrumb: false,
};

Home.pageOptions = pageProps;
export default Home;
export async function getStaticProps() {
  const data = await graphqlRequest({
    query: Home_Page,
    variables: {},
    options: {
      fetchPolicy: 'network-only',
    },
  });
  return {
    props: {
      pageData: data,
    },
    revalidate: 20, // Time In which it revalidate or check for changes
  };
}

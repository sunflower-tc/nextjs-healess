import Loader from '@voguish/module-theme/components/ui/Form/Elements/Loader';
import { PageOptions } from '@voguish/module-theme/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Search = dynamic(
  () => import('@voguish/module-catalog/Components/Product/Search'),
  { loading: () => <Loader /> }
);

function SearchPage() {
  const router = useRouter();
  return <>{router.isFallback ? <Loader /> : <Search />}</>;
}

export default SearchPage;

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const pageProps: PageOptions = {
    title: 'Search Desired Product',
    description: 'Welcome to Voguish Theme',
    showBreadcrumb: false,
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),

      pageOptions: pageProps,
    },
  };
};

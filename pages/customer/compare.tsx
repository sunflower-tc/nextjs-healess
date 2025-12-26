import dynamic from 'next/dynamic';
import { PageOptions } from '@voguish/module-theme/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ProductComparisonPlaceholder } from '@voguish/module-marketplace/Components/Placeholder';
import { Suspense } from 'react';
import Containers from '@voguish/module-theme/components/ui/Container';
const CompareList = dynamic(
  () => import('@voguish/module-compare/Components/CompareModal'),
  {
    ssr: false,
    loading: () => (
      <Containers>
        <ProductComparisonPlaceholder />
      </Containers>
    ),
  }
);
export default function Compare() {
  return (
    <Suspense
      fallback={
        <Containers>
          <ProductComparisonPlaceholder />
        </Containers>
      }
    >
      <CompareList />
    </Suspense>
  );
}

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const pageProps: PageOptions = {
    title: 'Compare Items - Voguish',
    description: 'Welcome to Voguish customer account',
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),

      pageOptions: pageProps,
    },
  };
};

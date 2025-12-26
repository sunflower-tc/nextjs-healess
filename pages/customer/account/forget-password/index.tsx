import { Suspense } from 'react';
import Containers from '@packages/module-theme/components/ui/Container';
import { AuthPlaceholder } from '@packages/placeholder/ProductDetail';
import type {
  NextPageWithLayout,
  PageOptions,
} from '@voguish/module-theme/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const Forget = dynamic(
  () => import('@voguish/module-theme/pages/ForgetPassword'),
  {
    loading: () => (
      <Containers>
        <AuthPlaceholder />
      </Containers>
    ),
    ssr: false,
  }
);

const ForgetPassword: NextPageWithLayout = () => {
  return (
    <Suspense
      fallback={
        <Containers>
          <AuthPlaceholder />
        </Containers>
      }
    >
      <span className="md:-mt-10">
        <Forget />
      </span>
    </Suspense>
  );
};

export default ForgetPassword;
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const pageProps: PageOptions = {
    title: 'Forgot Your Password',
    description: 'Welcome to Voguish Theme',
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),

      pageOptions: pageProps,
    },
  };
};

import type { PageOptions } from '@voguish/module-theme/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
const NewPassword = dynamic(
  () => import('@voguish/module-theme/pages/NewPassword')
);
const CreateNewPassword = () => {
  return <NewPassword />;
};

export default CreateNewPassword;
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const pageProps: PageOptions = {
    title: 'Set New Password',
    description: 'Welcome to Voguish Theme',
  };
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),

      pageOptions: pageProps,
    },
  };
};

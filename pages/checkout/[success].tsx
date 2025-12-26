import { PageOptions } from '@voguish/module-theme/page';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const CheckoutSuccessPage = dynamic(
  () => import('@voguish/module-quote/pages/SuccessPage')
);

interface CheckoutSuccessProps {
  // success can be string, number, or object (replace `object` with a precise type if you know it)
  success: string | number | object | undefined;
}

const CheckoutSuccess = ({ success }: CheckoutSuccessProps) => {
  return <CheckoutSuccessPage order={success} />;
};

interface GetServerSidePropsResult {
  success: string | string[] | undefined;
  pageOptions: PageOptions;
}

export const getServerSideProps: GetServerSideProps<
  GetServerSidePropsResult
> = async ({ params, locale }) => {
  // Normalize success to string for title and breadcrumbs
  const successValue = Array.isArray(params?.success)
    ? params.success[0]
    : params?.success;

  const pageProps: PageOptions = {
    title: 'Order-#' + successValue,
    breadCrumbs: [
      {
        label: 'Order Placed',
      },
    ],
    showBreadcrumb: true,
  };

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      success: params?.success,
      pageOptions: pageProps,
    },
  };
};

export default CheckoutSuccess;

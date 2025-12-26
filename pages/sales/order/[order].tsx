import { PageOptions } from '@voguish/module-theme/page';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const OrderView = dynamic(
  () => import('@voguish/module-customer/Components/OrderDetail/OrderFilter')
);

interface IndexProps {
  order: string | string[] | undefined;
}

const Index = ({ order }: IndexProps) => {
  const orderId = Array.isArray(order) ? order[0] : order;
  return <OrderView orderId={orderId} />;
};

interface GetServerSidePropsResult {
  order: string | string[] | undefined;
  pageOptions: PageOptions;
}

export const getServerSideProps: GetServerSideProps<
  GetServerSidePropsResult
> = async ({ params, locale }) => {
  const pageProps: PageOptions = {
    title:
      'Order-#' +
      (Array.isArray(params?.order) ? params.order[0] : params?.order),
    breadCrumbs: [
      {
        label: 'Orders',
        url: 'sales/order/history',
      },
      {
        label: `#${Array.isArray(params?.order) ? params.order[0] : params?.order}`,
      },
    ],
    showBreadcrumb: true,
  };

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
      order: params?.order,
      pageOptions: pageProps,
    },
  };
};

export default Index;

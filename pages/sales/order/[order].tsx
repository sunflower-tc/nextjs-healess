import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const OrderView = dynamic(
  () => import('@voguish/module-customer/Components/OrderDetail/OrderFilter')
);

const Index = () => {
  const router = useRouter();
  return <OrderView orderId={router?.query?.order} />;
};
Index.pageOptions = {
  title: i18n._(t`Order`),
  description: i18n._(t`Voguish product order`),
};
export default Index;

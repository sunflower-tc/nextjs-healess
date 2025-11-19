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
  title: 'Order',
  description: 'Voguish product order',
};
export default Index;

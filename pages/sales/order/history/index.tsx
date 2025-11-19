import dynamic from 'next/dynamic';

const OrderProduct = dynamic(
  () => import('@voguish/module-customer/Components/OrderTab/OrderProduct')
);
const Order = () => {
  return (
    <>
      <OrderProduct />
    </>
  );
};

Order.pageOptions = {
  title: 'Order',
  description: 'Voguish product order',
};
export default Order;

import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
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
  title: i18n._(t`Order`),
  description: i18n._(t`Voguish product order`),
};
export default Order;

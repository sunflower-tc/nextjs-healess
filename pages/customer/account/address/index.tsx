import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import dynamic from 'next/dynamic';

const AddressList = dynamic(
  () => import('@voguish/module-customer/Components/AddressTab/AddressList')
);

const Index = () => {
  return (
    <>
      <AddressList />
    </>
  );
};
Index.pageOptions = {
  title: i18n._(t`Address`),
  description: i18n._(t`Customer Address`),
};
export default Index;

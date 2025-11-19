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
  title: 'Address',
  description: 'Customer Address',
};
export default Index;

import dynamic from 'next/dynamic';

const Wishlist = dynamic(
  () => import('@voguish/module-customer/Components/WishlistTab/Wishlist')
);

const Index = () => {
  return (
    <>
      <Wishlist />
    </>
  );
};

Index.pageOptions = {
  title: 'wishlist',
  description: 'Welcome to Voguish Theme',
};
export default Index;

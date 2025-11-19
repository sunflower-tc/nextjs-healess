import dynamic from 'next/dynamic';

const Profile = dynamic(
  () => import('@voguish/module-customer/Components/ProfileTab/Profile')
);
function Index() {
  return (
    <>
      <Profile />
    </>
  );
}
Index.pageOptions = {
  title: 'Profile',
  description: 'Customer profile',
};
export default Index;

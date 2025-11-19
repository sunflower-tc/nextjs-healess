import dynamic from 'next/dynamic';

const UserInfo = dynamic(
  () => import('@voguish/module-customer/Components/OverviewTab/UserInfo')
);

const OverView = () => {
  return (
    <>
      <UserInfo />
    </>
  );
};

OverView.pageOptions = {
  title: 'Overview',
  description: 'Welcome to Voguish customer account',
};
export default OverView;

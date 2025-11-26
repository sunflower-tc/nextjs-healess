import { IProfileProps } from '@voguish/module-marketplace';
import dynamic from 'next/dynamic';
const Content = dynamic(() => import('./ProfileContent'));
const Profile = (props: IProfileProps) => {
  const {
    id,
    rating,
    returnPolicy,
    shippingPolicy,
    contactNumber,
    email,
    loading,
  } = props;

  return (
      <Content
        id={id}
        loading={loading}
        rating={rating}
        returnPolicy={returnPolicy}
        shippingPolicy={shippingPolicy}
        contactNumber={contactNumber}
        email={email}
      />
  );
};
export default Profile;

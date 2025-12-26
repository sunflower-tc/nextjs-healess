import { IProfileProps } from '@voguish/module-marketplace/type';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
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
    products,
    aggregations,
    sort,
  } = props;

  return (
    <ErrorBoundary>
      <Content
        id={id}
        aggregations={aggregations}
        products={products}
        sort={sort}
        loading={loading}
        rating={rating}
        returnPolicy={returnPolicy}
        shippingPolicy={shippingPolicy}
        contactNumber={contactNumber}
        email={email}
      />
    </ErrorBoundary>
  );
};
export default Profile;

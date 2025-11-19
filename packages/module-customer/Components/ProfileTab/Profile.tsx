import { ProfilePlaceholder, useCustomerQuery } from '@voguish/module-customer';
import GET_CUSTOMER from '@voguish/module-customer/graphql/Customer.graphql';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Sidebar from '../Layout/Sidebar';
const EditForm = dynamic(() => import('./EditForm'));
const ProfileInfo = dynamic(() => import('./ProfileInfo'));
function Profile() {
  const [profileView, setprofileView] = useState(false);
  const { data, loading /*, error */ } = useCustomerQuery(GET_CUSTOMER);
  return (
    <Sidebar>
      {loading ? (
        <ProfilePlaceholder />
      ) : !profileView ? (
        <ProfileInfo userinfoData={data} handleClick={setprofileView} />
      ) : (
        <EditForm userinfoData={data} handleClick={setprofileView} />
      )}
    </Sidebar>
  );
}

export default Profile;

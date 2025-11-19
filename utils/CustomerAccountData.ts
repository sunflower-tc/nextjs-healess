const CustumerStaticData: CostumerData = {
  title: 'User Profile',
  buttonLabel: 'Save Changes',
  pageTitle: 'Edit Profile',
  OrderPageTitle: 'Order History',
  profilePageTitle: 'Profile',
  AddressPageTitle: 'Address Book',
  PaymentPageTitle: 'Payments Options',
  AddressBtn: 'Add new address',
  ResetPasswordTitle: 'Reset Your Password',
  SignOutBtn: 'Sign out',
};

interface CostumerData {
  title: string;
  profilePageTitle: string;
  OrderPageTitle: string;
  AddressBtn: string;
  AddressPageTitle: string;
  buttonLabel: string;
  pageTitle: string;
  PaymentPageTitle: string;
  ResetPasswordTitle: string;
  SignOutBtn: string;
}
export default CustumerStaticData;

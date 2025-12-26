import { AuthLayout } from '@voguish/module-customer/Components/AuthLayout';
import dynamic from 'next/dynamic';
import ErrorBoundary from '../components/ErrorBoundary';
import { NextPageWithLayout } from '../page';
import { LoginPlaceholder } from '@packages/placeholder/ProductDetail';
const LoginForm = dynamic(() => import('../Layout/Forms/LoginForm'), {
  loading: () => <LoginPlaceholder />,
});
const LoginAccount: NextPageWithLayout = () => {
  return (
    <ErrorBoundary>
      <AuthLayout
        height="h-[26.5rem]"
        banner="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
      >
        <ErrorBoundary>
          <LoginForm />
        </ErrorBoundary>
      </AuthLayout>
    </ErrorBoundary>
  );
};

export default LoginAccount;

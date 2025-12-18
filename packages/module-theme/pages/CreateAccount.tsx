import { AuthLayout } from '@voguish/module-customer/Components/AuthLayout';
import type { NextPageWithLayout } from '@voguish/module-theme/page';
import dynamic from 'next/dynamic';
import ErrorBoundary from '../components/ErrorBoundary';
import { LoginPlaceholder as CreateAccountPlaceholder } from '@packages/placeholder/ProductDetail';
const CreateForm = dynamic(() => import('../Layout/Forms/CreateForm'), {
  loading: () => (
    <>
      <CreateAccountPlaceholder />
      <CreateAccountPlaceholder />
    </>
  ),
});
const CreateAccount: NextPageWithLayout = () => {
  return (
    <ErrorBoundary>
      <AuthLayout
        height="!h-[52rem]"
        banner="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      >
        <ErrorBoundary>
          <CreateForm />
        </ErrorBoundary>
      </AuthLayout>
    </ErrorBoundary>
  );
};

export default CreateAccount;

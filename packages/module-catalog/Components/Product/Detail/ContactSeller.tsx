import SellerContactForm from '@voguish/module-marketplace/Components/form/ContactSellerForm';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';

const ContactSeller = ({
  handleClose,
  open,
  id,
}: {
  open: any;
  id: string;
  handleClose: any;
}) => {
  return (
    <ErrorBoundary>
      <ErrorBoundary>
        <SellerContactForm handleClose={handleClose} open={open} id={id} />
      </ErrorBoundary>
    </ErrorBoundary>
  );
};
export default ContactSeller;

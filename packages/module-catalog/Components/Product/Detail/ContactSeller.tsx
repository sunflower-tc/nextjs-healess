import SellerContactForm from '@voguish/module-marketplace/Components/form/ContactSellerForm';

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
    <>
      <SellerContactForm handleClose={handleClose} open={open} id={id} />
    </>
  );
};
export default ContactSeller;

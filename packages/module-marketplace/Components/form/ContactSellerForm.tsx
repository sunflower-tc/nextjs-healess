import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useCustomerMutation } from '@voguish/module-customer/hooks/useCustomerMutation';
import CONTACT_SELLER from '@voguish/module-marketplace/graphql/mutation/ContactSeller.graphql';
import { RightIcon } from '@voguish/module-theme/components/elements/Icon';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import Modal from '@voguish/module-theme/components/Modal';
import { useToast } from '@voguish/module-theme/components/toast/hooks';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { FieldValues, useForm } from 'react-hook-form';
const RotateRight = dynamic(() => import('@mui/icons-material/RotateRight'));

const SellerContactForm = ({
  id,
  handleClose,
  open,
}: {
  id: string;
  handleClose: any;
  open: boolean;
}) => {
  const [contactSeller, { error }] = useCustomerMutation(CONTACT_SELLER);
  const { t } = useTranslation('common');

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { showToast } = useToast();

  const contactSellerForm = (data: FieldValues) => {
    contactSeller({
      variables: {
        subject: data['subject'],
        query: data['query'],
        sellerId: Number(id),
      },
    })
      .then((res) => {
        if (res?.data?.contactSellerBySellerId?.message) {
          showToast({
            message: res?.data?.contactSellerBySellerId?.message,
            type: 'success',
          });
          reset();
          handleClose();
        }
      })
      .catch(() => {
        if (error) {
          showToast({
            message: `${error?.message || JSON.stringify(error)}`,
            type: 'error',
          });
        }
      });
  };
  const onClose = () => {
    handleClose();
    reset();
  };
  return (
    <ErrorBoundary>
      <Modal
        showModal={open}
        hideModal={onClose}
        title={
          <ErrorBoundary>
            {' '}
            <span
              className="flex cursor-pointer sm:hidden"
              onClick={() => {
                onClose();
              }}
            >
              <RightIcon />
            </span>{' '}
            {t('Contact Seller')}{' '}
          </ErrorBoundary>
        }
      >
        <form
          className="h-full mt-4 -sm:mb-4 -sm:px-6"
          onSubmit={handleSubmit(contactSellerForm)}
        >
          <div className="flex flex-col gap-2.5">
            <InputField
              label={t('Subject')}
              type="text"
              placeHolder={t('Enter Subject')}
              error={errors?.subject?.message ? true : false}
              helperText={errors?.subject ? errors?.subject?.message : ''}
              {...register('subject', {
                required: t('* Subject is required'),
              })}
            />

            <InputField
              label={t('Query')}
              type="text"
              multiline={true}
              maxRows={3}
              className="h-auto"
              minRows={3}
              placeHolder={t('Enter Query')}
              error={errors?.query?.message ? true : false}
              helperText={errors?.query ? errors?.query?.message : ''}
              {...register('query', {
                required: t('* Query is required'),
              })}
            />
          </div>
          <Grid className="flex items-center justify-end gap-6 sm:py-4 -sm:mt-8">
            <Button
              className="float-left hidden w-32 rounded-[unset] border border-solid border-darkGreyBackground text-darkGreyBackground hover:border-darkBackground hover:bg-darkBackground hover:text-white sm:flex md:float-right md:w-40 lg:float-right lg:w-40 xl:float-right xl:w-40"
              variant="outlined"
              onClick={onClose}
            >
              {t('Cancel')}
            </Button>
            {isSubmitting ? (
              <Button
                className="w-full rounded-[unset] shadow-[unset] sm:w-32 md:w-40 lg:w-40 xl:w-40"
                variant="contained"
                type="submit"
              >
                <span className="flex items-center h-full ltr:pr-2 rtl:pl-2">
                  <RotateRight className="w-5 h-5 animate-spin" />
                </span>
                {t('Sending...')}
              </Button>
            ) : (
              <Button
                className="w-full rounded-[unset] shadow-[unset] sm:w-32 md:w-40 lg:w-40 xl:w-40"
                variant="contained"
                type="submit"
              >
                {t('Submit')}
              </Button>
            )}
          </Grid>
        </form>
      </Modal>
    </ErrorBoundary>
  );
};
export default SellerContactForm;

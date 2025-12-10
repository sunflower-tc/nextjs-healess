import { useMutation } from '@apollo/client';
import { Trans, t } from '@lingui/macro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
// import { common } from '@mui/material/colors';
import { showToast } from '@utils/Helper';
import CONTACT_SELLER from '@voguish/module-marketplace/graphql/mutation/ContactSeller.graphql';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import React from 'react';
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
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [contactSeller, { error }] = useMutation(CONTACT_SELLER, {
    context: {
      headers: {
        // To pass session token
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const registerUser = (data: FieldValues) => {
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
          showToast({ message: error.message, type: 'error' });
        }
      });
  };
  const onClose = () => {
    handleClose();
    reset();
  };
  return (
    <React.Fragment>
      <Modal
        open={open}
        className="flex items-center justify-center"
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="p-10 bg-white">
          <Box
            component="form"
            className="flex flex-col gap-6 h-fit"
            noValidate
            onSubmit={handleSubmit(registerUser)}
            sx={{ width: '100%' }}
          >
            <Typography variant="h2">
              <Trans>Contact Seller</Trans>
            </Typography>
            <div className="flex flex-col gap-2.5">
              <InputField
                label={t`Subject`}
                type="text"
                placeHolder="Enter Subject"
                error={errors?.subject?.message ? true : false}
                helperText={errors?.subject ? errors?.subject?.message : ''}
                {...register('subject', {
                  required: t`* Subject is required`,
                })}
              />

              <InputField
                label={t`Query`}
                type="text"
                multiline={true}
                maxRows={3}
                className="h-auto"
                minRows={3}
                placeHolder="Enter Query"
                error={errors?.query?.message ? true : false}
                helperText={errors?.query ? errors?.query?.message : ''}
                {...register('query', {
                  required: t`* Query is required`,
                })}
              />
            </div>
            <div className="flex items-center justify-end flex-1 gap-4 pt-2.5">
              <Button
                className="text-center text-black border-black rounded-none max-w-fit"
                variant="outlined"
                type="reset"
                onClick={onClose}
                sx={{ px: 6, py: 1.2 }}
              >
                <Trans>Cancel</Trans>
              </Button>
              {isSubmitting ? (
                <Button
                  className="bg-brand rounded-[unset] max-w-fit"
                  variant="contained"
                  type="submit"
                  sx={{ px: 6, py: 1.2 }}
                >
                  <span className="flex items-center h-full pr-2">
                    <RotateRight className="w-5 h-5 animate-spin" />
                  </span>
                  <Trans>Submitting your Query...</Trans>
                </Button>
              ) : (
                <Button
                  className="bg-brand rounded-[unset] max-w-fit"
                  variant="contained"
                  type="submit"
                  sx={{ px: 6, py: 1.2 }}
                >
                  <Trans>Submit</Trans>
                </Button>
              )}
            </div>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
export default SellerContactForm;

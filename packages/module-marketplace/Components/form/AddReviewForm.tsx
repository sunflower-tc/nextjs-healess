import { useMutation } from '@apollo/client';
import { Trans, t } from '@lingui/macro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { showToast } from '@utils/Helper';
import { useToken } from '@voguish/module-customer';
import ADD_SELLER_REVIEW from '@voguish/module-marketplace/graphql/mutation/AddSellerReviews.graphql';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import RatingInputField from '@voguish/module-theme/components/ui/Form/Elements/Rating';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const RotateRight = dynamic(() => import('@mui/icons-material/RotateRight'));
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  outline: 'none',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '99%', sm: '90%', md: '60%', lg: '40%' },
  maxWidth: 'md',
  bgcolor: 'background.paper',
  p: { xs: 2, sm: 2, md: 3, lg: 3, xl: 3 },
  maxHeight: '95%',
  minHeight: '50%',
  border: 'none',
  overflowY: { xs: 'scroll' },
  overflowX: 'hidden',
};

const AddReviewForm = ({ submitReview, open, setOpen }: any) => {
  const {
    setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const token = useToken();
  const router = useRouter();

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value; // Get the new value from the event
    setValue('feed_quality', newValue ? Number(newValue) * 20 : 0); // Update the form state with the new value
  };
  const handlePriceRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value; // Get the new value from the event
    setValue('feed_price', newValue ? Number(newValue) * 20 : 0); // Update the form state with the new value
  };
  const handleValueRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value; // Get the new value from the event
    setValue('feed_value', newValue ? Number(newValue) * 20 : 0); // Update the form state with the new value
  };
  const userName = useSelector((state: RootState) => state.user.name);

  const userEmail = useSelector((state: RootState) => state.user.email);

  const [addReview, { error }] = useMutation(ADD_SELLER_REVIEW);

  const submitReviewHandler = async (data: FieldValues) => {
    if (token) {
      data['buyer_email'] = userEmail;

      addReview({
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
        variables: {
          feedback: data,
          sellerId: submitReview,
        },
      })
        .then(() => {
          showToast({ message: 'Review Added Successfully !' });
          reset();
          setOpen(false);
        })
        .catch(() => {
          showToast({ message: error?.message, type: 'error' });
        });
    } else {
      router?.push('customer/account/login');
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            noValidate
            className="min-h-[100%]"
            onSubmit={handleSubmit(submitReviewHandler)}
            sx={{ width: '100%', position: 'relative' }}
          >
            <Typography variant="h2">
              <Trans>Add Your Review</Trans>
            </Typography>
            <FormGroup sx={{ mt: 1 }}>
              <Box className="md:flex" sx={{ gap: 5 }}>
                <RatingInputField
                  label={t`Price`}
                  id="price-rating"
                  {...register('feed_price', {
                    value: 0,
                    onChange: handlePriceRatingChange,
                  })}
                />
                <RatingInputField
                  label={t`Quality`}
                  id="quality-rating"
                  {...register('feed_quality', {
                    value: 0,
                    onChange: handleRatingChange,
                  })}
                />
              </Box>
              <Box sx={{ pt: 1 }}>
                <RatingInputField
                  label={t`Value`}
                  id="value-rating"
                  {...register('feed_value', {
                    value: 0,
                    onChange: handleValueRatingChange,
                  })}
                />
              </Box>
              <Grid sx={{ pt: 2 }} className="grid gap-3">
                <Grid className="grid gap-1">
                  <InputField
                    label={t`Nickname`}
                    type="text"
                    placeHolder={t`Enter Your Nickname`}
                    sx={{ height: '12px', marginTop: '8px', paddingBottom: 5 }}
                    defaultValue={userName || ''}
                    error={errors?.feed_nickname?.message ? true : false}
                    helperText={
                      errors?.feed_nickname
                        ? errors?.feed_nickname?.message
                        : ''
                    }
                    {...register('feed_nickname', {
                      required: t`* Nickname is required`,
                    })}
                  />{' '}
                </Grid>{' '}
                <Grid className="grid gap-1">
                  <InputField
                    label={t`Summary`}
                    type="text"
                    sx={{ height: '12px' }}
                    error={errors?.feed_summary?.message ? true : false}
                    helperText={
                      errors?.feed_summary ? errors?.feed_summary?.message : ''
                    }
                    placeHolder={t`Enter review summary`}
                    {...register('feed_summary', {
                      required: t`* Summary is required`,
                    })}
                  />
                </Grid>
                <Grid className="grid gap-1">
                  <label className="pt-2 text-[1.25rem]" htmlFor="text">
                    Your Review
                  </label>

                  <TextField
                    multiline
                    rows={2}
                    placeholder={t`Review Description`}
                    type="text"
                    error={errors?.text ? true : false}
                    {...register('feed_review')}
                  />
                </Grid>
              </Grid>
              {isSubmitting ? (
                <Button
                  className="bg-brand mt-4 rounded-[unset] shadow-none"
                  variant="contained"
                  type="submit"
                  sx={{ px: 6, py: 1.2 }}
                >
                  <span className="flex items-center h-full pr-2">
                    <RotateRight className="w-5 h-5 animate-spin" />
                  </span>
                  <Trans>Submitting your Review...</Trans>
                </Button>
              ) : (
                <Box
                  sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}
                >
                  <Box>
                    <Button
                      className="mt-4 rounded-[unset] shadow-none"
                      variant="contained"
                      color="inherit"
                      type="button"
                      onClick={() => setOpen(false)}
                      sx={{ px: 6, py: 1.2, mt: 2 }}
                    >
                      <Trans>Cancel</Trans>
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      className="bg-brand mt-4 rounded-[unset] shadow-none"
                      variant="contained"
                      type="submit"
                      sx={{ px: 6, py: 1.2, mt: 2 }}
                    >
                      <Trans>Submit</Trans>
                    </Button>
                  </Box>
                </Box>
              )}
            </FormGroup>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default AddReviewForm;

import { useMutation } from '@apollo/client';
import { Trans, t } from '@lingui/macro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { isValidArray, showToast } from '@utils/Helper';
import CreateProductReview from '@voguish/module-catalog/graphql/CreateProductReview.graphql';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../ui/Form/Elements/Input';
import { ReviewRating } from '../../ui/ReviewRating';
interface PropData {
  ratingsFields?: [] | object | any;
  openForm?: any;
  open?: boolean | any;
  productName?: string;
  sku?: string;
}
export const ProductReviewForm = (props: PropData) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [Ratingvalue, setRatingvalue] = useState<number | null>(0);

  const [addReview] = useMutation(CreateProductReview);
  /**
   * Form Submit Handler
   *
   * @param {Object} e event
   */
  const submitHandler = (data: [] | object | any) => {
    const ratingsFields: RatingFieldProp = props.ratingsFields;
    let formData: any = {};

    for (const item in data) {
      if (item.includes('ratings__')) {
        const key: any | [] = item.split('ratings__');
        const values: any | [] | object = ratingsFields.find(
          (field) => field.id == key[1]
        );
        const keys: any | [] | object = values.values.find(
          (value: RatingProp) => value.value == Ratingvalue
        );
        if (isValidArray(formData['ratings'])) {
          formData['ratings'] = [
            ...formData['ratings'],
            { id: key[1], value_id: keys?.value_id },
          ];
        } else {
          formData['ratings'] = [{ id: key[1], value_id: keys?.value_id }];
        }
      } else {
        formData[item] = data[item];
      }
    }

    addReview({
      variables: { input: formData },
    })
      .then(() => {
        showToast({
          type: 'success',
          message: t`Review created successfully`,
        });
      })
      .catch((err) => {
        showToast({ message: err.message, type: 'error' });
      });
    reset();
    setTimeout(() => props.openForm(), 1000);
  };

  return (
    <Modal
      open={props.open}
      onClose={props.openForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid className="flex items-center justify-center w-screen h-screen">
        <Box
          className=" rounded -translate-y-1 min-w-[30%] -sm:min-w-full max-w-[80%] p-4"
          sx={{
            bgcolor: 'background.paper',
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(submitHandler)}
            sx={{ mt: '0px', width: '100%' }}
          >
            <Grid className="relative flex items-center justify-between">
              <Typography variant="h2" className="text-lg font-semibold">
                <Trans>Add Your Review</Trans>
              </Typography>
            </Grid>
            <FormGroup sx={{ mt: 1 }}>
              <input type="hidden" {...register('sku', { value: props.sku })} />
              <label htmlFor="ratings__NA==" className="mt-2 max-w-fit">
                <Trans>Rating</Trans>
              </label>
              <input
                type="hidden"
                {...register('ratings__NA==', { value: Ratingvalue })}
              />
              <div className="truncate max-w-[9.75rem]">
                <ReviewRating
                  Ratingvalue={Ratingvalue || 0}
                  setRatingvalue={setRatingvalue}
                />
              </div>
              <InputField
                label="Name"
                {...register('nickname', {
                  required: t`*Please provide your name`,
                })}
                type="text"
                className="mb-2"
                placeHolder={t`Enter your nickName`}
                error={errors?.nickname?.message ? true : false}
                helperText={errors?.nickname ? errors?.nickname?.message : ''}
              />

              <InputField
                label="Feedback Summary"
                placeHolder={t`Write a summary`}
                type="text"
                className="mb-2"
                error={errors?.summary?.message ? true : false}
                helperText={errors?.summary ? errors?.summary?.message : ''}
                {...register('summary', {
                  required: t`*Please provide your heading for review`,
                })}
              />
              <label className="pb-1 text-[1rem]" htmlFor="text">
                Feedback
              </label>
              <TextField
                multiline
                rows={2}
                placeholder={t`Review Description`}
                type="text"
                error={errors?.text ? true : false}
                {...register('text')}
              />
              <div className="flex items-center mt-8 mb-[10px] justify-end gap-4">
                <Button
                  className="w-1/3 shadow-none hover:contrast-125 py-2 rounded-[unset] text-black border-black outline-none"
                  variant="outlined"
                  type="reset"
                  onClick={props.openForm}
                >
                  <Trans>Cancel</Trans>
                </Button>
                <Button
                  className="bg-brand w-1/3 border border-solid py-2 border-brand shadow-none hover:contrast-125 hover:bg-brand rounded-[unset]"
                  variant="contained"
                  type="submit"
                >
                  <Trans>Submit</Trans>
                </Button>
              </div>
            </FormGroup>
          </Box>
        </Box>
      </Grid>
    </Modal>
  );
};

interface RatingProp {
  value_id: string | number;
  value: string | number;
  map: [] | object | any;
}
interface RatingFieldProp {
  find(arg0: (field: any) => boolean): any;
  id?: string | number;
  values?: RatingProp;
  name?: string | number;
}

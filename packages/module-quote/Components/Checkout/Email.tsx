import Grid from '@mui/material/Grid';
import { CheckoutStepEmail } from '@voguish/module-quote/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import InputField from '@voguish/module-theme/components/ui/Form/Elements/Input';
import { useTranslation } from 'next-i18next';
import { FieldValues, useForm } from 'react-hook-form';
import { useSetGuestEmailOnCart } from '../../hooks/cart-handler';
import FormActions from './FormActions';
import FormWrapper from './FormWrapper';
const Email = ({
  isAccountLoggedIn,
  email,
  cartId,
  handleNext,
  handlePrev,
}: CheckoutStepEmail) => {
  /**
   * Form hooks for validation form
   *
   * * register: to register the form element
   * * handleSubmit: to handle the form submit.
   * * getValues: to get form values
   * * formState: valid and errors will be returned.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setGuestEmailHandler, isInProcess } = useSetGuestEmailOnCart(
    cartId,
    handleNext
  );
  const { t } = useTranslation('common');

  /**
   * Set Email on blur
   */
  const addGuestEmail = async (data: FieldValues) => {
    if (!isAccountLoggedIn && data.email && !isInProcess) {
      await setGuestEmailHandler(data.email);
    }
  };

  return (
    <ErrorBoundary>
      <form onSubmit={handleSubmit(addGuestEmail)}>
        <FormWrapper>
          <Grid>
            <label htmlFor="email">{t('Email')}</label>
            <InputField
              className="mt-1 placeholder:text-CheckoutPlaceHolder"
              type="text"
              placeHolder={t('Email')}
              error={errors?.email?.message ? true : false}
              helperText={errors?.email ? errors?.email?.message : ''}
              {...register('email', {
                required: t('* Email is required'),
                value: email,
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: t('Please enter a valid email'),
                },
              })}
            />
          </Grid>
        </FormWrapper>
        <FormActions
          initialStep
          process={isInProcess}
          handlePrev={handlePrev}
        />
      </form>
    </ErrorBoundary>
  );
};
export default Email;

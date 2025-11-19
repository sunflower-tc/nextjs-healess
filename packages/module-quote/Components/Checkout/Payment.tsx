import { Trans, t } from '@lingui/macro';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useSetPaymentMethodOnCart } from '@voguish/module-quote/hooks';
import { CheckoutStepPayment } from '@voguish/module-quote/types';
import { RadioInputField, RadioOptions } from '@voguish/module-theme';
import { FieldValues, useForm } from 'react-hook-form';
import FormActions from './FormActions';
import FormWrapper from './FormWrapper';

const Payment = ({
  handlePrev,
  handleNext,
  cartId,
  availablePaymentMethods,
  selectedPaymentMethod,
}: CheckoutStepPayment) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const { setPaymentMethodsHandler, isInProcess } = useSetPaymentMethodOnCart();

  const selectPaymentMethod = async (data: FieldValues) => {
    if (data.paymentMethod) {
      await setPaymentMethodsHandler({
        cartId,
        paymentMethod: { code: data.paymentMethod },
      });
      handleNext();
    }
  };

  const paymentMethodOptions: RadioOptions[] = availablePaymentMethods?.map(
    (paymentMethod) => ({
      label: paymentMethod.title,
      value: paymentMethod.code,
    })
  );

  const selectedPayment =
    selectedPaymentMethod.code || paymentMethodOptions?.[0]?.value;

  return (
    <form onSubmit={handleSubmit(selectPaymentMethod)}>
      <FormWrapper>
        <Box sx={{ mt: 1, width: '100%' }}>
          <Typography variant="subtitle1">
            <Trans>Payment Option</Trans>
          </Typography>
          <Grid
            sx={{ 'div:last-child': { display: 'grid' } }}
            justifyContent={{ md: 'space-between' }}
          >
            <RadioInputField
              defaultValue={selectedPayment}
              {...register('paymentMethod', {
                required: t`Select Payment Method`,
              })}
              id="payment-method-1"
              row
              options={paymentMethodOptions}
            />
          </Grid>
        </Box>
      </FormWrapper>
      <FormActions
        process={isInProcess}
        stepLabel={t`Reture to Billing Address`}
        handlePrev={handlePrev}
      />
    </form>
  );
};
export default Payment;

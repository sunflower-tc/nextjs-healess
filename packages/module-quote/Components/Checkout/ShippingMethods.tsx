import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import { CheckoutStepShipMethods } from '@voguish/module-quote/types';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import {
  IRadioOptions,
  RadioFieldElement,
} from '@voguish/module-theme/components/ui/Form/Elements';
import { useTranslation } from 'next-i18next';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useSetShippingMethodOnCart } from '../../hooks';
import FormActions from './FormActions';
import FormWrapper from './FormWrapper';
const ShippingMethods = ({
  handlePrev,
  availableShippingMethods,
  cartId,
  selectedShippingMethod,
  handleNext,
}: CheckoutStepShipMethods) => {
  const { t } = useTranslation('common');

  /**
   * Apply shipping hook
   * ! Callback function need to coupon code and cartId and quantity.
   */
  const { setShippingMethodsHandler, isInProcess } =
    useSetShippingMethodOnCart(handleNext);

  const selectedShipping = selectedShippingMethod?.carrier_code
    ? `${selectedShippingMethod?.carrier_code}__${selectedShippingMethod?.method_code}`
    : `${availableShippingMethods?.[0].carrier_code}__${availableShippingMethods?.[0].method_code}`;

  /**
   * Show Loading while request for submitting the request
   */

  const methods = useForm<{ shippingMethod: string }>({
    defaultValues: { shippingMethod: selectedShipping },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const selectShipping = async (data: FieldValues) => {
    if (data.shippingMethod) {
      const methods = data?.shippingMethod?.split('__');
      await setShippingMethodsHandler({
        cartId,
        shippingMethods: [
          { carrier_code: methods[0], method_code: methods[1] },
        ],
      });
    }
  };

  const shippingMethods: IRadioOptions[] =
    availableShippingMethods
      ?.filter((shippingMethod) => shippingMethod?.available)
      .map((shippingMethod) => ({
        value: `${shippingMethod?.carrier_code}__${shippingMethod?.method_code}`,
        label: shippingMethod?.carrier_title,
        id: shippingMethod?.method_code,
      })) || [];

  return (
    <ErrorBoundary>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(selectShipping)}>
          <FormWrapper>
            <Grid
              className="items-center border-neutral-800"
              sx={{ 'div:last-child': { display: 'grid' } }}
              justifyContent={{ md: 'space-between' }}
            >
              <RadioFieldElement
                name="shippingMethod"
                required
                options={shippingMethods}
              />
            </Grid>
            <FormHelperText>
              {errors?.shippingMethod?.message || ''}
            </FormHelperText>
          </FormWrapper>
          <FormActions
            stepLabel={t('Return to shipping address')}
            process={isInProcess}
            handlePrev={handlePrev}
          />
        </form>
      </FormProvider>
    </ErrorBoundary>
  );
};
export default ShippingMethods;

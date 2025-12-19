import { Trans, t } from '@lingui/macro';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { graphqlRequest } from '@utils/Fetcher';
import { isValidArray, isValidObject, parseAddress } from '@utils/Helper';
import { useCustomerQuery } from '@voguish/module-customer';
import {
  default as CustomerAddressQuery,
  default as GET_CUSTOMER_ADDRESS,
} from '@voguish/module-customer/graphql/CustomerAddress.graphql';
import { useToken } from '@voguish/module-customer/hooks/useToken';
import { CheckoutLayout, CheckoutStep, EmptyCart } from '@voguish/module-quote';
import Containers from '@voguish/module-theme/components/ui/Container';
import { getSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
const OrderSummary = dynamic(
  () => import('@voguish/module-quote/Components/Checkout/OrderSummary')
);
const Stepper = dynamic(() => import('@mui/material/Stepper'));
const StepContent = dynamic(() => import('@mui/material/StepContent'));
const StepLabel = dynamic(() => import('@mui/material/StepLabel'));
const Step = dynamic(() => import('@mui/material/Step'));

const Email = dynamic(
  () => import('@voguish/module-quote/Components/Checkout/Email')
);
const Payment = dynamic(
  () => import('@voguish/module-quote/Components/Checkout/Payment')
);
const BillingAddress = dynamic(
  () =>
    import('@voguish/module-quote/Components/Checkout/Address/BillingAddress')
);
const ShippingAddress = dynamic(
  () =>
    import('@voguish/module-quote/Components/Checkout/Address/ShippingAddress')
);
const ShippingMethods = dynamic(
  () => import('@voguish/module-quote/Components/Checkout/ShippingMethods')
);
// const ReviewOrder = dynamic(
//   () => import('@voguish/module-quote/Components/Checkout/ReviewOrder')
// );
interface PageInterface {
  props?: any;
  req?: any;
  params?: any;
  customerAddressesData?: any;
}

const CheckoutHome = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [show, setShow] = useState(false);
  const SHowItems = () => {
    setShow(!show);
  };

  const token = useToken();

  const { data: customerAddress, refetch } =
    useCustomerQuery(GET_CUSTOMER_ADDRESS);

  const addresses = customerAddress?.customer?.addresses || [];
  /**
   * Fetching cart date from redux
   */
  const quote = useSelector((state: RootState) => state.cart?.quote || null);

  // for develop payment
  useEffect(() => {
    setActiveStep(3)
  }, [])

  if (!isValidObject(quote) || !isValidArray(quote?.items)) {
    return <EmptyCart />;
  }

  /**
   * Handle Stepper Form to Next step
   */
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  /**
   * Handle Stepper Form to Prev step
   */
  const handlePrev = () => {
    if (activeStep === 0) {
      Router.push('/checkout/cart');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  let steps: CheckoutStep[] = quote
    ? [
      {
        index: 'DETAILS',
        label: t`Personal Details`,
        content: (
          <Email
            isAccountLoggedIn={!!token}
            handleNext={handleNext}
            email={quote?.email}
            cartId={quote?.id}
            handlePrev={handlePrev}
          />
        ),
      },
      {
        label: t`Billing Address`,
        index: 'BILLING-ADDRESS',
        content: (
          <BillingAddress
            isAccountLoggedIn={!token}
            cartId={quote.id}
            addresses={addresses}
            selectedShippingAddress={parseAddress(
              quote.shipping_addresses?.[0]
            )}
            selectedBillingAddress={parseAddress(quote.billing_address)}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        ),
      },
      {
        label: t`Payment`,
        index: 'PAYMENT',
        content: (
          <Payment
            isAccountLoggedIn={!token}
            availablePaymentMethods={quote?.available_payment_methods}
            cartId={quote.id}
            token={token || ''}
            handleNext={handleNext}
            selectedPaymentMethod={quote?.selected_payment_method}
            handlePrev={handlePrev}
          />
        ),
      },
      // {
      //   label: t`Review Order`,
      //   index: 'REVIEW-ORDER',
      //   content: (
      //     <ReviewOrder
      //       cartId={quote.id}
      //       token={token || ''}
      //       isVirtual={quote?.is_virtual}
      //       handleNext={handleNext}
      //       handlePrev={handlePrev}
      //       isAccountLoggedIn={!token}
      //       selectedShippingAddress={quote.shipping_addresses?.[0]}
      //       selectedPaymentMethod={quote?.selected_payment_method}
      //       selectedShippingMethod={
      //         quote.shipping_addresses?.[0]?.selected_shipping_method
      //       }
      //     />
      //   ),
      // },
    ]
    : [];

  if (quote && !quote.is_virtual) {
    steps.splice(1, 0, {
      label: t`Shipping Address`,
      index: 'SHIPPING-ADDRESS',
      content: (
        <ShippingAddress
          isAccountLoggedIn={!!token}
          addresses={addresses}
          cartId={quote.id}
          token={token || ''}
          selectedShippingAddress={parseAddress(
            quote.shipping_addresses?.[0]
          )}
          refetchAddress={refetch}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      ),
    },
      !quote.is_virtual && {
        label: t`Shipping Method`,
        index: 'SHIPPING-METHOD',
        content: (
          <ShippingMethods
            isAccountLoggedIn={!token}
            token={token || ''}
            cartId={quote.id}
            availableShippingMethods={
              quote.shipping_addresses?.[0]?.available_shipping_methods
            }
            selectedShippingMethod={
              quote.shipping_addresses?.[0]?.selected_shipping_method
            }
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        ),
      }
    );
  }

  if (token) {
    steps = steps.filter((object) => {
      return object?.label !== t`Personal Details`;
    });
  }

  return (
    <Containers className="pb-0 -lg:-mb-12">
      <Typography className="mb-4 -lg:-mt-4" variant="h2">
        <Trans>Checkout</Trans>
      </Typography>
      <div className="lg:grid -lg:flex -lg:flex-col gap-7 lg:grid-cols-8">
        <div className="mx-3 lg:hidden">
          <OrderSummary onClick={SHowItems} show={show} />
        </div>
        <div className="lg:col-span-5">
          <CheckoutLayout>
            <Box sx={{ minWidth: '100%', m: 0 }}>
              <Stepper
                sx={{
                  '.MuiStepConnector-root': {
                    // borderLeft: '1px solid #c6c6c6',
                    ml: 1.5,
                    display: { xs: 'none', lg: 'flex' },
                    boxShadow: 'unset',
                  },
                }}
                activeStep={activeStep}
                orientation="vertical"
              >
                {steps.map((step, index) => (
                  <Step className=" -lg:my-3" key={step.index}>
                    <StepLabel
                      icon={
                        activeStep <= index ? (
                          <CheckCircleIcon className="ml-px bg-white rounded-full -lg:hidden" />
                        ) : (
                          <CheckCircleIcon className="ml-px bg-white rounded-full -lg:hidden text-iconCheckout" />
                        )
                      }
                      StepIconProps={{
                        classes: {
                          root: '-lg:hidden ',
                        },
                      }}
                      className="pt-1 [&>span]:!border-checkoutBorder"
                      sx={{
                        ' > span:last-child': {
                          m: '0px 8px 0px 0.29rem',

                          border: '1px solid',
                          borderRadius: 0.5,
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                          mb: -1.125,
                        },
                      }}
                    >
                      <Typography
                        className="p-2 text-CheckoutLabel"
                        fontSize={16}
                        fontWeight={600}
                      >
                        {step.label}
                      </Typography>
                    </StepLabel>
                    <StepContent className="checkoutLayout">
                      {step.content}
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </CheckoutLayout>
        </div>
        <div className=" -lg:hidden lg:col-span-3">
          <OrderSummary />
        </div>
      </div>
    </Containers>
  );
};

export default CheckoutHome;

/**
 * Generating data at build time.
 *
 * Fetching Customer Address at SSR
 * @param {Object} Context - props
 * @returns {customerAddresses, countries}
 */
export async function getServerSideProps({ req }: PageInterface) {
  const session = await getSession({ req });
  const token = session?.user?.token || null;
  const data = token
    ? await graphqlRequest({
      query: CustomerAddressQuery,
      options: {
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        fetchPolicy: 'network-only',
      },
    })
    : null;
  return {
    props: {
      customerAddressesData: data || null,
    },
  };
}

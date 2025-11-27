import { Trans } from '@lingui/macro';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { getFormattedPrice, isValidArray } from '@utils/Helper';
import { EmptyCart } from '@voguish/module-quote';
import Containers from '@voguish/module-theme/components/ui/Container';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const CartTotals = dynamic(
  () => import('@voguish/module-quote/Components/Cart/CartTotal')
);
const CartDiscount = dynamic(
  () => import('@voguish/module-quote/Components/Cart/CartDiscount')
);
const CartItem = dynamic(
  () => import('@voguish/module-quote/Components/Cart/CartItem')
);
const AppliedCoupons = dynamic(
  () => import('@voguish/module-quote/Components/Cart/AppliedCoupons')
);
export function CartPage() {
  /**
   * Fetching cart date from redux
   */
  const quote = useSelector((state: RootState) => state.cart?.quote || null);
  const grandTotal = quote?.prices?.grand_total?.value
    ? getFormattedPrice(
      quote.prices.grand_total.value,
      quote.prices.grand_total.currency
    )
    : getFormattedPrice(0, 'USD');
  /**
   * Cart Items
   */
  const cartItems = quote?.items || [];

  return (
    <Containers>
      <Typography variant="h2" component="h1" className="pb-10 -mt-5">
        <Trans>Shopping Cart</Trans>
      </Typography>
      {quote && cartItems.length > 0 ? (
        <div className="grid gap-10 -mx-2 lg:gap-16 xl:gap-24 md:grid-cols-8 scroll-smooth">
          <div className="md:col-span-5">
            <div className="grid gap-6">
              {cartItems?.map((item: [] | object | any) => (
                <div
                  className="relative p-3 mx-2 border border-solid rounded border-commonBorder"
                  key={item.cartItemId}
                >
                  <CartItem
                    cartItem={item}
                    page={true}
                    showAddToActions={true}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full mx-auto md:col-span-3">
            <div className="md:sticky md:top-16 ">
              <Accordion
                defaultExpanded={true}
                elevation={0}
                className="min-w-0 px-0 pt-0 mx-1 mt-0"
              >
                <AccordionSummary
                  className="mx-0 px-0 min-w-0 py-1 mt-0 pt-0 shadow-[unset]"
                  expandIcon={<ExpandMoreIcon className="mx-1.5" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="body1" className="px-2.5 font-semibold">
                    Cart Overview
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="px-0 mx-0 -mt-4">
                  <Divider className="mx-2.5" />
                  <div className="flex items-center min-w-full md:mx-auto">
                    <CartDiscount appliedCoupons={quote.applied_coupons} />
                  </div>
                  <div className="w-full py-6 border-0">
                    <CartTotals quote={quote} />
                  </div>
                  <div className="flex flex-col items-center w-full ">
                    <div className="flex flex-col items-center justify-center min-w-full gap-6">
                      {quote.applied_coupons &&
                        isValidArray(quote.applied_coupons) > 0 && (
                          <AppliedCoupons
                            appliedCoupons={quote.applied_coupons}
                          />
                        )}
                      <div className="flex pt-1 justify-between md:w-[95%] w-[95.3%] pb-8 border-0 border-b border-solid border-commonBorder">
                        <Typography variant="h3" className="font-bold">
                          <Trans>Total :</Trans>
                        </Typography>
                        <Typography variant="h3" className="font-bold">
                          {grandTotal}
                        </Typography>
                      </div>

                      <div className="flex flex-col items-center w-full gap-4 ">
                        {isValidArray(cartItems) && (
                          <Link
                            href="/checkout"
                            className="md:w-[94%] w-[94.85%]"
                          >
                            <Button
                              variant="contained"
                              className="w-full rounded-none shadow-none"
                            >
                              <Trans>Checkout</Trans>
                            </Button>
                          </Link>
                        )}
                        <Link href="/" className="md:w-[94%] w-[94.85%]">
                          <Button
                            variant="outlined"
                            className="w-full text-black border-black rounded-none shadow-none"
                          >
                            <Trans>Back To Shopping</Trans>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      ) : (
        <span className="flex max-w-2xl mx-auto">
          <EmptyCart />
        </span>
      )}
    </Containers>
  );
}

export default CartPage;

/**
 * Generating data at build time.
 *
 * @param {*} param0
 * @returns {JSON} props
 */
export async function getStaticProps() {
  return {
    props: {},
  };
}

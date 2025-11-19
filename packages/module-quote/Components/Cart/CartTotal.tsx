import { Trans } from '@lingui/macro';
import Typography from '@mui/material/Typography';
import { getFormattedPrice, isValidArray } from '@utils/Helper';

export const CartTotals = ({ quote }: any) => {
  /**
   * Fetching Shipping Amount
   */
  const shippingPrice =
    quote?.shipping_addresses?.[0]?.selected_shipping_method?.amount?.value ||
    0;

  /**
   * shipping
   */
  const shipping = getFormattedPrice(
    shippingPrice,
    quote?.prices?.subtotal_excluding_tax?.currency || 'USD',
    false
  );

  /**
   * Fetching Tax Amount
   */
  const taxPrice = isValidArray(quote?.prices?.applied_taxes || null)
    ? quote?.prices?.applied_taxes.reduce(
        (previousTax: any, currentTax: any) =>
          previousTax?.amount?.value || 0 + currentTax?.amount?.value || 0,
        0
      )
    : 0;

  /**
   * Tax Amount
   */
  const tax = getFormattedPrice(
    taxPrice,
    quote?.prices?.subtotal_excluding_tax?.currency || 'USD'
  );

  /**
   * Subtotal
   */
  const subTotal = quote?.prices?.subtotal_excluding_tax?.value
    ? getFormattedPrice(
        quote.prices.subtotal_excluding_tax.value,
        quote.prices.subtotal_excluding_tax.currency
      )
    : getFormattedPrice(0, 'USD');

  /**
   * Grandtotal
   */

  const discounts = quote?.prices?.discounts || [];
  return (
    <>
      <div className="w-full px-2.5 mx-auto space-y-7 ">
        <div className="flex justify-between ">
          <Typography
            variant="CartItemPrice"
            className="font-medium text-black leading-normal lg:leading-[1.45rem]"
          >
            <Trans>Subtotal :</Trans>
          </Typography>
          <Typography
            variant="CartItemPrice"
            className="font-medium text-black leading-normal lg:leading-[1.45rem]"
          >
            {subTotal}
          </Typography>
        </div>
        {/* For later use  */}
        <div className="flex justify-between ">
          <Typography
            variant="CartItemPrice"
            className="font-medium text-black leading-normal lg:leading-[1.45rem]"
          >
            <Trans>Shipping :</Trans>
          </Typography>
          <Typography
            variant="CartItemPrice"
            className="font-medium text-black leading-normal lg:leading-[1.45rem]"
          >
            {shipping}
          </Typography>
        </div>

        {discounts.length > 0 &&
          discounts.map((discount: any) => (
            <div key={discount.label} className="flex justify-between ">
              <Typography
                variant="CartItemPrice"
                className="grid font-medium text-black leading-normal lg:leading-[1.45rem]"
              >
                <Trans> Discount :</Trans>
                <span>({discount.label})</span>
              </Typography>
              <Typography
                variant="CartItemPrice"
                className="font-medium text-black leading-normal lg:leading-[1.45rem]"
              >
                {getFormattedPrice(
                  discount.amount?.value || 0,
                  discount.amount?.currency || 'USD',
                  true
                )}
              </Typography>
            </div>
          ))}
        <div className="flex justify-between">
          <Typography
            variant="CartItemPrice"
            className="font-medium text-black leading-normal lg:leading-[1.45rem]"
          >
            <Trans>Tax :</Trans>
          </Typography>
          <Typography
            variant="CartItemPrice"
            className="font-medium text-black leading-normal lg:leading-[1.45rem]"
          >
            {tax}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default CartTotals;

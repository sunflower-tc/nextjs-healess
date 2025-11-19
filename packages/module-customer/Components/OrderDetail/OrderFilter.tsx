import { Trans } from '@lingui/macro';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {
  getFormattedDate,
  getFormattedPrice,
  isValidArray,
} from '@utils/Helper';
import GET_ORDER from '@voguish/module-customer/graphql/OrderFilter.graphql';
import { useCustomerQuery } from '@voguish/module-customer/hooks';
import Containers from '@voguish/module-theme/components/ui/Container';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { OrderviewPlaceholder } from './OrderviewPlaceholder';
const ReOrderItem = dynamic(() => import('../OrderTab/ReOrderItem'));

interface OrderDatatype {
  orderId?: string | number | {};
}
interface orderItemType {
  product_name: string;
  product_sku: string;
  quantity_ordered: number;
  selected_options: [
    {
      value: string | number;
    },
    {
      value: string | number;
    }
  ];

  product_sale_price: {
    value: number;
    currency: string;
  };
}

/**
 *  Get Country name from Country code using JavaScript
 */
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
/**
 *
 * @param orderItem calculate total quantity price of product
 * @returns
 */
interface OrderDataType {
  quantity_ordered: number;
  product_sale_price: {
    value: number;
    currency: string;
  };
}
const calcSubtotal = (orderItem: OrderDataType) => {
  const totalQuantity = orderItem?.quantity_ordered;
  const totalPrice = orderItem?.product_sale_price?.value;
  const currency = orderItem?.product_sale_price?.currency;
  return getFormattedPrice(totalQuantity * totalPrice, currency);
};
/**
 *
 * @param orderItem this function get the fomated price with currency
 * @returns
 */
interface QuantityPriceType {
  product_sale_price: {
    value: number;
    currency: string;
  };
}

function getFormattedPriceValue(QuantityPrice: QuantityPriceType) {
  const orderPrice = QuantityPrice?.product_sale_price;
  return getFormattedPrice(orderPrice?.value, orderPrice?.currency);
}
function OrderView({ orderId }: OrderDatatype) {
  const { data, loading /*, error */ } = useCustomerQuery(GET_ORDER, {
    variables: { filter: { number: { eq: orderId } } },
  });
  const orderDetail = data?.customer?.orders?.items[0];
  const subtotalPrice = orderDetail?.total?.subtotal;
  const shippingPrice = orderDetail?.total?.total_shipping;
  const taxPrice = orderDetail?.total?.total_tax;
  const GrandTotalPrice = orderDetail?.total?.grand_total;
  const shippingAddress = orderDetail?.shipping_address;
  const billingAddress = orderDetail?.billing_address;
  const totalOrder = data?.customer?.orders?.total_count;
  return loading ? (
    <OrderviewPlaceholder />
  ) : totalOrder == 1 ? (
    <Containers>
      <Grid container className="-mt-4">
        <Grid item xs={12}>
          <Typography variant="h4">
            <Trans>Order Detail</Trans>
          </Typography>
          <Typography variant="body2" href="/history" component={Link}>
            <Trans>Return to account Overview</Trans>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            <Trans> Order Number:</Trans> #{orderDetail?.number}
          </Typography>
          <Typography variant="body2" href="/history" component={Link}>
            {getFormattedDate(orderDetail?.order_date, 'dd/mm/yyyy')}
          </Typography>
          <ReOrderItem orderId={orderId} />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Trans>Product Name</Trans>
                  </TableCell>
                  <TableCell>
                    <Trans>Sku</Trans>
                  </TableCell>
                  <TableCell>
                    <Trans>Size</Trans>
                  </TableCell>
                  <TableCell>
                    <Trans>Color</Trans>
                  </TableCell>
                  <TableCell align="right">
                    <Trans>Price</Trans>
                  </TableCell>
                  <TableCell align="right">
                    <Trans>Quantity</Trans>
                  </TableCell>
                  <TableCell align="right">
                    <Trans>Total</Trans>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetail?.items?.map(
                  (orderItem: orderItemType, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{orderItem?.product_name}</TableCell>
                      <TableCell>{orderItem?.product_sku}</TableCell>
                      {isValidArray(orderItem?.selected_options) ? (
                        orderItem?.selected_options?.map((desc, indexNum) => (
                          <TableCell key={indexNum}>{desc?.value}</TableCell>
                        ))
                      ) : (
                        <>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </>
                      )}

                      <TableCell align="right">
                        {getFormattedPriceValue(orderItem)}
                      </TableCell>
                      <TableCell align="right">
                        {orderItem?.quantity_ordered}
                      </TableCell>
                      <TableCell align="right">
                        {calcSubtotal(orderItem)}
                      </TableCell>
                    </TableRow>
                  )
                )}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell rowSpan={3} />
                  <TableCell rowSpan={3} />
                  <TableCell rowSpan={3} />
                  <TableCell rowSpan={3} />
                  <TableCell>
                    <Trans>Subtotal</Trans>
                  </TableCell>
                  <TableCell align="right">
                    {getFormattedPrice(
                      subtotalPrice?.value,
                      subtotalPrice?.currency
                    )}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Trans>Shipping</Trans>
                  </TableCell>
                  <TableCell align="right">
                    {getFormattedPrice(
                      shippingPrice?.value,
                      shippingPrice?.currency
                    )}
                  </TableCell>
                </TableRow>
                {isValidArray(orderDetail?.total?.taxes) && (
                  <TableRow>
                    <TableCell>
                      <Trans>Tax</Trans>
                    </TableCell>
                    <TableCell align="right">
                      {getFormattedPrice(taxPrice?.value, taxPrice?.currency)}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell>
                    <Trans>Grand Total</Trans>
                  </TableCell>
                  <TableCell align="right">
                    {getFormattedPrice(
                      GrandTotalPrice?.value,
                      GrandTotalPrice?.currency
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            py: 2,
            borderBottom: 1,
            borderColor: 'themeAdditional.borderColor',
          }}
        >
          <Typography variant="h5">
            <Trans>Order Information</Trans>
          </Typography>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Typography variant="body1" sx={{ my: 2, fontSize: 18 }}>
            <Trans>Shipping Address</Trans>
          </Typography>
          <Typography variant="body2">
            {shippingAddress?.firstname + ' ' + shippingAddress?.lastname}
          </Typography>
          <Typography variant="body2">{shippingAddress?.company}</Typography>
          {shippingAddress?.street.map((lines: [], indexes: number) => (
            <Typography variant="body2" key={indexes}>
              {lines}
            </Typography>
          ))}
          <Typography variant="body2">
            {shippingAddress?.city +
              ', ' +
              shippingAddress?.region +
              ', ' +
              shippingAddress?.postcode}
          </Typography>
          <Typography variant="body2">
            {regionNames.of(shippingAddress?.country_code)}
          </Typography>
          <Typography variant="body2">
            <Trans>T:</Trans> {shippingAddress?.telephone}
          </Typography>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Typography variant="body1" sx={{ my: 2, fontSize: 18 }}>
            <Trans>Shipping Method</Trans>
          </Typography>
          <Typography variant="body2">
            {orderDetail?.shipping_method}
          </Typography>
        </Grid>
        <Grid item lg={3} justifyContent="center" md={4} sm={6} xs={12}>
          <Typography variant="body1" sx={{ my: 2, fontSize: 18 }}>
            <Trans>Billing Address</Trans>
          </Typography>
          <Typography variant="body2">
            {billingAddress?.firstname + ' ' + billingAddress?.lastname}
          </Typography>
          <Typography variant="body2">{billingAddress?.company}</Typography>

          {billingAddress?.street?.map((addressline: [], index: number) => (
            <Typography variant="body2" key={index}>
              {addressline}
            </Typography>
          ))}

          <Typography variant="body2">
            {billingAddress?.city +
              ', ' +
              billingAddress?.region +
              ', ' +
              billingAddress?.postcode}
          </Typography>
          <Typography variant="body2">
            {regionNames.of(billingAddress?.country_code)}
          </Typography>
          <Typography variant="body2">
            <Trans>T:</Trans> {billingAddress?.telephone}
          </Typography>
        </Grid>
        <Grid item lg={3} justifyContent="center" md={4} sm={6} xs={12}>
          <Typography variant="body1" sx={{ my: 2, fontSize: 18 }}>
            <Trans> Payment Method</Trans>
          </Typography>
          <Typography variant="body2">
            {orderDetail?.payment_methods[0]?.name}
          </Typography>
        </Grid>
      </Grid>
    </Containers>
  ) : (
    <OrderviewPlaceholder />
  );
}

export default OrderView;

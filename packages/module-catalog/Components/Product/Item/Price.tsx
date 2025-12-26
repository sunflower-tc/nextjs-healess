import { SxProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';

import { getFormattedPrice } from '@utils/Helper';
import { ProductPrice } from '@voguish/module-customer/types';

const Price = ({
  minimumPrice,
  className,
  sx,
}: {
  className?: string;
  sx?: SxProps;
  minimumPrice: ProductPrice | any;
}) => {
  const currency =
    minimumPrice?.regular_price?.currency ||
    minimumPrice?.regular_price?.currency ||
    'USD';

  const price = minimumPrice?.regular_price?.value || 0;

  const finalPrice =
    minimumPrice?.final_price?.value > 0
      ? minimumPrice?.final_price?.value
      : minimumPrice?.regular_price?.value || 0;

  return (
    <ErrorBoundary>
      <Typography className={`${className || ''}`} sx={sx}>
        {finalPrice < price && (
          <s className="pr-4 italic font-light text-fadedText contrast-75">
            {getFormattedPrice(price, currency)}
          </s>
        )}
        <span className="font-medium">
          {getFormattedPrice(finalPrice, currency)}
        </span>
      </Typography>
    </ErrorBoundary>
  );
};
export default Price;

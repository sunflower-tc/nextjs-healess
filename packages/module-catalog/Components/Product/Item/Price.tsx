import { SxProps } from '@mui/material';
import Typography from '@mui/material/Typography';

import { getFormattedPrice } from '@utils/Helper';
import { ProductPrice } from '@voguish/module-customer';

export const Price = ({
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

  const finalPrice = minimumPrice?.regular_price?.value || 0;

  return (
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
  );
};

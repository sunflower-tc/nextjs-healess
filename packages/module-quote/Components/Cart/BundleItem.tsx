import Typography from '@mui/material/Typography';
import { getFormattedPrice, isValidArray } from '@utils/Helper';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { HTMLRenderer } from '@voguish/module-theme/components/HTMLRenderer';
const BundleItem = ({
  bundle_options,
}: {
  bundle_options: {
    uid: string;
    label: string;
    values: {
      id: string | number;
      quantity: number;
      label: string;
      price: number;
    }[];
  }[];
}) => {
  return (
    <ErrorBoundary>
      <div className="grid gap-0.5">
        {isValidArray(bundle_options) &&
          bundle_options.map((item) => (
            <div
              className="flex flex-col flex-wrap gap-1 xl:items-center xl:flex-row"
              key={item.uid}
            >
              <Typography className="text-xs font-semibold text-black lg:text-sm">
                <HTMLRenderer htmlText={item?.label} /> :{' '}
              </Typography>
              {isValidArray(item?.values) &&
                item?.values?.map((value) => (
                  <div
                    className="flex flex-wrap items-center gap-1 break-keep"
                    key={value.id}
                  >
                    <Typography className="text-xs font-normal lg:text-sm text-secondary">
                      {value?.quantity} X{' '}
                    </Typography>
                    <Typography className="text-xs font-normal lg:text-sm text-secondary">
                      <HTMLRenderer htmlText={value?.label} />
                    </Typography>{' '}
                    +{' '}
                    <Typography className="text-xs font-normal lg:text-sm text-secondary">
                      {getFormattedPrice(value?.price, '')}
                    </Typography>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </ErrorBoundary>
  );
};
export default BundleItem;

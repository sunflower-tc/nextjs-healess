import Clear from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { decode } from 'base-64';
import { useRemoveItemFromCart } from '../../hooks';
import { CircularProgress } from '@mui/material';
import { BRAND_HEX_CODE } from '@utils/Constants';

export const Actions = ({ cartItemId }: { cartItemId: string }) => {
  const { removeItemFromCartHandler, isInProcess } = useRemoveItemFromCart();
  return (
    <ErrorBoundary>
      {isInProcess ? (
        <CircularProgress
          size={15}
          style={{ color: BRAND_HEX_CODE, margin: 'auto' }}
        />
      ) : (
        <Button
          sx={{ minWidth: 0, px: 0 }}
          className="w-4 h-4 border border-gray-200 border-solid py-0 rounded-full text-closeIconColor"
          onClick={() => removeItemFromCartHandler(Number(decode(cartItemId)))}
        >
          <Clear className="text-xl bg-white rounded" />
        </Button>
      )}
    </ErrorBoundary>
  );
};

export default Actions;

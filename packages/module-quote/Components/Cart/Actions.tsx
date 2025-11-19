import Clear from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import { decode } from 'base-64';
import { useRemoveItemFromCart } from '../../hooks';

export const Actions = ({ cartItemId }: { cartItemId: string }) => {
  // const dispatch = useAppDispatch();
  // /** Fetching User details from session */

  const { removeItemFromCartHandler } = useRemoveItemFromCart();

  return (
    <Button
      sx={{ minWidth: 0, px: 0 }}
      className="w-4 h-4 py-0 rounded-full text-closeIconColor"
      onClick={() => removeItemFromCartHandler(Number(decode(cartItemId)))}
    >
      <Clear className="text-xl bg-white rounded" />
    </Button>
  );
};

export default Actions;

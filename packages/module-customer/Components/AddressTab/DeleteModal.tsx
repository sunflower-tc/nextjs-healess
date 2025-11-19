import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';

import { Trans, t } from '@lingui/macro';
import { showToast } from '@utils/Helper';
type DeleteModalType = {
  deleteDataId?: number | undefined;
  handleClick: Function;
  deleteCustomerAddress: Function;
};
export const DeleteModal = ({
  deleteDataId,
  handleClick,
  deleteCustomerAddress,
}: DeleteModalType) => {
  const [status, setSatus] = useState(false);
  useEffect(() => {
    if (deleteDataId) {
      setSatus(true);
    } else {
      setSatus(false);
    }
  }, [deleteDataId]);

  const deleteAddress = () => {
    deleteCustomerAddress({
      variables: { id: deleteDataId },
    })
      .then(() => {
        showToast({
          type: 'success',
          message: t`Address deleted successfully`,
        });
        handleClick();
      })
      .catch((err: any) => {
        showToast({ message: err.message, type: 'error' });
        handleClick();
      });
  };
  return (
    <div>
      <Dialog
        open={status}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Trans>Confirm Removal</Trans>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Trans>Are you sure you wish to remove this address?</Trans>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteAddress}>
            <Trans>Confirm</Trans>
          </Button>
          <Button onClick={() => handleClick()} autoFocus>
            <Trans>Cancel</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

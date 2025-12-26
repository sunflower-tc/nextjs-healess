import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';

import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import Modal from '@voguish/module-theme/components/Modal';
import { useToast } from '@voguish/module-theme/components/toast/hooks';
import { useTranslation } from 'next-i18next';
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
  const { t } = useTranslation('common');

  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (deleteDataId) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [deleteDataId]);

  const { showToast } = useToast();

  const deleteAddress = () => {
    deleteCustomerAddress({
      variables: { id: deleteDataId },
    })
      .then(() => {
        showToast({
          type: 'success',
          message: t('Address deleted successfully'),
        });
        handleClick();
      })
      .catch((err: any) => {
        showToast({ message: err.message, type: 'error' });
        handleClick();
      });
  };
  return (
    <ErrorBoundary>
      <Modal showModal={status} panelClass="!mx-4 rounded-lg !min-h-full">
        <DialogTitle id="alert-dialog-title" className="p-2">
          {t('Confirm Removal')}
        </DialogTitle>
        <DialogContent className="p-0 m-0 mb-3">
          <DialogContentText
            className="px-2.5 m-0"
            id="alert-dialog-description"
          >
            {t('Are you sure you wish to remove this address?')}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="lg:pb-0 md:pb-0 pb-4 mb-0">
          <Button
            variant="outlined"
            className="lg:h-12 md:h-12 h-10 mr-2"
            onClick={deleteAddress}
          >
            {t('Confirm')}
          </Button>
          <Button
            variant="contained"
            className="lg:h-12 md:h-12 h-10 "
            onClick={() => handleClick()}
            autoFocus
          >
            {t('Cancel')}
          </Button>
        </DialogActions>
      </Modal>
    </ErrorBoundary>
  );
};

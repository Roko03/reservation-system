import React from 'react';

import Modal from '@/components/Modal';

interface DiscardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscard: () => void;
}

const DiscardDialog: React.FC<DiscardDialogProps> = ({ isOpen, onClose, onDiscard }) => {
  const handleConfirm = () => {
    onClose();
    onDiscard();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Odbaci promjene"
      description="Jesi li siguran da zelis odbaciti promjene?"
      confirmBtnText="Odbaci"
      ConfirmBtnProps={{ fullWidth: true, color: 'error' }}
      onConfirm={handleConfirm}
      onCancel={onClose}
      CancelBtnProps={{ fullWidth: true }}
      PaperProps={{ sx: { maxWidth: 640 } }}
    />
  );
};

export default DiscardDialog;

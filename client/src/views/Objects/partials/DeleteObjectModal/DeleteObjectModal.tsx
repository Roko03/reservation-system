import { useSearchParams } from 'react-router-dom';

import Modal from '@/components/Modal';
import { PAGE_NUMBER, PAGE_SIZE } from '@/config/constants.config';
import ObjectsService from '@/services/objects.service';
import { showToast } from '@/valtio/global/global.actions';
import { getObjects } from '@/valtio/objects/objects.action';
import { useObjectStore } from '@/valtio/objects/objects.store';

interface DeleteObjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteObjectModal = ({ isOpen, onClose }: DeleteObjectModalProps) => {
  const { selectedObject } = useObjectStore();
  const [searchParams] = useSearchParams();

  const refreshView = () => {
    const page = Number(searchParams.get('page')) || PAGE_NUMBER;
    const search = searchParams.get('search') || '';

    getObjects(PAGE_SIZE, page - PAGE_NUMBER, search);
  };

  const handleConfirm = async (): Promise<void> => {
    if (!selectedObject) {
      return;
    }

    const { payload, message } = await ObjectsService.deleteObject(selectedObject.id);

    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Objekt izbrisan' : message || 'Prilikom brisanja objekta doslo je do pogreske',
    });

    onClose();
    refreshView();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Izbrisi objekt"
      description={`Jesi li siguran da zelis izbrisati ${selectedObject?.name}?`}
      confirmBtnText="Delete"
      ConfirmBtnProps={{ fullWidth: true, color: 'error' }}
      onConfirm={handleConfirm}
      onCancel={onClose}
      CancelBtnProps={{ fullWidth: true }}
      PaperProps={{ sx: { maxWidth: 640 } }}
    />
  );
};

export default DeleteObjectModal;

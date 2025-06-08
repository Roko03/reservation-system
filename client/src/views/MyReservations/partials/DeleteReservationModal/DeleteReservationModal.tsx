import { useSearchParams } from 'react-router-dom';

import dayjs from 'dayjs';

import Modal from '@/components/Modal';
import { PAGE_NUMBER } from '@/config/constants.config';
import ReservationsService from '@/services/reservations.service';
import DateTime from '@/utils/static/DateTime';
import formatTime from '@/utils/static/formatTime';
import { getUserReservations } from '@/valtio/auth/auth.actions';
import { useAuthStore } from '@/valtio/auth/auth.store';
import { showToast } from '@/valtio/global/global.actions';

interface DeleteObjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteReservationModal = ({ isOpen, onClose }: DeleteObjectModalProps) => {
  const [searchParams] = useSearchParams();
  const { selectedReservation } = useAuthStore();

  const refreshView = () => {
    const page = Number(searchParams.get('page')) || PAGE_NUMBER;

    getUserReservations(page - PAGE_NUMBER);
  };

  const handleConfirm = async (): Promise<void> => {
    if (!selectedReservation) {
      return;
    }

    const { payload, message } = await ReservationsService.deleteReservation(selectedReservation.id);

    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Rezervacija izbrisana' : message || 'Prilikom brisanja rezervacije doslo je do pogreske',
    });

    if (payload) {
      onClose();
      refreshView();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Izbrisi rezervaciju"
      description={`Jesi li siguran da zelis obrisati rezervaciju za ${selectedReservation?.object.name} - ${DateTime.formatHR(dayjs(selectedReservation?.date))} - ${formatTime(selectedReservation?.time)} ?`}
      confirmBtnText="Izbrisi"
      ConfirmBtnProps={{ fullWidth: true, color: 'error' }}
      onConfirm={handleConfirm}
      onCancel={onClose}
      CancelBtnProps={{ fullWidth: true }}
      PaperProps={{ sx: { maxWidth: 640 } }}
    />
  );
};

export default DeleteReservationModal;

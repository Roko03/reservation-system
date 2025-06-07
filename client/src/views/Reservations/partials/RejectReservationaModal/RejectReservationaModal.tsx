import { useSearchParams } from 'react-router-dom';

import dayjs from 'dayjs';

import Modal from '@/components/Modal';
import { PAGE_NUMBER } from '@/config/constants.config';
import ReservationsService from '@/services/reservations.service';
import DateTime from '@/utils/static/DateTime';
import formatTime from '@/utils/static/formatTime';
import { showToast } from '@/valtio/global/global.actions';
import { getReservations } from '@/valtio/reservations/reservations.action';
import { useReservationStore } from '@/valtio/reservations/reservations.store';

interface RejectReservationaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RejectReservationaModal = ({ isOpen, onClose }: RejectReservationaModalProps) => {
  const { selectedReservation } = useReservationStore();
  const [searchParams] = useSearchParams();

  const refreshView = () => {
    const page = Number(searchParams.get('page')) || PAGE_NUMBER;

    getReservations(page - PAGE_NUMBER);
  };

  const handleConfirm = async (): Promise<void> => {
    if (!selectedReservation) {
      return;
    }

    const { payload, message } = await ReservationsService.rejectReservation(selectedReservation.id);

    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Rezervacija odbijena' : message || 'Greska prilikom odbijanja rezervacije',
    });

    onClose();
    refreshView();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Odbij rezervaciju"
      description={`Jesi li siguran da zelis odbiti rezervaciju od ${selectedReservation?.user.email} za ${selectedReservation?.object.name} - ${DateTime.formatHR(dayjs(selectedReservation?.date))} - ${formatTime(selectedReservation?.time)} ?`}
      confirmBtnText="Odbij"
      ConfirmBtnProps={{ fullWidth: true, color: 'error' }}
      onConfirm={handleConfirm}
      onCancel={onClose}
      CancelBtnProps={{ fullWidth: true }}
      PaperProps={{ sx: { maxWidth: 640 } }}
    />
  );
};

export default RejectReservationaModal;

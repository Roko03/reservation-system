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

interface ApproveReservationaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApproveReservationaModal = ({ isOpen, onClose }: ApproveReservationaModalProps) => {
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

    const { payload, message } = await ReservationsService.approveReservation(selectedReservation.id);

    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Approve reservation successful' : message || 'Approve reservation failed',
    });

    onClose();
    refreshView();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Approve reservation"
      description={`Are you sure you want to approve reservation by ${selectedReservation?.user.email} to ${selectedReservation?.object.name} at ${DateTime.formatHR(dayjs(selectedReservation?.date))} - ${formatTime(selectedReservation?.time)} ?`}
      confirmBtnText="Approve"
      ConfirmBtnProps={{ fullWidth: true, color: 'error' }}
      onConfirm={handleConfirm}
      onCancel={onClose}
      CancelBtnProps={{ fullWidth: true }}
      PaperProps={{ sx: { maxWidth: 640 } }}
    />
  );
};

export default ApproveReservationaModal;

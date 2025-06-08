import { useSearchParams } from 'react-router-dom';

import dayjs from 'dayjs';

import Form from '@/components/Forms/Form';
import Modal from '@/components/Modal';
import { PAGE_NUMBER } from '@/config/constants.config';
import { UpdateReservationFormValues } from '@/config/form-models.config';
import { UPDATE_RESERVATION_FORM } from '@/config/forms/form-names.config';
import ReservationsService from '@/services/reservations.service';
import useBreakpoint from '@/utils/hooks/useBreakpoint';
import DateTime from '@/utils/static/DateTime';
import { getUserReservations } from '@/valtio/auth/auth.actions';
import { useAuthStore } from '@/valtio/auth/auth.store';
import { showToast } from '@/valtio/global/global.actions';

import UpdateReservationForm from './UpdateReservationForm';

interface UpdateObjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultValues: UpdateReservationFormValues = {
  date: null,
  time: '',
};

const UpdateReservationModal = ({ isOpen, onClose }: UpdateObjectModalProps) => {
  const { selectedReservation } = useAuthStore();
  const { isMobile } = useBreakpoint();

  const [searchParams] = useSearchParams();

  const initialValues: UpdateReservationFormValues = selectedReservation
    ? {
        date: dayjs(selectedReservation.date),
        time: DateTime.formatTime(dayjs(selectedReservation.time)),
      }
    : defaultValues;

  const refreshView = () => {
    const page = Number(searchParams.get('page')) || PAGE_NUMBER;

    getUserReservations(page - PAGE_NUMBER);
  };

  const handleSubmit = async (formValues: UpdateReservationFormValues): Promise<void> => {
    if (!selectedReservation) {
      return;
    }

    const { payload, message } = await ReservationsService.editReservation(selectedReservation?.id, formValues);

    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Rezervacija uredena' : message || 'Prilikom uredivanja rezervacije doslo je do greske',
    });

    if (payload) {
      onClose();
      refreshView();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      fullScreen={isMobile}
      title="Uredi rezervaciju"
      onClose={onClose}
      cancelBtnText="Odbaci"
      onCancel={onClose}
      confirmBtnText="Sacuvaj promjene"
      ConfirmBtnProps={{
        form: UPDATE_RESERVATION_FORM,
        type: 'submit',
      }}
    >
      <Form defaultValues={initialValues} onSubmit={handleSubmit} id={UPDATE_RESERVATION_FORM}>
        <UpdateReservationForm />
      </Form>
    </Modal>
  );
};

export default UpdateReservationModal;

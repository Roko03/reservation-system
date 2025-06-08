import { LocationPin } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import Form from '@/components/Forms/Form';
import Modal from '@/components/Modal';
import { CreateReservationFormValues } from '@/config/form-models.config';
import { CREATE_RESERVATION_FORM } from '@/config/forms/form-names.config';
import ReservationsService from '@/services/reservations.service';
import colors from '@/styles/themes/colors';
import useBreakpoint from '@/utils/hooks/useBreakpoint';
import DateTime from '@/utils/static/DateTime';
import { showToast } from '@/valtio/global/global.actions';
import { useObjectStore } from '@/valtio/objects/objects.store';

import ObjectReservationForm from './ObjectReservationForm';
import styles from './ObjectReservationModal.module.scss';

interface ObjectReservationModalProps {
  onClose: () => void;
}

const defaultValues: CreateReservationFormValues = {
  date: DateTime.now(),
  time: '',
};

const ObjectReservationModal = ({ onClose }: ObjectReservationModalProps) => {
  const { selectedObject } = useObjectStore();
  const { name, location, image, workTimeFrom, workTimeTo } = selectedObject || {};
  const { isMobile } = useBreakpoint();

  const handleSubmit = async (formValues: CreateReservationFormValues): Promise<void> => {
    if (!selectedObject) {
      return;
    }

    const { payload, message } = await ReservationsService.makeReservation(selectedObject?.id, formValues);

    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Rezervacija poslana' : message || 'Prilikom rezerviranja objekta doslo je do greske',
    });

    if (payload) {
      onClose();
    }
  };

  return (
    <Modal
      open
      fullScreen={isMobile}
      title={`${name || ''}`}
      onClose={onClose}
      hideCancelButton
      confirmBtnText="Kreiraj"
      ConfirmBtnProps={{
        form: CREATE_RESERVATION_FORM,
        type: 'submit',
      }}
    >
      <Stack direction="column">
        <Stack direction="column" spacing={2}>
          <Box className={styles.imageWrapper}>
            <img src={image!} alt="cover" className={styles.image} />
          </Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.5}>
            <Typography display="flex" alignItems="center" variant="body1" color={colors.black950}>
              <LocationPin /> {location}
            </Typography>
            <Typography display="flex" alignItems="center" variant="body1" color={colors.black950}>
              Radno vrijeme: {workTimeFrom} - {workTimeTo}
            </Typography>
          </Stack>
        </Stack>
        <Form defaultValues={defaultValues} onSubmit={handleSubmit} id={CREATE_RESERVATION_FORM}>
          <ObjectReservationForm />
        </Form>
      </Stack>
    </Modal>
  );
};

export default ObjectReservationModal;

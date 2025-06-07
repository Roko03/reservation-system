import { useSearchParams } from 'react-router-dom';

import { Stack } from '@mui/material';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import Modal from '@/components/Modal';
import TimePicker from '@/components/TimePicker/TimePicker';
import { PAGE_NUMBER } from '@/config/constants.config';
import { CreateObjectTimeStringFormValues, ObjectFormValues } from '@/config/form-models.config';
import { UPDATE_OBJECT_FORM } from '@/config/forms/form-names.config';
import ObjectsService from '@/services/objects.service';
import useBreakpoint from '@/utils/hooks/useBreakpoint';
import DateTime from '@/utils/static/DateTime';
import { FormValidator } from '@/utils/static/FormValidator';
import { showToast } from '@/valtio/global/global.actions';
import { getObjects } from '@/valtio/objects/objects.action';
import { useObjectStore } from '@/valtio/objects/objects.store';

interface UpdateObjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultValues: ObjectFormValues = {
  name: '',
  location: '',
  image: '',
  workTimeFrom: null,
  workTimeTo: null,
  unvailableDates: [],
};

const UpdateObjectModal = ({ isOpen, onClose }: UpdateObjectModalProps) => {
  const { selectedObject } = useObjectStore();
  const { isMobile } = useBreakpoint();

  const [searchParams] = useSearchParams();

  const initialValues: ObjectFormValues = selectedObject
    ? {
        name: selectedObject.name,
        location: selectedObject.location,
        image: selectedObject.image || '',
        workTimeFrom: DateTime.fromTimeString(selectedObject.workTimeFrom),
        workTimeTo: DateTime.fromTimeString(selectedObject.workTimeTo),
        unvailableDates: selectedObject.unavailablePeriods,
      }
    : defaultValues;

  const refreshView = () => {
    const page = Number(searchParams.get('page')) || PAGE_NUMBER;
    const search = searchParams.get('search') || '';

    getObjects(page - PAGE_NUMBER, search);
  };

  const handleSubmit = async (formValues: ObjectFormValues): Promise<void> => {
    if (!selectedObject) {
      return;
    }

    formValues.image =
      'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

    const values: CreateObjectTimeStringFormValues = {
      ...formValues,
      workTimeFrom: DateTime.formatTime(formValues.workTimeFrom!),
      workTimeTo: DateTime.formatTime(formValues.workTimeTo!),
    };

    const { payload, message } = await ObjectsService.editObject(selectedObject?.id, values);

    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Objekt ureden' : message || 'Prilikom uredivanja objekta doslo je do greske',
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
      title="Uredi objekt"
      onClose={onClose}
      cancelBtnText="Odbaci"
      onCancel={onClose}
      confirmBtnText="Sacuvaj promjene"
      ConfirmBtnProps={{
        form: UPDATE_OBJECT_FORM,
        type: 'submit',
      }}
    >
      <Form defaultValues={initialValues} onSubmit={handleSubmit} id={UPDATE_OBJECT_FORM}>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
          <FormInput name="name" placeholder="Naziv objekta" validate={FormValidator.isNotEmpty} />
          <FormInput name="location" placeholder="Lokacija" validate={FormValidator.isNotEmpty} />
        </Stack>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mt={2}>
          <FormInput
            name="workTimeFrom"
            renderInput={({ field }) => (
              <TimePicker
                slotProps={{
                  textField: {
                    placeholder: 'Pocetak rada',
                    variant: 'outlined',
                    InputLabelProps: { shrink: false },
                  },
                }}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <FormInput
            name="workTimeTo"
            renderInput={({ field }) => (
              <TimePicker
                slotProps={{
                  textField: {
                    placeholder: 'Zavrsetak rada',
                    variant: 'outlined',
                    InputLabelProps: { shrink: false },
                  },
                }}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Stack>
      </Form>
    </Modal>
  );
};

export default UpdateObjectModal;

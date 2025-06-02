import { useSearchParams } from 'react-router-dom';

import { Stack } from '@mui/material';

import DiscardDialog from '@/components/DiscardDialog';
import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import Modal from '@/components/Modal';
import TimePicker from '@/components/TimePicker/TimePicker';
import { PAGE_NUMBER } from '@/config/constants.config';
import { CreateObjectTimeStringFormValues, ObjectFormValues } from '@/config/form-models.config';
import { CREATE_OBJECT_FORM } from '@/config/forms/form-names.config';
import ObjectsService from '@/services/objects.service';
import useBreakpoint from '@/utils/hooks/useBreakpoint';
import useToggleState from '@/utils/hooks/useToggleState';
import DateTime from '@/utils/static/DateTime';
import { FormValidator } from '@/utils/static/FormValidator';
import { setIsFormDirty, showToast } from '@/valtio/global/global.actions';
import { useGlobalStore } from '@/valtio/global/global.store';
import { getObjects } from '@/valtio/objects/objects.action';

interface CreateObjectModalProps {
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

const CreateObjectModal = ({ isOpen, onClose }: CreateObjectModalProps) => {
  const [discard, toggleDiscard] = useToggleState();
  const { isMobile } = useBreakpoint();
  const { isFormDirty } = useGlobalStore();

  const [searchParams] = useSearchParams();

  const refreshView = () => {
    const page = Number(searchParams.get('page')) || PAGE_NUMBER;
    const search = searchParams.get('search') || '';

    getObjects(page - PAGE_NUMBER, search);
  };

  const handleSubmit = async (formValues: ObjectFormValues): Promise<void> => {
    formValues.image =
      'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

    const values: CreateObjectTimeStringFormValues = {
      ...formValues,
      workTimeFrom: DateTime.formatTime(formValues.workTimeFrom!),
      workTimeTo: DateTime.formatTime(formValues.workTimeTo!),
    };

    const { payload, message } = await ObjectsService.createObject(values);

    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Create object successful' : message || 'Creat object failed',
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
      onClose={isFormDirty ? toggleDiscard : onClose}
      title="New object"
      hideCancelButton
      confirmBtnText="Create"
      ConfirmBtnProps={{
        form: CREATE_OBJECT_FORM,
        type: 'submit',
      }}
    >
      <Form defaultValues={defaultValues} onSubmit={handleSubmit} id={CREATE_OBJECT_FORM}>
        {({ formState: { isDirty } }) => {
          setIsFormDirty(isDirty);

          return (
            <>
              <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
                <FormInput name="name" placeholder="Naziv objekta" validate={FormValidator.isNotEmpty} />
                <FormInput name="location" placeholder="Lokacija" validate={FormValidator.isNotEmpty} />
              </Stack>
              <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mt={2}>
                <FormInput
                  name="workTimeFrom"
                  renderInput={({ field }) => (
                    <TimePicker label="Pocetak rada" value={field.value} onChange={field.onChange} />
                  )}
                />
                <FormInput
                  name="workTimeTo"
                  renderInput={({ field }) => (
                    <TimePicker label="Zavrsetak rada" value={field.value} onChange={field.onChange} />
                  )}
                />
              </Stack>
              <DiscardDialog isOpen={discard} onClose={toggleDiscard} onDiscard={onClose} />
            </>
          );
        }}
      </Form>
    </Modal>
  );
};

export default CreateObjectModal;

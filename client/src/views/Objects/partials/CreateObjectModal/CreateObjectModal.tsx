import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CircularProgress, Stack, Typography } from '@mui/material';

import DiscardDialog from '@/components/DiscardDialog';
import FileUpload from '@/components/FileUpload/FileUpload';
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
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const uploadToServer = async (file: File) => {
    try {
      setUploading(true);

      const formData = new FormData();

      formData.append('file', file);

      const response = await fetch('https://api.escuelajs.co/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        const data = await response.json();

        setImageUrl(data.location);
      }
    } catch (error) {
      showToast({ status: 'error', text: 'Upload error occurred.' });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelected = async (file: File) => {
    const reader = new FileReader();

    reader.onload = e => {
      if (e.target?.result) setImageUrl(e.target.result as string);
    };
    reader.readAsDataURL(file);

    await uploadToServer(file);
  };

  const refreshView = () => {
    const page = Number(searchParams.get('page')) || PAGE_NUMBER;
    const search = searchParams.get('search') || '';

    getObjects(page - PAGE_NUMBER, search);
  };

  const handleSubmit = async (formValues: ObjectFormValues): Promise<void> => {
    if (!imageUrl) {
      return;
    }

    formValues.image = imageUrl;

    const values: CreateObjectTimeStringFormValues = {
      ...formValues,
      workTimeFrom: DateTime.formatTime(formValues.workTimeFrom!),
      workTimeTo: DateTime.formatTime(formValues.workTimeTo!),
    };

    const { payload, message } = await ObjectsService.createObject(values);

    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Objekt kreiran' : message || 'Prilikom kreiranja objekta doslo je do greske',
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
      title="Novi objekt"
      hideCancelButton
      confirmBtnText="Kreiraj"
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
              <Stack direction="row" spacing={1} alignItems="center" position="relative" pb={2}>
                <Stack maxWidth="200px">
                  <FileUpload onFileSelected={handleFileSelected} />
                </Stack>
                {uploading && <CircularProgress />}
                {imageUrl && <Typography variant="body2">{imageUrl}</Typography>}
              </Stack>
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
              <DiscardDialog isOpen={discard} onClose={toggleDiscard} onDiscard={onClose} />
            </>
          );
        }}
      </Form>
    </Modal>
  );
};

export default CreateObjectModal;

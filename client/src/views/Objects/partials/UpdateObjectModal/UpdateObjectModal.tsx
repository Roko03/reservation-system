import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CircularProgress, Stack, Typography } from '@mui/material';

import FileUpload from '@/components/FileUpload/FileUpload';
import Form from '@/components/Forms/Form';
import FormInput, { FormInputProps } from '@/components/Forms/FormInput';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import TimePicker from '@/components/TimePicker/TimePicker';
import { PAGE_NUMBER, PAGE_SIZE } from '@/config/constants.config';
import { CreateObjectTimeStringFormValues, ObjectFormValues } from '@/config/form-models.config';
import { UPDATE_OBJECT_FORM } from '@/config/forms/form-names.config';
import { CITY_ARRAY } from '@/model/city.model';
import { OBJECT_TYPE_ARRAY, TERRAIN_TYPE_ARRAY } from '@/model/object-type.model';
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
  type: '',
  terrainType: '',
  unvailableDates: [],
};

const UpdateObjectModal = ({ isOpen, onClose }: UpdateObjectModalProps) => {
  const { selectedObject } = useObjectStore();
  const { isMobile } = useBreakpoint();
  const [imageUrl, setImageUrl] = useState<string>(selectedObject?.image || '');
  const [uploading, setUploading] = useState(false);

  const [searchParams] = useSearchParams();

  const initialValues: ObjectFormValues = selectedObject
    ? {
        name: selectedObject.name,
        location: selectedObject.location,
        workTimeFrom: DateTime.fromTimeString(selectedObject.workTimeFrom),
        workTimeTo: DateTime.fromTimeString(selectedObject.workTimeTo),
        type: selectedObject.type,
        terrainType: selectedObject.terrainType,
        unvailableDates: selectedObject.unavailablePeriods,
      }
    : defaultValues;

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

  const renderCityInput: FormInputProps['renderInput'] = ({ field }) => (
    <Select
      value={field.value}
      onChange={field.onChange}
      options={CITY_ARRAY.map(el => ({
        id: el,
        label: el,
      }))}
      placeholder="Lokacija"
    />
  );

  const renderObjectTypeInput: FormInputProps['renderInput'] = ({ field }) => (
    <Select
      value={field.value}
      onChange={field.onChange}
      options={OBJECT_TYPE_ARRAY.map(el => ({
        id: el,
        label: el,
      }))}
      placeholder="Vrsta terena"
    />
  );

  const renderTerrainTypeInput: FormInputProps['renderInput'] = ({ field }) => (
    <Select
      value={field.value}
      onChange={field.onChange}
      options={TERRAIN_TYPE_ARRAY.map(el => ({
        id: el,
        label: el,
      }))}
      placeholder="Vrsta podloge"
    />
  );

  const refreshView = () => {
    const page = Number(searchParams.get('page')) || PAGE_NUMBER;
    const search = searchParams.get('search') || '';

    getObjects(PAGE_SIZE, page - PAGE_NUMBER, search);
  };

  const handleSubmit = async (formValues: ObjectFormValues): Promise<void> => {
    if (!selectedObject) {
      return;
    }

    formValues.image = imageUrl;

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

  useEffect(() => {
    if (selectedObject && selectedObject.image) {
      setImageUrl(selectedObject.image);
    }
  }, [selectedObject]);

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
        <Stack direction="row" spacing={1} alignItems="center" position="relative" pb={2}>
          <Stack maxWidth="200px">
            <FileUpload onFileSelected={handleFileSelected} />
          </Stack>
          {uploading && <CircularProgress />}
          {imageUrl && !uploading && <Typography variant="body2">{imageUrl}</Typography>}
        </Stack>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
          <FormInput name="name" placeholder="Naziv objekta" validate={FormValidator.isNotEmpty} />
          <FormInput name="location" renderInput={renderCityInput} />
        </Stack>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mt={2}>
          <FormInput name="type" renderInput={renderObjectTypeInput} />
          <FormInput name="terrainType" renderInput={renderTerrainTypeInput} />
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

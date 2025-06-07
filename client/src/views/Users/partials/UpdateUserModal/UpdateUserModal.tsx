import { useSearchParams } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

import Form from '@/components/Forms/Form';
import FormInput, { FormInputProps } from '@/components/Forms/FormInput';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import { PAGE_NUMBER } from '@/config/constants.config';
import { UpdateUserFormValues } from '@/config/form-models.config';
import { UPDATE_USER_FORM } from '@/config/forms/form-names.config';
import { USER_ROLE_ARRAY, USER_ROLE_NAME_LABEL_MAP, UserRoleName } from '@/model/user.model';
import UsersService from '@/services/users.service';
import useBreakpoint from '@/utils/hooks/useBreakpoint';
import { showToast } from '@/valtio/global/global.actions';
import { getUsers } from '@/valtio/users/users.action';
import { useUsersStore } from '@/valtio/users/users.store';

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultValues: UpdateUserFormValues = {
  firstname: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  role: UserRoleName.USER,
};

const UpdateUserModal = ({ isOpen, onClose }: UpdateUserModalProps) => {
  const { isMobile } = useBreakpoint();
  const { selectedUser } = useUsersStore();
  const [searchParams] = useSearchParams();

  const initialValues: UpdateUserFormValues = selectedUser
    ? {
        firstname: selectedUser.firstname,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        phoneNumber: selectedUser.phoneNumber,
        role: selectedUser.role,
      }
    : defaultValues;

  const refreshView = () => {
    const page = Number(searchParams.get('page')) || PAGE_NUMBER;
    const search = searchParams.get('search') || '';

    getUsers(page - PAGE_NUMBER, search);
  };

  const handleSubmit = async (formValues: UpdateUserFormValues): Promise<void> => {
    if (!selectedUser) {
      return;
    }

    const formWithRole: Pick<UpdateUserFormValues, 'role'> = { role: formValues.role };

    const { payload, message } = await UsersService.updateUser(selectedUser.id, {
      ...formWithRole,
    });

    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Uredi korisnika' : message || 'Prilikom uredivanja korisnika doslo je do greske',
    });

    if (payload) {
      onClose();
      refreshView();
    }
  };

  const renderUserRoleInput: FormInputProps['renderInput'] = ({ field }) => (
    <Select
      value={field.value}
      onChange={field.onChange}
      options={USER_ROLE_ARRAY.map(role => ({
        id: role,
        label: USER_ROLE_NAME_LABEL_MAP[role as UserRoleName],
      }))}
      placeholder="Uloga"
    />
  );

  return (
    <Modal
      open={isOpen}
      fullScreen={isMobile}
      onClose={onClose}
      title={`${selectedUser?.firstname} ${selectedUser?.lastName}`}
      cancelBtnText="Ponisit"
      onCancel={onClose}
      confirmBtnText="Sacuvaj promjene"
      ConfirmBtnProps={{
        form: UPDATE_USER_FORM,
        type: 'submit',
      }}
    >
      <Form defaultValues={initialValues} onSubmit={handleSubmit} id={UPDATE_USER_FORM}>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mb={2}>
          <FormInput name="firstname" formLabel="Ime" placeholder="Ime" disabled />
          <FormInput name="lastName" formLabel="Prezime" placeholder="Prezime" disabled />
        </Stack>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mb={2}>
          <FormInput
            name="email"
            type="email"
            formLabel="Email"
            placeholder="Email"
            InputProps={{
              inputProps: { inputMode: 'email' },
            }}
            disabled
          />
          <FormInput
            name="phoneNumber"
            formLabel="Broj mobitela"
            placeholder="Broj mobitel"
            InputProps={{
              inputProps: { inputMode: 'tel' },
            }}
            disabled
          />
        </Stack>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mb={2}>
          <FormInput name="role" formLabel="Uloga" renderInput={renderUserRoleInput} />
        </Stack>
      </Form>
    </Modal>
  );
};

export default UpdateUserModal;

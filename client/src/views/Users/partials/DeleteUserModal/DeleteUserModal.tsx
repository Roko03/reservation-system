import { useSearchParams } from 'react-router-dom';

import Modal from '@/components/Modal';
import { PAGE_NUMBER } from '@/config/constants.config';
import UsersService from '@/services/users.service';
import { showToast } from '@/valtio/global/global.actions';
import { getUsers } from '@/valtio/users/users.action';
import { useUsersStore } from '@/valtio/users/users.store';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteUserModal = ({ isOpen, onClose }: DeleteUserModalProps) => {
  const { selectedUser } = useUsersStore();
  const [searchParams] = useSearchParams();

  const refreshView = () => {
    const page = Number(searchParams.get('page')) || PAGE_NUMBER;
    const search = searchParams.get('search') || '';

    getUsers(page - PAGE_NUMBER, search);
  };

  const handleConfirm = async (): Promise<void> => {
    if (!selectedUser) {
      return;
    }

    const { payload, message } = await UsersService.deleteUser(selectedUser.id);

    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Delete user successful' : message || 'Delete user failed',
    });

    onClose();
    refreshView();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Delete customer"
      description={`Are you sure you want to delete ${selectedUser?.firstname} ${selectedUser?.lastName}?`}
      confirmBtnText="Delete"
      ConfirmBtnProps={{ fullWidth: true, color: 'error' }}
      onConfirm={handleConfirm}
      onCancel={onClose}
      CancelBtnProps={{ fullWidth: true }}
      PaperProps={{ sx: { maxWidth: 640 } }}
    />
  );
};

export default DeleteUserModal;

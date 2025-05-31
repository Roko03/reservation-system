import { JSX } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Delete, Edit } from '@mui/icons-material';
import { ListItemIcon, MenuItem, MenuList, Typography } from '@mui/material';

import { UserRoleName } from '@/model/user.model';
import colors from '@/styles/themes/colors';
import { useAuthStore } from '@/valtio/auth/auth.store';
import { clearSelectedUser, findUser, toggleDeleteUserModal, toggleUpdateUserModal } from '@/valtio/users/users.action';

interface useUserViewPayload {
  closeUserModal: () => void;
  renderRowActions: (index: number) => JSX.Element | false;
}

const useUserView = (): useUserViewPayload => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuthStore();
  const isSuperadmin = user && user.role === UserRoleName.SUPERADMIN;

  const closeUserModal = (): void => {
    clearSelectedUser();
    navigate(`/admin/users?${searchParams.toString()}`);
  };

  const handleUpdateClick = (e: React.MouseEvent<HTMLLIElement>): void => {
    const {
      currentTarget: {
        dataset: { index },
      },
    } = e;

    if (!index) {
      return;
    }

    findUser(index);
    toggleUpdateUserModal(true);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLLIElement>): void => {
    const {
      currentTarget: {
        dataset: { index },
      },
    } = e;

    if (!index) {
      return;
    }

    findUser(index);
    toggleDeleteUserModal(true);
  };

  const renderRowActions = (index: number): JSX.Element | false => (
    <MenuList>
      <MenuItem data-index={index} onClick={handleUpdateClick} disabled={isSuperadmin!}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <Typography variant="body2">Edit user</Typography>
      </MenuItem>
      <MenuItem data-index={index} onClick={handleDeleteClick}>
        <ListItemIcon>
          <Delete fill={colors.red100} />
        </ListItemIcon>
        <Typography variant="body2" color={colors.red100}>
          Delete user
        </Typography>
      </MenuItem>
    </MenuList>
  );

  return {
    closeUserModal,
    renderRowActions,
  };
};

export default useUserView;

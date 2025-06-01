import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { Delete, Edit } from '@mui/icons-material';
import { ListItemIcon, MenuItem, MenuList, Typography } from '@mui/material';

import {
  clearSelectedReservation,
  findReservation,
  isReservationEditable,
  toggleApproveReservationModal,
  toggleRejectReservationModal,
} from '@/valtio/reservations/reservations.action';

interface useReservationViewPayload {
  closeUserModal: () => void;
  renderRowActions: (index: number) => JSX.Element | false;
}

const useReservationView = (): useReservationViewPayload => {
  const navigate = useNavigate();

  const closeUserModal = (): void => {
    clearSelectedReservation();
    navigate('/admin/reservations');
  };

  const handleApproveClick = (e: React.MouseEvent<HTMLLIElement>): void => {
    const {
      currentTarget: {
        dataset: { index },
      },
    } = e;

    if (!index) {
      return;
    }

    findReservation(index);
    toggleApproveReservationModal(true);
  };

  const handleRejectClick = (e: React.MouseEvent<HTMLLIElement>): void => {
    const {
      currentTarget: {
        dataset: { index },
      },
    } = e;

    if (!index) {
      return;
    }

    findReservation(index);
    toggleRejectReservationModal(true);
  };

  const renderRowActions = (index: number): JSX.Element | false => (
    <MenuList>
      <MenuItem data-index={index} onClick={handleApproveClick} disabled={!isReservationEditable(index)}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <Typography variant="body2">Approve</Typography>
      </MenuItem>
      <MenuItem data-index={index} onClick={handleRejectClick} disabled={!isReservationEditable(index)}>
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        <Typography variant="body2">Reject</Typography>
      </MenuItem>
    </MenuList>
  );

  return {
    closeUserModal,
    renderRowActions,
  };
};

export default useReservationView;

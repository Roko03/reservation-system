import { JSX } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Delete, Edit } from '@mui/icons-material';
import { ListItemIcon, MenuItem, MenuList, Typography } from '@mui/material';

import colors from '@/styles/themes/colors';
import {
  clearSelectedObject,
  findObject,
  toggleDeleteObjectModal,
  toggleUpdateObjectModal,
} from '@/valtio/objects/objects.action';

interface useObjectViewPayload {
  selectObject: React.MouseEventHandler<HTMLTableRowElement>;
  closeObjectModal: () => void;
  renderRowActions: (index: number) => JSX.Element | false;
}

const useObjectView = (): useObjectViewPayload => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const closeObjectModal = (): void => {
    clearSelectedObject();
    navigate(`/admin/objects?${searchParams.toString()}`);
  };

  const selectObject: React.MouseEventHandler<HTMLTableRowElement> = ({
    currentTarget: {
      dataset: { id },
    },
  }) => {
    if (!id) {
      return;
    }

    navigate(`/admin/objects/${id}?${searchParams.toString()}`);
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

    findObject(index);
    toggleUpdateObjectModal(true);
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

    findObject(index);
    toggleDeleteObjectModal(true);
  };

  const renderRowActions = (index: number): JSX.Element | false => (
    <MenuList>
      <MenuItem data-index={index} onClick={handleUpdateClick}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        <Typography variant="body2">Uredi objekt</Typography>
      </MenuItem>
      <MenuItem data-index={index} onClick={handleDeleteClick}>
        <ListItemIcon>
          <Delete fill={colors.red100} />
        </ListItemIcon>
        <Typography variant="body2" color={colors.red100}>
          Izbrisi objekt
        </Typography>
      </MenuItem>
    </MenuList>
  );

  return {
    selectObject,
    closeObjectModal,
    renderRowActions,
  };
};

export default useObjectView;

import React, { PropsWithChildren, useState } from 'react';

import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu } from '@mui/material';

const MeatballsMenu: React.FC<PropsWithChildren> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClick={handleClose} onClose={handleClose}>
        {children}
      </Menu>
    </>
  );
};

export default MeatballsMenu;

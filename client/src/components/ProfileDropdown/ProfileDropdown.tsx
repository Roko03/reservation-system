import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';

import { UserRoleName } from '@/model/user.model';
import useLogout from '@/utils/hooks/useLogout';
import { roleGuard } from '@/utils/static/roleGuard';
import { useAuthStore } from '@/valtio/auth/auth.store';

import styles from './ProfileDropdown.module.scss';

const ProfileDropdown = () => {
  const [profileMenu, setProfileMenu] = useState<null | HTMLElement>(null);
  const handleLogout = useLogout();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const isAdmin = user && roleGuard(user.role, [UserRoleName.ADMIN, UserRoleName.SUPERADMIN]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileMenu(event.currentTarget);
  };

  const handleClose = (href?: string) => {
    if (href) {
      navigate(href);
    }

    setProfileMenu(null);
  };

  if (!user) return null;

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={profileMenu ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={profileMenu ? 'true' : undefined}
      >
        {user.profileImage ? (
          <Avatar src={user.profileImage} alt="User image avatar" sx={{ width: 32, height: 32 }}>
            M
          </Avatar>
        ) : (
          <Avatar sx={{ width: 32, height: 32 }}>{user.firstname[0].toUpperCase()}</Avatar>
        )}
      </IconButton>
      <Menu
        anchorEl={profileMenu}
        open={Boolean(profileMenu)}
        onClose={() => handleClose()}
        classes={{ root: styles.menuRoot, paper: styles.paper }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {!isAdmin && (
          <>
            <MenuItem onClick={() => handleClose('/profile')} className={styles.menuItem}>
              <Typography variant="body1">Profil</Typography>
            </MenuItem>
            <Divider />
          </>
        )}
        <MenuItem className={styles.menuItem} onClick={handleLogout}>
          <Typography variant="body1">Odjavi se</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileDropdown;

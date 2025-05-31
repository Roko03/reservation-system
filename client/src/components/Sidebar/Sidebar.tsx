import React from 'react';

import { Box } from '@mui/material';

import NavigationSidebar from '@/components/Navigation/NavigationSidebar/NavigationSidebar';
import { UserRoleName } from '@/model/user.model';
import { roleGuard } from '@/utils/static/roleGuard';
import { useAuthStore } from '@/valtio/auth/auth.store';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const { user } = useAuthStore();

  if (!user || !roleGuard(user.role, [UserRoleName.ADMIN, UserRoleName.SUPERADMIN])) return null;

  return (
    <Box component="aside" className={styles.container}>
      <NavigationSidebar />
    </Box>
  );
};

export default Sidebar;

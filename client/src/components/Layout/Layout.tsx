import React from 'react';

import { Box } from '@mui/material';
import cx from 'clsx';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

import styles from './Layout.module.scss';

interface LayoutProps {
  isAdmin?: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isAdmin = false, children }) => (
  <Box className={cx(styles.container, { [styles.adminContainer]: isAdmin })}>
    <Sidebar />
    <main className={styles.main}>
      <Header />
      {children}
    </main>
  </Box>
);

export default Layout;

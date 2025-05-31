import React from 'react';

import { Box } from '@mui/material';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Box className={styles.container}>
    <Sidebar />
    <main className={styles.main}>
      <Header />
      {children}
    </main>
  </Box>
);

export default Layout;

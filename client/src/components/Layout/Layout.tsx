import React from 'react';

import Footer from '@/components/Footer';

import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.container}>
    <main className={styles.main}>{children}</main>
    <Footer />
  </div>
);

export default Layout;

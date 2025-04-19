import React from 'react';

import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.container}>
    <main className={styles.main}>{children}</main>
  </div>
);

export default Layout;

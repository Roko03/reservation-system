import React from 'react';

import styles from './Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={styles.container}>
    <a
      href="https://workspace.hr?utm_source=@workspace-studio/react-boilerplate"
      target="_blank"
      rel="noopener noreferrer"
    >
      Made by Workspace
    </a>
  </footer>
);

export default Footer;

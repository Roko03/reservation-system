import React from 'react';

import { Modal, ModalProps } from '@mui/material';

import styles from './Popup.module.scss';

const Popup: React.FC<ModalProps> = ({ open, onClose, children }) => (
  <Modal open={open} onClose={onClose}>
    <div className={styles.container}>{children}</div>
  </Modal>
);

export default Popup;

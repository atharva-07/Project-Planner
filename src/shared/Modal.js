import React from 'react';
import styles from './styles/Modal.module.css';

export const Modal = ({ children }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

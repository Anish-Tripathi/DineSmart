import React from 'react';
import ReactDom from 'react-dom';
import styles from './Modal.module.css';

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
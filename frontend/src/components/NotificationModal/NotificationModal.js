import React from 'react';
import styles from './NotificationModal.module.css';

const NotificationModal = ({ message, onClose }) => (
  <div className={styles.notificationOverlay} tabIndex={-1} onClick={onClose} aria-modal="true" role="dialog">
    <div
      className={styles.notificationModal}
      onClick={e => e.stopPropagation()}
      role="alert"
      aria-live="assertive"
    >
      <div className={styles.notificationContent}>
        <div className={styles.iconCircle}>
          <svg
            className={styles.successIcon}
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#25a244"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="11" fill="#e8f5e9" stroke="none"/>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <p className={styles.message}>{message}</p>
      </div>
      <button
        className={styles.notificationCloseButton}
        onClick={onClose}
        aria-label="Close notification"
        tabIndex={0}
      >
        <span>&times;</span>
      </button>
    </div>
  </div>
);

export default NotificationModal;
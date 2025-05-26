import React from 'react';
import styles from './ConfirmationModal.module.css';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmationModal = ({ 
  title = "Confirm Action", 
  message = "Are you sure you want to perform this action?", 
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm, 
  onCancel 
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <AlertTriangle className={styles.warningIcon} size={24} />
            <h3>{title}</h3>
          </div>
          <button className={styles.closeButton} onClick={onCancel}>
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.modalContent}>
          <p>{message}</p>
          
          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton} onClick={onCancel}>
              {cancelText}
            </button>
            <button className={styles.confirmButton} onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
import React from 'react';
import styles from './ActionFooter.module.css';

const ActionFooter = ({ onCreateClick, onCancelClick }) => {
  return (
    <div className={styles.actionFooter}>
      <div className={styles.buttonGroup}>
        <div className={`${styles.button} ${styles.createButton}`} onClick={onCreateClick}>
          <div className={styles.createButtonText}>Создать</div>
        </div>
        <div className={`${styles.button} ${styles.cancelButton}`} onClick={onCancelClick}>
          <div className={styles.cancelButtonText}>Отмена</div>
        </div>
      </div>
    </div>
  );
};

export default ActionFooter;

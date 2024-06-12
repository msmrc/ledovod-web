import React from 'react';
import styles from './TableRow.module.css';

const TableRow = ({ row }) => {
  return (
    <div className={styles.rowContainer}>
      {row.map((item, index) => (
        <div key={index} className={styles.rowItem}>
          {item}
        </div>
      ))}
      <div className={styles.rowActions}>
        <div className={styles.actionIcon}></div>
        <div className={styles.actionIcon}></div>
      </div>
    </div>
  );
};

export default TableRow;

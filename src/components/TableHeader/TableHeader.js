import React from 'react';
import styles from './TableHeader.module.css';

const TableHeader = ({ headers }) => {
  return (
    <div className={styles.headerContainer}>
      {headers.map((header, index) => (
        <div key={index} className={styles.headerItem}>
          {header}
        </div>
      ))}
      <div className={styles.headerActions}></div>
    </div>
  );
};

export default TableHeader;

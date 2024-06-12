import React from 'react';
import styles from './PageHeaderTab.module.css';

const PageHeaderTab = ({ name, count, active, onClick }) => {
  return (
    <div
      className={`${styles.pageHeaderTab} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      <div className={styles.pageHeaderTabText}>{name}</div>
      <div className={styles.pageHeaderTabBadge}>{count}</div>
    </div>
  );
};

export default PageHeaderTab;

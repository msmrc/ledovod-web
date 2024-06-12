import React from 'react';
import styles from './PageHeaderAddButton.module.css';

const PageHeaderAddButton = ({ onClick }) => {
  return (
    <div className={styles.pageHeaderAddButton} onClick={onClick}>
      Добавить
    </div>
  );
};

export default PageHeaderAddButton;

import React from 'react';
import styles from './PageHeaderContent.module.css';
import PageHeaderTitleContainer from '../PageHeaderTitleContainer/PageHeaderTitleContainer';
import PageHeaderAddButton from '../PageHeaderAddButton/PageHeaderAddButton';

const PageHeaderContent = ({ title, tabs, activeTab, onTabClick, onAddButtonClick }) => {
  return (
    <div className={styles.pageHeaderContent}>
      <PageHeaderTitleContainer title={title} tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />
      <PageHeaderAddButton onClick={onAddButtonClick}>Добавить</PageHeaderAddButton>
    </div>
  );
};

export default PageHeaderContent;

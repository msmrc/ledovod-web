import React from 'react';
import styles from './PageHeader.module.css';
import PageHeaderContent from '../PageHeaderContent/PageHeaderContent';

const PageHeader = ({ title, tabs, activeTab, onTabClick, onAddButtonClick }) => {
  return (
    <div className={styles.pageHeader}>
      <PageHeaderContent
        title={title}
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={onTabClick}
        onAddButtonClick={onAddButtonClick}
      />
    </div>
  );
};

export default PageHeader;

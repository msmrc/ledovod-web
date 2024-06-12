import React from 'react';
import styles from './PageHeaderTitleContainer.module.css';
import PageHeaderTabs from '../PageHeaderTabs/PageHeaderTabs';

const PageHeaderTitleContainer = ({ title, tabs, activeTab, onTabClick }) => {
  return (
    <div className={styles.pageHeaderTitleContainer}>
      <div className={styles.pageHeaderTitle}>{title}</div>
      {tabs && tabs.length > 0 && (
        <PageHeaderTabs tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />
      )}
    </div>
  );
};

export default PageHeaderTitleContainer;

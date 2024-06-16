import React from 'react';
import styles from './PageHeaderTabs.module.css';
import PageHeaderTab from '../PageHeaderTab/PageHeaderTab';

const PageHeaderTabs = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className={styles.pageHeaderTabs}>
      {tabs.map((tab, index) => (
        <PageHeaderTab
          key={index}
          name={tab.name}
          count={tab.count}
          active={activeTab === tab.val}
          onClick={() => onTabClick(tab)}
        />
      ))}
    </div>
  );
};

export default PageHeaderTabs;

import React from "react";
import styles from "./PageHeaderWithBack.module.css";

const PageHeaderWithBack = ({ title, onBackClick }) => {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.headerContent}>
        <div className={styles.backButton} onClick={onBackClick}>
          <div className={styles.backIcon}></div>
        </div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
};

export default PageHeaderWithBack;

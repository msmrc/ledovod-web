import React from "react";
import styles from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <div className={styles.header}>
      <img
        className={styles.logo}
        src="/images/logo.png"
        alt="Logo"
      />
    </div>
  );
};

export default MainHeader;

import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";
import MainHeader from "../MainHeader/MainHeader";

const MainLayout = () => {
  return (
    <div className={styles.mainLayout}>
      <MainHeader />
      <main>
        <div className={styles.mainContainer}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;

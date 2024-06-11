import React from "react";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.css";
import SideNav from "../SideNav/SideNav";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <SideNav />
      <div className="dashboard-main-content">
        <div className="dashboard-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

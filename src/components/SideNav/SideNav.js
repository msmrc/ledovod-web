import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideNav.module.css";
import { ReactComponent as ChartPieIcon } from "../../data/icons/ChartPie.svg";
import { ReactComponent as BoatIcon } from "../../data/icons/Boat.svg";
import { ReactComponent as ClipboardTextIcon } from "../../data/icons/ClipboardText.svg";
import { ReactComponent as FactoryIcon } from "../../data/icons/Factory.svg";
import { ReactComponent as MapPinIcon } from "../../data/icons/MapPin.svg";

const SideNav = () => {
  const location = useLocation();

  const menuItems = [
    { to: "/dashboard/schedule", icon: ClipboardTextIcon, label: "Расписание" },
    { to: "/dashboard/requests", icon: ChartPieIcon, label: "Заявки" },
    { to: "/dashboard/ships", icon: BoatIcon, label: "Корабли" },
    { to: "/dashboard/icebreakers", icon: FactoryIcon, label: "Ледоколы" },
    { to: "/dashboard/configuration", icon: MapPinIcon, label: "Конфигуратор" },
  ];

  return (
    <div className={styles.sideNav}>
      <div className={styles.topSection}>
        <div className={styles.logoContainer}>
          <img
            className={styles.logo}
            src="/images/logo_horizontal.svg"
            alt="Logo"
          />
        </div>
        <div className={styles.menu}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`${styles.menuItem} ${
                  location.pathname === item.to ? styles.active : ""
                }`}
              >
                <div className={styles.iconWrapper}>
                  <Icon
                    className={`icon ${
                      location.pathname === item.to ? "selected" : ""
                    }`}
                  />
                </div>
                <div className={styles.menuText}>{item.label}</div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.userContainer}>
          <div className={styles.userIconWrapper}>
            <img
              className={styles.userIcon}
              src="/images/user.png"
              alt="User"
            />
          </div>
          <div className={styles.userName}>Михаил М.</div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

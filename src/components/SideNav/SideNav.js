import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './SideNav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faShip, faIceCream, faCalendarAlt, faMap } from '@fortawesome/free-solid-svg-icons';

const SideNav = () => {
  const location = useLocation();

  const menuItems = [
    { to: '/dashboard/requests', icon: faInbox, label: 'Заявки' },
    { to: '/dashboard/ships', icon: faShip, label: 'Корабли' },
    { to: '/dashboard/icebreakers', icon: faIceCream, label: 'Ледоколы' },
    { to: '/dashboard/schedule', icon: faCalendarAlt, label: 'Расписание' },
    { to: '/dashboard/sea-map', icon: faMap, label: 'Карта' },
  ];

  return (
    <div className={styles.sideNav}>
      <div className={styles.topSection}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src="/images/logo_horizontal.svg" alt="Logo" />
        </div>
        <div className={styles.menu}>
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`${styles.menuItem} ${location.pathname === item.to ? styles.active : ''}`}
            >
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon icon={item.icon} className={styles.icon} />
              </div>
              <div className={styles.menuText}>{item.label}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.userContainer}>
          <div className={styles.userIconWrapper}>
            <img className={styles.userIcon} src="/images/user.png" alt="User" />
          </div>
          <div className={styles.userName}>Михаил М.</div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

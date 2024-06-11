import React from "react";
import { Outlet, Link } from "react-router-dom";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div>
      <header className="admin-header">
        <div className="logo-menu-container">
          <div className="logo">
            <Link to="/">Ledovod</Link>
          </div>
          <nav>
            <ul className="menu">
              <li className="menu-item">
                <Link to="/dashboard/requests">Заявки</Link>
              </li>
              <li className="menu-item">
                <Link to="/dashboard/ships">Корабли</Link>
              </li>
              <li className="menu-item">
                <Link to="/dashboard/icebreakers">Ледоколы</Link>
              </li>
              <li className="menu-item">
                <Link to="/dashboard/schedule">Расписание</Link>
              </li>
              <li className="menu-item">
                <Link to="/dashboard/sea-map">Конфигуратор</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="user-info">
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
          <span>Михаил</span>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

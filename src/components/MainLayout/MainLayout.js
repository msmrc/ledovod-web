import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div>
      {/* <header>
          <div className="logo"><Link to="/">Ledovod</Link></div>
          <nav>
            <ul>
                <li><Link to="/dashboard">Войти</Link></li>
            </ul>
          </nav>
        </header> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

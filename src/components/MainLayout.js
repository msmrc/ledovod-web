import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/dashboard">Войти</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

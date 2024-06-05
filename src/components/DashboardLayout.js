import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/dashboard/requests">Заявки</Link></li>
            <li><Link to="/dashboard/ships">Корабли</Link></li>
            <li><Link to="/dashboard/icebreakers">Ледоколы</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

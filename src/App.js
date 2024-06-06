import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout/MainLayout';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import Ships from './pages/Ships';
import Icebreakers from './pages/Icebreakers';
import './App.css';
import Schedule from './pages/Schedule/Schedule';
import SeaMap from './pages/SeaMap/SeaMap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="ships" element={<Ships />} />
          <Route path="icebreakers" element={<Icebreakers />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="sea-map" element={<SeaMap />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

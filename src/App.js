import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout/MainLayout';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import Home from './pages/Home/Home';
import Schedule from './pages/Schedule/Schedule';
import SeaMap from './pages/SeaMap/SeaMap';
import Requests from './pages/Requests/Requests';
import Ships from './pages/Ships/Ships';
import Icebreakers from './pages/Icebreakers/Icebreakers';
import './App.css';
import CreateRequest from './pages/CreateRequest/CreateRequest';
import CreateShip from './pages/CreateShip/CreateShip';
import CreateIcebreaker from './pages/CreateIcebreaker/CreateIcebreaker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index path="requests" element={<Requests />} />
          <Route path="requests/create" element={<CreateRequest />} />
          <Route path="ships" element={<Ships />} />
          <Route path="ships/create" element={<CreateShip />} />
          <Route path="icebreakers" element={<Icebreakers />} />
          <Route path="icebreakers/create" element={<CreateIcebreaker />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="configuration" element={<SeaMap />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

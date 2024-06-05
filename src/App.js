import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import Ships from './pages/Ships';
import Icebreakers from './pages/Icebreakers';
import './App.css';

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

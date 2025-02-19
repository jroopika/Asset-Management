import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Dashboard from './components/adminDash/Dashboard';
import LandingPage from './components/Landing/LandingPage';
import LoginPage from './components/Login/login';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ActivityLog from './components/activityLogs/ActivityLogs';
import Dashboard from './components/adminDash/Dashboard';
import LandingPage from './components/Landing/LandingPage';
import LoginPage from './components/Login/login';
import ManageAssets from './components/manageasset/ManageAssets';
import ManageUsers from './components/manageUsers/ManageUsers';
import QRScanner from './components/qrScanner/QRScanner';
import Settings from './components/adminSetting/Setting';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manageasset" element={<ManageAssets />} />
        <Route path="/manageUsers" element={<ManageUsers />} />
        <Route path ="/activityLogs" element ={<ActivityLog/>}/>
        <Route path ="/qrScanner" element ={<QRScanner/>}/>
        <Route path ="/adminSetting" element ={<Settings/>}/>
        {/* Fallback route */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;

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
import HODDashboard from './components/Hod/Hod';
import HodSettings from './components/hodSettings/HodSetting';
import HODNotifications from './components/hodnotifications/hodNotifications';
import HODActivityLogs from './components/hodActivity/ActivityLogs';
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manageasset" element={<ManageAssets />} />
          <Route path="/manageUsers" element={<ManageUsers />} />
          <Route path="/activityLogs" element={<ActivityLog />} />
          <Route path="/qrScanner" element={<QRScanner />} />
          <Route path="/adminSetting" element={<Settings />} />
          <Route path="/hod" element={<HODDashboard />} />
          <Route path="/hodSettings" element={<HodSettings />} />
          <Route path="/hodnotifications" element={<HODNotifications />} />
          <Route path="/hodActivity" element={<HODActivityLogs />} />
          {/* Fallback route */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>

        {/* ✅ Footer is now outside <Routes>, fixing the error */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

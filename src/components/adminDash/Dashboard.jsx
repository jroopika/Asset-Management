import axios from "axios";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { Link, Route, Routes } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <div className="dashboard-content">
        <Routes>
          <Route path="assets" element={<Assets />} />
          <Route path="qr-scanner" element={<QRScanner />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};

// 🟢 Sidebar Component
const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="assets">📦 Assets</Link></li>
        <li><Link to="qr-scanner">📷 QR Scanner</Link></li>
        <li><Link to="reports">📊 Reports</Link></li>
        <li><Link to="users">👤 Users</Link></li>
        <li><Link to="settings">⚙️ Settings</Link></li>
      </ul>
    </div>
  );
};

// 🟢 Assets Management
const Assets = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    axios.get("/api/assets")
      .then((res) => setAssets(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="section">
      <h2>📦 Manage Assets</h2>
      <ul>
        {assets.map((asset) => (
          <li key={asset._id}>{asset.name} - {asset.serialNumber}</li>
        ))}
      </ul>
    </div>
  );
};

// 🟢 QR Code Scanner
const QRScanner = () => {
  const handleScan = (data) => {
    if (data) {
      alert(`Scanned Data: ${data}`);
    }
  };

  return (
    <div className="section">
      <h2>📷 QR Code Scanner</h2>
      <QrReader
        delay={300}
        onResult={(result, error) => {
          if (result) handleScan(result.text);
        }}
        style={{ width: "100%", border: "2px solid cyan" }}
      />
    </div>
  );
};

// 🟢 Reports Section
const Reports = () => {
  return (
    <div className="section">
      <h2>📊 Asset Reports</h2>
      <p>View detailed asset usage reports.</p>
    </div>
  );
};

// 🟢 Settings Page
const Settings = () => {
  return (
    <div className="section">
      <h2>⚙️ Settings</h2>
      <p>Configure admin dashboard settings.</p>
    </div>
  );
};

// 🟢 Manage Users
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="section">
      <h2>👤 Manage Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

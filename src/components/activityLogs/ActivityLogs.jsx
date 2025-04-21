import React from "react";
import { Link } from "react-router-dom";
import "./ActivityLogs.css";

const AdminActivityLogs = () => {
  const activityData = [
    { id: 1, action: "Asset Assigned to User", date: "March 25, 2025" },
    { id: 2, action: "Asset Repaired", date: "March 22, 2025" },
    { id: 3, action: "Asset Request Approved", date: "March 20, 2025" },
  ];

  return (
    <>
      {/* ✅ Admin Navbar */}
      <nav className="admin-navbar">
        <h2 className="admin-navbar-title">ADMIN PANEL</h2>
        <div className="admin-nav-links">
          <Link to="/manageasset">Manage Assets</Link>
          <Link to="/manageUsers">Manage Users</Link>
          <Link to="/activityLogs">Activity Logs</Link>
          <Link to="/adminSetting">Settings</Link>
        </div>
      </nav>

      {/* ✅ Activity Logs */}
      <div className="admin-activity-container">
        <h1 className="admin-activity-title">Admin Activity Logs</h1>
        <table className="admin-activity-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.action}</td>
                <td>{log.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminActivityLogs;

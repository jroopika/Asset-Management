import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import "./QuickActionsNavbar.css";

const QuickActionsNavbar = () => {
  const navigate = useNavigate();

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear token
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="quick-actions-navbar">
      {/* ✅ User Dashboard on the left */}
      <Link to="/userDashboard" className="nav-title">User Dashboard</Link>

      {/* ✅ Navigation Links at the Center */}
      <div className="nav-links">
        <Link to="/requestAsset">Request New Asset</Link>
        <Link to="/scanQR">Scan QR Code</Link>
        <Link to="/reportIssue">Report Issue</Link>
        <Link to="/userActivityLogs">Activity Logs</Link>
      </div>

      {/* ✅ Profile & Logout on Right */}
      <div className="nav-right">
        <Link to="/profile" className="nav-btn">
          <FaUser /> Profile
        </Link>
        <button onClick={handleLogout} className="nav-btn logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
};

export default QuickActionsNavbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Setting.css";

const AdminSettings = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [adminData, setAdminData] = useState({
    username: "Manideep",
    empid: "123",
    dept: "CSE",
    email: "mani@kmit.in",
    password: "",
    confirmPassword: "",
    theme: localStorage.getItem("theme") || "dark",
    notification: true,
  });

  useEffect(() => {
    document.body.classList.add(`theme-${adminData.theme}`);
    localStorage.setItem("theme", adminData.theme);
    return () => document.body.classList.remove(`theme-${adminData.theme}`);
  }, [adminData.theme]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdminData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    if (adminData.password !== adminData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }
    setMessage("✅ Profile updated successfully!");
    setAdminData({ ...adminData, password: "", confirmPassword: "" });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="admin-navbar">
        <h2 className="admin-navbar-title">ADMIN PANEL</h2>
        <div className="admin-nav-links">
          <Link to="/manageasset">Manage Assets</Link>
          <Link to="/manageUsers">Manage Users</Link>
          <Link to="/AdminReq">Manage Requests</Link>
          <Link to="/AdminIssues">Issues</Link>
          <Link to="/adminSetting">Settings</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </nav>

      <div className="admin-settings-container">
        <h2 className="admin-settings-title">Admin Settings</h2>
        {message && <p className="admin-settings-message">{message}</p>}

        <form className="admin-settings-form">
          <label>Username:</label>
          <input type="text" name="username" value={adminData.username} onChange={handleChange} />

          <label>Emp ID:</label>
          <input type="text" name="empid" value={adminData.empid} onChange={handleChange} />

          <label>Department:</label>
          <input type="text" name="dept" value={adminData.dept} onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" value={adminData.email} onChange={handleChange} />

          <label>New Password:</label>
          <input type="password" name="password" value={adminData.password} onChange={handleChange} placeholder="Enter new password" />

          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={adminData.confirmPassword} onChange={handleChange} placeholder="Confirm new password" />

          <label>Theme:</label>
          <select name="theme" value={adminData.theme} onChange={handleChange}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>

          <label>
            <input type="checkbox" name="notification" checked={adminData.notification} onChange={handleChange} />
            Enable Notifications
          </label>

          <button type="button" className="admin-save-btn" onClick={handleSave}>Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default AdminSettings;

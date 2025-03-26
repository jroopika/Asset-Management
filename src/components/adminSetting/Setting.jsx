import React, { useState, useEffect } from "react";
import "./Setting.css";

const AdminSettings = () => {
  const [adminData, setAdminData] = useState({
    username: "Cherry",
    empid:"123",
    dept :"CSE",
    email: "cherry@gmail.com",
    password: "",
    theme: localStorage.getItem("theme") || "dark",
    notification: true,
  });

  // Apply the theme to the body
  useEffect(() => {
    document.body.className = adminData.theme;
    localStorage.setItem("theme", adminData.theme);
  }, [adminData.theme]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdminData({
      ...adminData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Admin Settings</h2>

      <form className="settings-form">
        {/* Username */}
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={adminData.username}
          onChange={handleChange}
        />
        {/* Empid */}
        <label>Emp ID:</label>
        <input
          type="text"
          name="empid"
          value={adminData.empid}
          onChange={handleChange}
        />
        {/* Dept */}
        <label>Department:</label>
        <input
          type="text"
          name="dept"
          value={adminData.dept}
          onChange={handleChange}
        />
        {/* Email */}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={adminData.email}
          onChange={handleChange}
        />

        {/* Password */}
        <label>New Password:</label>
        <input
          type="password"
          name="password"
          value={adminData.password}
          onChange={handleChange}
          placeholder="Enter new password"
        />

        {/* Theme Switch */}
        <label>Theme:</label>
        <select name="theme" value={adminData.theme} onChange={handleChange}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>

        {/* Notifications */}
        <label>
          <input
            type="checkbox"
            name="notification"
            checked={adminData.notification}
            onChange={handleChange}
          />
          Enable Notifications
        </label>
      </form>
    </div>
  );
};

export default AdminSettings;

import React, { useEffect, useState } from "react";
import QuickActionsNavbar from "../quickActions/QuickActionsNavbar";
import "./Profile.css";

const Profile = () => {
  // Initialize user state with empty values or localStorage data if available
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "********", // Hiding real password
  });

  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fetch user data from localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        // Safely parse user data
        const parsedUser = JSON.parse(userData);
        setUser({
          name: parsedUser.name || "",
          email: parsedUser.email || "",
          password: "********", // Hide password by default
        });
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  // Handle input change for name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Handle save button click
  const handleSave = () => {
    if (newPassword && newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    if (newPassword) {
      setUser((prev) => ({ ...prev, password: newPassword }));
    }

    // Update localStorage with new user data
    const updatedUser = {
      ...user,
      password: newPassword || user.password, // Use the new password if provided
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Clear password fields and exit edit mode
    setNewPassword("");
    setConfirmPassword("");
    setEditMode(false);
    setMessage("✅ Profile updated successfully!");
  };

  return (
    <>
      <QuickActionsNavbar />
      <div className="user-profile-container">
        <h2 className="user-profile-title">User Profile</h2>
        {message && <p className="user-profile-message">{message}</p>}

        <label className="user-profile-label">Name:</label>
        {editMode ? (
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="user-profile-input"
          />
        ) : (
          <p>{user.name}</p>
        )}

        <label className="user-profile-label">Email:</label>
        <p>{user.email}</p>

        <label className="user-profile-label">Password:</label>
        {editMode ? (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="user-profile-input"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="user-profile-input mt-2"
            />
          </>
        ) : (
          <p>{user.password}</p>
        )}

        {editMode ? (
          <button
            className="user-profile-btn user-profile-save-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>
        ) : (
          <button
            className="user-profile-btn user-profile-edit-btn"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </>
  );
};

export default Profile;

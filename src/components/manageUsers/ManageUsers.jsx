import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link
import "./ManageUsers.css"; // Import CSS

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await fetch("/api/users", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Fetched users:", data); // Check response
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id)); // Use _id for deleting
  };

  return (
    <div>
      {/* ✅ Navbar Added */}
      <nav className="navbar">
        <h2 className="navbar-title">ADMIN PANEL</h2>
        <div className="nav-links">
          <Link to="/manageasset">Manage Assets</Link>
          <Link to="/manageUsers">Manage Users</Link>
            <Link to="/AdminReq">Manage Requests</Link>
          <Link to="/activityLogs">Activity Logs</Link>
          <Link to="/adminSetting">Settings</Link>
        </div>
      </nav>

      <div className="manage-users">
        <h2>Manage Users</h2>

        <button className="add-user-btn">
          <FaUserPlus /> Add User
        </button>

        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}> {/* Use _id as key */}
                    <td>{user._id}</td> {/* Use _id or another identifier */}
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="edit-btn">
                        <FaEdit />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(user._id)} // Use _id for deleting
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-users">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;

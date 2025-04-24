import React, { useEffect, useState } from "react";
import { fetchLogs } from "../../services/api";  // Import the fetchLogs function
import QuickActionsNavbar from "../quickActions/QuickActionsNavbar";
import "./UserActivityLogs.css";

const UserActivityLogs = () => {
  const [activityData, setActivityData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      // Fetch logs from the API using the token
      fetchLogs(token)
        .then((data) => {
          setActivityData(data);  // Set the data to state
        })
        .catch((err) => {
          setError("Failed to fetch activity logs.");
        });
    } else {
      setError("No token found.");
    }
  }, []);  // Empty dependency array to fetch logs once on component mount

  return (
    <>
      <QuickActionsNavbar />
      <div className="page-container">
        <h1>User Activity Logs</h1>
        {error && <p className="error-message">{error}</p>}
        <table className="activity-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Action</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activityData.length > 0 ? (
              activityData.map((log) => (
                <tr key={log._id}>
                  <td>{log._id}</td>
                  <td>{log.action}</td>
                  <td>{new Date(log.timestamp).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No logs available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserActivityLogs;

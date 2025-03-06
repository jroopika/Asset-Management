import React, { useState, useEffect } from "react";
import "./ActivityLogs.css"; // Import CSS file
import Input from "../ui/Input"; // Import Input component

const ActivityLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/activity-logs") // Change URL if needed
      .then((response) => response.json())
      .then((data) => setLogs(data))
      .catch((error) => console.error("Error fetching logs:", error));
  }, []);

  const filteredLogs = logs.filter((log) =>
    log.activity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="activity-log-container">
      {/* Floating Circles Background */}
      <div className="floating-circles">
        <span className="circle"></span>
        <span className="circle"></span>
        <span className="circle"></span>
      </div>

      <h2 className="activity-log-title">Activity Logs</h2>

      <div className="search-container">
        <Input
          type="text"
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table className="activity-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Activity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.user}</td>
                  <td>{log.activity}</td>
                  <td>{new Date(log.date).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-activity">No activity logs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLogs;

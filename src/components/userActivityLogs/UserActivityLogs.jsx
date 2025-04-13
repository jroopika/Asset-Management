import React from "react";
import QuickActionsNavbar from "../quickActions/QuickActionsNavbar";
import "./UserActivityLogs.css";

const UserActivityLogs = () => {
  const activityData = [
    { id: 1, action: "Laptop assigned", date: "March 25, 2025" },
    { id: 2, action: "Mouse replaced", date: "March 22, 2025" },
    { id: 3, action: "Keyboard request pending", date: "March 20, 2025" },
  ];

  return (
    <>
      <QuickActionsNavbar />
      <div className="page-container">
        <h1>User Activity Logs</h1>
        <table className="activity-table">
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

export default UserActivityLogs;

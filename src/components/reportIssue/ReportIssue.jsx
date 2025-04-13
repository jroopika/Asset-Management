import React, { useState } from "react";
import QuickActionsNavbar from "../quickActions/QuickActionsNavbar";
import "./ReportIssue.css";

const ReportIssue = () => {
  const [issue, setIssue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Issue Reported: ${issue}`);
    setIssue("");
  };

  return (
    <>
      <QuickActionsNavbar />
      <div className="page-container">
        <h1>Report an Issue</h1>
        <form onSubmit={handleSubmit} className="issue-form">
          <label>Describe the Issue:</label>
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            required
          ></textarea>

          <button type="submit">Submit Report</button>
        </form>
      </div>
    </>
  );
};

export default ReportIssue;

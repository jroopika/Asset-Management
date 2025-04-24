import React, { useState, useEffect } from "react";
import axios from "axios";
import QuickActionsNavbar from "../quickActions/QuickActionsNavbar";
import "./ReportIssue.css";

const ReportIssue = () => {
  const [assetId, setAssetId] = useState("");
  const [issue, setIssue] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser._id); // Assuming userId is part of the user object
    } else {
      alert("User not found. Please log in again.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assetId.trim() || !issue.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      console.log({ assetId, userId, issue });

      // Sending assetId and userId as custom string or number
      await axios.post("http://localhost:5000/api/issues", {
        assetId,  // Send assetId as a string or number
        userId,   // Send userId as a string or number
        issue,
      });

      alert("Issue reported successfully!");
      setAssetId("");
      setIssue("");
    } catch (error) {
      console.error("Error reporting issue:", error);
      alert("Failed to report issue. Please try again.");
    }
  };

  return (
    <>
      <QuickActionsNavbar />
      <div className="page-container">
        <h1>Report an Issue</h1>
        <form onSubmit={handleSubmit} className="issue-form">
          <label>Asset ID:</label>
          <input
            type="text"
            value={assetId}
            onChange={(e) => setAssetId(e.target.value)}
            required
          />

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

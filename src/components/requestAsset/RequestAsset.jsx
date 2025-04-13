import React, { useState } from "react";
import QuickActionsNavbar from "../quickActions/QuickActionsNavbar";
import "./RequestAsset.css";

const RequestAsset = () => {
  const [assetType, setAssetType] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Asset Request Submitted: ${assetType} - ${reason}`);
    setAssetType("");
    setReason("");
  };

  return (
    <>
      <QuickActionsNavbar />
      <div className="page-container">
        <h1>Request New Asset</h1>
        <form onSubmit={handleSubmit} className="asset-form">
          <label>Asset Type:</label>
          <input
            type="text"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            required
          />

          <label>Reason for Request:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>

          <button type="submit">Submit Request</button>
        </form>
      </div>
    </>
  );
};

export default RequestAsset;

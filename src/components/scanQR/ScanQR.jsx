import React from "react";
import QuickActionsNavbar from "../quickActions/QuickActionsNavbar";
import "./ScanQR.css";

const ScanQR = () => {
  return (
    <>
      <QuickActionsNavbar />
      <div className="page-container">
        <h1>Scan QR Code</h1>
        <p>Use your camera to scan asset QR codes.</p>
        <button className="scan-btn">Open Scanner</button>
      </div>
    </>
  );
};

export default ScanQR;

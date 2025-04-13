import React, { useState } from "react";
import { Link } from "react-router-dom";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import "./QRScanner.css";

const QRScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleScan = (result, error) => {
    if (result?.text) {
      try {
        const parsedData = JSON.parse(result.text);
        setScannedData(parsedData);
        setErrorMsg("");
      } catch (err) {
        console.error("Invalid QR Data:", result.text);
        setErrorMsg("Invalid QR code data");
      }
    }
    if (error) {
      console.error("QR Scan Error:", error);
    }
  };

  return (
    <div className="qr-scanner-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="navbar-title">ADMIN PANEL</h2>
        <div className="nav-links">
          <Link to="/manageasset">Manage Assets</Link>
          <Link to="/manageUsers">Manage Users</Link>
          <Link to="/activityLogs">Activity Logs</Link>
          <Link to="/qrscanner">QR Scanner</Link>
          <Link to="/adminSetting">Settings</Link>
        </div>
      </nav>

      {/* Floating Circles */}
      <div className="floating-circles"></div>

      <h2 className="qr-scanner-title">QR Code Scanner</h2>

      <div className="scanner-box">
        <QrReader onResult={handleScan} constraints={{ facingMode: "environment" }} style={{ width: "100%" }} />
      </div>

      {errorMsg && <p className="error-message">{errorMsg}</p>}

      {scannedData ? (
        <div className="scan-result">
          <h3>Scanned Asset Details:</h3>
          <pre>{JSON.stringify(scannedData, null, 2)}</pre>
        </div>
      ) : (
        <p className="waiting-message">Waiting for QR scan...</p>
      )}
    </div>
  );
};

export default QRScanner;

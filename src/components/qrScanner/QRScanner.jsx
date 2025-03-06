import React, { useState } from "react";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import "./QRScanner.css";

const QRScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleScan = (result, error) => {
    if (result?.text) {
      try {
        const parsedData = JSON.parse(result.text); // Ensure JSON is valid
        setScannedData(parsedData);
        setErrorMsg(""); // Clear any previous errors
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
      {/* Floating Circles Animation */}
      <div className="floating-circles"></div>

      <h2 className="qr-scanner-title">QR Code Scanner</h2>

      <div className="scanner-box">
        <QrReader
          onResult={handleScan}
          constraints={{ facingMode: "environment" }} // Use back camera
          style={{ width: "100%" }}
        />
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

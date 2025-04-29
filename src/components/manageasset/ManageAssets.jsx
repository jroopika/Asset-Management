import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { getAssets } from "../../services/api";
import { QRCodeSVG } from "qrcode.react"; // Use QRCodeSVG
import "./ManageAssets.css";

const ManageAssets = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [assets, setAssets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAssetId, setCurrentAssetId] = useState(null);

  const [newAssetName, setNewAssetName] = useState("");
  const [newSerialNumber, setNewSerialNumber] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const data = await getAssets();
      setAssets(data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || asset.status.toLowerCase() === filter.toLowerCase())
  );

  const handleAddAsset = () => {
    setIsEditing(false);
    setNewAssetName("");
    setNewSerialNumber("");
    setNewDescription("");
    setShowModal(true);
  };

  const handleEditAsset = (asset) => {
    setIsEditing(true);
    setCurrentAssetId(asset._id);
    setNewAssetName(asset.name);
    setNewSerialNumber(asset.serialNumber);
    setNewDescription(asset.description || "");
    setShowModal(true);
  };

  const handleSaveAsset = async () => {
    try {
      const newAsset = {
        name: newAssetName,
        serialNumber: newSerialNumber,
        description: newDescription,
      };

      let response, data;

      if (isEditing) {
        // Update existing asset
        response = await fetch(`http://localhost:5000/api/assets/${currentAssetId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAsset),
        });
      } else {
        // Create new asset
        response = await fetch("http://localhost:5000/api/assets/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAsset),
        });
      }

      data = await response.json();

      if (response.ok) {
        fetchAssets(); // Refresh the list
        setShowModal(false);
        setNewAssetName("");
        setNewSerialNumber("");
        setNewDescription("");
      } else {
        console.error("Failed to save asset:", data.error);
      }
    } catch (error) {
      console.error("Error saving asset:", error);
    }
  };

  const handleDeleteAsset = async (assetId) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/assets/${assetId}`, {
          method: "DELETE",
        });
        const data = await response.json();

        if (response.ok) {
          setAssets(assets.filter((asset) => asset._id !== assetId));
        } else {
          console.error("Failed to delete asset:", data.error);
        }
      } catch (error) {
        console.error("Error deleting asset:", error);
      }
    }
  };

  return (
    <div className="manage-assets">
      {/* Floating Circles */}
      <div className="floating-circles">
        <div className="floating-circle circle1"></div>
        <div className="floating-circle circle2"></div>
        <div className="floating-circle circle3"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="navbar-title">ADMIN PANEL</h2>
        <div className="nav-links">
          <Link to="/manageasset">Manage Assets</Link>
          <Link to="/manageUsers">Manage Users</Link>
            <Link to="/AdminReq">Manage Requests</Link>
          <Link to="/AdminIssues">Issues </Link>
          <Link to="/adminSetting">Settings</Link>
        </div>
      </nav>

      <h2>Manage Assets</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search Assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="available">Available</option>
          <option value="assigned">Assigned</option>
          <option value="in use">In Use</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <button className="add-asset" onClick={handleAddAsset}>
          <FaPlus /> Add Asset
        </button>
      </div>

      <table className="asset-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Asset Name</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>QR Code</th> {/* Add QR Code column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map((asset) => (
            <tr key={asset._id}>
              <td>{asset.serialNumber}</td>
              <td>{asset.name}</td>
              <td className={asset.status.toLowerCase().replace(" ", "-")}>
                {asset.status}
              </td>
              <td>{asset.assignedTo ? asset.assignedTo.name : "-"}</td>
              <td style={{ padding: "10px" }}>
              <QRCodeSVG
   value={`http://192.168.40.116:3000/asset/${asset._id}`} // UPDATED
  size={100}
  bgColor="#ffffff"
  fgColor="#000000"
  style={{ border: "1px solid #ccc", borderRadius: "8px" }}
/>

</td>

              <td>
                <FaEdit className="edit-icon" onClick={() => handleEditAsset(asset)} />
                <FaTrash className="delete-icon" onClick={() => handleDeleteAsset(asset._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay show">
          <div className="modal">
            <h3>{isEditing ? "Edit Asset" : "Add New Asset"}</h3>
            <input
              type="text"
              placeholder="Asset Name"
              value={newAssetName}
              onChange={(e) => setNewAssetName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Serial Number"
              value={newSerialNumber}
              onChange={(e) => setNewSerialNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />

            <div className="modal-buttons">
              <button onClick={handleSaveAsset} className="add-asset">
                {isEditing ? "Update" : "Save"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="add-asset"
                style={{ backgroundColor: "#DC3545" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAssets;

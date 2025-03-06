import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import "./ManageAssets.css"; // Import CSS for styling

const ManageAssets = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const assets = [
    { id: 1, name: "Laptop", status: "Assigned", user: "John Doe" },
    { id: 2, name: "Projector", status: "Available", user: "-" },
    { id: 3, name: "Printer", status: "Under Maintenance", user: "-" },
  ];

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || asset.status === filter)
  );

  return (
    <div className="manage-assets">
      {/* Floating Circles */}
      <div className="floating-circles">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
      </div>

      <h2>Manage Assets</h2>

      {/* Search & Filter */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search Assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Available">Available</option>
          <option value="Assigned">Assigned</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
        <button className="add-asset">
          <FaPlus /> Add Asset
        </button>
      </div>

      {/* Assets Table */}
      <table className="asset-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Asset Name</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.id}</td>
              <td>{asset.name}</td>
              <td className={asset.status.toLowerCase()}>{asset.status}</td>
              <td>{asset.user}</td>
              <td>
                <FaEdit className="edit-icon" />
                <FaTrash className="delete-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAssets;

const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
    serialNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: String,
    status: { type: String, enum: ["available", "in use", "maintenance"], default: "available" },
    qrCode: String,  // QR Code URL
    history: [
        {
            action: String, // e.g., "Assigned to John Doe"
            date: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Asset", assetSchema);

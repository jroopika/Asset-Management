const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who requested
    assetType: { type: String, required: true }, // Type of asset requested
    reason: { type: String, required: true }, // Reason for request
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, // Request status
    requestedAt: { type: Date, default: Date.now }, // Request timestamp
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Who approved/rejected
}, { timestamps: true });

module.exports = mongoose.model("Request", RequestSchema);

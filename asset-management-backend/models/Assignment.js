const mongoose = require("mongoose");
const AssignmentSchema = new mongoose.Schema({
    assetId: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedAt: { type: Date, default: Date.now },
    returnDate: { type: Date },
    status: { type: String, enum: ["assigned", "returned"], default: "assigned" },
}, { timestamps: true });
module.exports = mongoose.model("Assignment", AssignmentSchema);
const express = require("express");
const Request = require("../models/Request");
const Asset = require("../models/Asset");
const Log = require("../models/Log");

const router = express.Router();

// ✅ 1️⃣ User Requests an Asset
router.post("/request", async (req, res) => {
    try {
        const { userId, assetType, reason } = req.body;

        const newRequest = new Request({ userId, assetType, reason });
        await newRequest.save();

        // Log action
        await Log.create({ userId, action: "Requested asset", details: `Requested a ${assetType}` });

        res.status(201).json({ message: "Asset request submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ 2️⃣ HOD/Admin Approves or Rejects Request
router.put("/request/:id", async (req, res) => {
    try {
        const { status, approvedBy } = req.body; // "approved" or "rejected"
        const request = await Request.findById(req.params.id);
        if (!request) return res.status(404).json({ message: "Request not found" });

        request.status = status;
        request.approvedBy = approvedBy;
        await request.save();

        // Log action
        await Log.create({ userId: approvedBy, action: `Request ${status}`, details: `Request ${request._id} was ${status}` });

        res.status(200).json({ message: `Request ${status} successfully` });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
console.log("📌 Request Routes Loaded!");

const express = require("express");
const Log = require("../models/Log");

const router = express.Router();

// ✅ 5️⃣ Get All Logs (Admin Only)
router.get("/", async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

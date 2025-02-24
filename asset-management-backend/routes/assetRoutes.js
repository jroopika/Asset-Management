const express = require("express");
const QRCode = require("qrcode");
const asyncHandler = require("express-async-handler");
const Asset = require("../models/Asset");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Create an Asset with a QR Code
router.post(
  "/create",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    try {
      const { serialNumber, name, description } = req.body;

      if (!serialNumber || !name || !description) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }

      // Check if Asset already exists
      const existingAsset = await Asset.findOne({ serialNumber });
      if (existingAsset) {
        return res.status(400).json({ success: false, message: "Asset already exists" });
      }

      // 🌐 Generate QR Code URL for external users
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
      const assetUrl = `${frontendUrl}/asset/${serialNumber}`;

      // 🔄 Generate QR Code (as Base64 Data URL)
      const qrCodeImage = await QRCode.toDataURL(assetUrl);

      // 🆕 Create Asset in DB
      const newAsset = new Asset({
        serialNumber,
        name,
        description,
        qrCode: qrCodeImage, // Store QR code in DB
      });

      await newAsset.save();

      res.status(201).json({
        success: true,
        message: "✅ Asset created successfully",
        asset: newAsset,
      });
    } catch (error) {
      console.error("❌ Error creating asset:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  })
);

module.exports = router;

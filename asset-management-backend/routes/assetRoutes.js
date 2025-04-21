const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const Asset = require("../models/Asset");

// ✅ Fetch all assets
router.get("/", async (req, res) => {
  try {
    const assets = await Asset.find().populate("assignedTo", "name email");
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assets", error: error.message });
  }
});

// 🆕 Create Asset with QR Code
router.post("/create", async (req, res) => {
  const { serialNumber, name, description } = req.body;

  try {
    const newAsset = new Asset({ serialNumber, name, description });

    // Generate QR Code using asset ID
    const qrData = `http://yourdomain.com/asset/${newAsset._id}`;
    const qrCode = await QRCode.toDataURL(qrData);

    newAsset.qrCode = qrCode;
    await newAsset.save();

    res.status(201).json(newAsset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create asset" });
  }
});

// 🆕 Generate/Update QR Code for Existing Asset
router.get("/generate-qr/:id", async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    const qrData = `http://localhost:5000/asset/${asset._id}`;
    const qrCode = await QRCode.toDataURL(qrData);

    asset.qrCode = qrCode;
    await asset.save();

    res.status(200).json({ qrCode });
  } catch (err) {
    res.status(500).json({ message: "QR Code generation failed", error: err });
  }
});

// ✅ Get Asset by ID (Public Route for QR Page)
router.get("/public/:id", async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).send("Asset not found");
    res.json(asset);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Update an asset
router.put("/:id", async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(asset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an asset
router.delete("/:id", async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Asset deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

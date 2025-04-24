const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Issue = require("../models/Issue"); // Replace with actual path

// POST: Report an issue
router.post("/", async (req, res) => {
  const { assetId, userId, issue } = req.body;

  // Validate input
  if (!assetId || !userId || !issue) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Create a new issue
  const newIssue = new Issue({
    assetId,  // No conversion to ObjectId, just use the value as is
    userId,   // No conversion to ObjectId, just use the value as is
    description: issue,
    reportedAt: new Date(),
  });

  try {
    // Save the issue to the database
    await newIssue.save();
    res.status(201).json({ message: "Issue reported successfully!" });
  } catch (error) {
    // Handle server errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;

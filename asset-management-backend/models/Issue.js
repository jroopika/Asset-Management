const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  assetId: { type: String, required: true },  // assetId can now be a string or number
  userId: { type: String, required: true },   // userId can now be a string or number
  description: { type: String, required: true },
  reportedAt: { type: Date, default: Date.now },
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const assetRoutes = require("./routes/assetRoutes");

// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes); // ✅ Fixed: Register asset routes

// ✅ Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

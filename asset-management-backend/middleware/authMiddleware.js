const jwt = require("jsonwebtoken");
require("dotenv").config();

// ✅ Protect Routes: Verify JWT
const protect = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

// ✅ Admin Middleware: Restrict Access to Admins Only
const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied: Admins Only" });
    }
    next();
};

module.exports = { protect, adminOnly };

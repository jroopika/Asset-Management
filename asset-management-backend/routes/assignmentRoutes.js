const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");

// Assign asset (Admin)
router.post("/assign", assignmentController.createAssignment);

// Get all assignments
router.get("/", assignmentController.getAllAssignments);

// Return assigned asset
router.put("/return/:id", assignmentController.markAsReturned);

module.exports = router;

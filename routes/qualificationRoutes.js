const express = require("express");
const router = express.Router();
const requireAdmin = require("../middleware/adminMiddleware");

const protect = require("../middleware/authMiddleware");

const {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification
} = require("../controllers/qualificationController");

// Public routes
router.get("/", getQualifications);
router.get("/:id", getQualificationById);

// Protected routes
router.post("/", protect, requireAdmin, createQualification);
router.put("/:id", protect, requireAdmin, updateQualification);
router.delete("/:id", protect, requireAdmin, deleteQualification);

module.exports = router;

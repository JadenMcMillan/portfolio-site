const express = require("express");
const router = express.Router();
const requireAdmin = require("../middleware/adminMiddleware");

const protect = require("../middleware/authMiddleware");

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

// Public routes: anyone can view portfolio projects
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Protected routes: authentication required
router.post("/", protect, requireAdmin, createProject);
router.put("/:id", protect, requireAdmin, updateProject);
router.delete("/:id", protect, requireAdmin, deleteProject);

module.exports = router;
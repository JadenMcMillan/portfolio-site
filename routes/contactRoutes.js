const express = require("express");
const router = express.Router();
const requireAdmin = require("../middleware/adminMiddleware");

const protect = require("../middleware/authMiddleware");

const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

// Public route: visitors can submit contact forms
router.post("/", createContact);

// Protected routes: authentication required
router.get("/", protect, requireAdmin, getContacts);
router.get("/:id", protect, requireAdmin, getContactById);
router.put("/:id", protect, requireAdmin, updateContact);
router.delete("/:id", protect, requireAdmin, deleteContact);

module.exports = router;
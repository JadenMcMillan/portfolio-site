const express = require("express");
const router = express.Router();
const requireAdmin = require("../middleware/adminMiddleware");

const protect = require("../middleware/authMiddleware");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

// All user routes require authentication
router.use(protect);

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", requireAdmin, createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  signup,
  signin
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// Public authentication routes
router.post("/signup", signup);
router.post("/signin", signin);

// Protected route
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Access granted to protected route",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
});

router.post("/signout", protect, (req, res) => {
  res.status(200).json({
    message: "Sign out successful. Remove your token from the client."
  });
});

module.exports = router;
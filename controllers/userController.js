const mongoose = require("mongoose");
const User = require("../models/User");

// GET all users
// Returns only the authenticated user's account
exports.getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("name email createdAt updatedAt");

    res.status(200).json(user ? [user] : []);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve users"
    });
  }
};

// GET user by ID
exports.getUserById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    if (req.params.id !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const user = await User.findById(req.params.id)
      .select("name email createdAt updatedAt");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve user"
    });
  }
};


// POST create user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      typeof password !== "string" ||
      password.length < 8
    ) {
      return res.status(400).json({
        message: "Provide a name, valid email, and password of at least 8 characters."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password
    });

    // Triggers the bcrypt pre-save middleware
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    res.status(500).json({
      message: "Unable to create user"
    });
  }
};

// PUT update own user account
exports.updateUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    if (req.params.id !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const { name, email } = req.body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({
        message: "Valid name and email are required"
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.name = name.trim();
    user.email = email.trim().toLowerCase();

    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    res.status(500).json({
      message: "Unable to update user"
    });
  }
};

// DELETE own user account
exports.deleteUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    if (req.params.id !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete user"
    });
  }
};

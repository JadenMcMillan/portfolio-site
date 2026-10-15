
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Contact = require("./models/Contact");
const Project = require("./models/Project");
const Qualification = require("./models/Qualification");
const User = require("./models/User");

async function testModels() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully!");

    // Test Contact
    const contact = await Contact.create({
      firstName: "Test",
      lastName: "User",
      email: "contact@example.com",
      message: "Testing the contact model"
    });
    console.log("Contact saved:", contact._id);

    // Test Project
    const project = await Project.create({
      title: "Portfolio Website",
      completionDate: new Date("2026-10-01"),
      description: "My React portfolio project"
    });
    console.log("Project saved:", project._id);

    // Test Qualification
    const qualification = await Qualification.create({
      title: "Software Engineering Technology",
      completionDate: new Date("2027-06-01"),
      description: "Software Engineering program"
    });
    console.log("Qualification saved:", qualification._id);

    // Test User with password hashing
    const uniqueId = Date.now();
    const plainPassword = "TemporaryTestPassword123!";

    const user = await User.create({
      name: "Test User",
      email: `test${uniqueId}@example.com`,
      password: plainPassword
    });

    const savedUser = await User.findById(user._id)
      .select("+password");

    const isHashed = savedUser.password !== plainPassword;
    const isValid = await bcrypt.compare(
      plainPassword,
      savedUser.password
    );

    console.log("User saved:", user._id);
    console.log("Password is hashed:", isHashed);
    console.log("Password verification works:", isValid);
    console.log("Created date:", savedUser.createdAt);
    console.log("Updated date:", savedUser.updatedAt);

  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

testModels();

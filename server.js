require("dotenv").config();

const fs = require("fs");
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
const qualificationRoutes = require("./routes/qualificationRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Health check: also reports which commit is deployed (set by Render)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    commit: process.env.RENDER_GIT_COMMIT || "local"
  });
});

// Unknown API routes return JSON instead of the React page
app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Serve the built React app when it exists (production and CI)
const clientDist = path.join(__dirname, "client", "dist");

if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));

  // Let React Router handle page URLs such as /projects or /admin
  app.use((req, res, next) => {
    if (req.method !== "GET" || path.extname(req.path)) return next();
    res.sendFile(path.join(clientDist, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Welcome to MyPortfolio Backend!");
  });
}

// Connect to MongoDB
async function startServer() {
  try {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      throw new Error("JWT_SECRET must be configured with at least 32 characters");
    }
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully!");

    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
}

startServer();

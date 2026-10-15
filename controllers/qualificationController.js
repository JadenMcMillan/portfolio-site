const mongoose = require("mongoose");
const Qualification = require("../models/Qualification");

// GET all qualifications
exports.getQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.status(200).json(qualifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET qualification by ID
exports.getQualificationById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid qualification ID"
      });
    }

    const qualification = await Qualification.findById(req.params.id);

    if (!qualification) {
      return res.status(404).json({
        message: "Qualification not found"
      });
    }

    res.status(200).json(qualification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create qualification
exports.createQualification = async (req, res) => {
  try {
    const { title, completionDate, description } = req.body;

    const qualification = await Qualification.create({
      title,
      completionDate,
      description
    });

    res.status(201).json(qualification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update qualification
exports.updateQualification = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid qualification ID"
      });
    }

    const { title, completionDate, description } = req.body;

    const qualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      { title, completionDate, description },
      { new: true, runValidators: true }
    );

    if (!qualification) {
      return res.status(404).json({
        message: "Qualification not found"
      });
    }

    res.status(200).json(qualification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE qualification
exports.deleteQualification = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid qualification ID"
      });
    }

    const qualification = await Qualification.findByIdAndDelete(
      req.params.id
    );

    if (!qualification) {
      return res.status(404).json({
        message: "Qualification not found"
      });
    }

    res.status(200).json({
      message: "Qualification deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

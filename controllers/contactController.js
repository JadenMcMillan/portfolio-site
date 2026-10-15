const Contact = require("../models/Contact");
const mongoose = require("mongoose");

// GET all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving contacts"
    });
  }
};

// GET contact by ID
exports.getContactById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid contact ID"
      });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving contact"
    });
  }
};

// POST create contact
exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      message
    });

    res.status(201).json(contact);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid contact data",
        errors: Object.values(error.errors).map(e => e.message)
      });
    }

    res.status(500).json({
      message: "Error creating contact"
    });
  }
};

// PUT update contact
exports.updateContact = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid contact ID"
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    if (error.name === "ValidationError" ||
        error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid contact data"
      });
    }

    res.status(500).json({
      message: "Error updating contact"
    });
  }
};

// DELETE contact
exports.deleteContact = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid contact ID"
      });
    }

    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.status(200).json({
      message: "Contact deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting contact"
    });
  }
};

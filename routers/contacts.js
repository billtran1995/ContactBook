const express = require("express");
const router = express.Router();
const { Contact, PhoneNumber, Email, Address } = require("../db");

// Get contacts
router.get("/", (req, res) => {});

// Get a contact
router.get("/:id", (req, res) => {});

// Create contact
router.post("/create", (req, res) => {});

// Update contact
router.patch("/update/:id", (req, res) => {});

// Delete contact
router.delete("/delete/:id", (req, res) => {});

module.exports = router;

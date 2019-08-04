const express = require("express");
const router = express.Router();

// Get accounts
router.get("/", (req, res) => {});

// Get a account
router.get("/:id", (req, res) => {});

// Create account
router.post("/create", (req, res) => {});

// Update account
router.patch("/update/:id", (req, res) => {});

// Delete account
router.delete("/delete/:id", (req, res) => {});

module.exports = router;

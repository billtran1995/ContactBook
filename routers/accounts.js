const express = require("express");
const router = express.Router();

const { Account, Contact, PhoneNumber, Email, Address } = require("../db");

// Get accounts
router.get("/", async (req, res) => {
	try {
		const result = await Account.findAll();

		if (!result) {
			res.json({ msg: "No accounts found." });
		} else {
			res.json(result);
		}
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

// Get an account
router.get("/:id", async (req, res) => {
	try {
		const result = await Account.findOne({ where: { id: req.params.id } });

		if (!result) {
			result.msg = "This account does not exist.";
		}

		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

// Create an account
router.post("/create", async (req, res) => {
	try {
		const { userName, pictureUrl } = req.body;

		const [user] = await Account.findOrCreate({
			where: { userName },
			defaults: { pictureUrl }
		});

		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

// Update account
router.patch("/update/:id", async (req, res) => {
	try {
		const { userName, pictureUrl } = req.body;

		await Account.update(
			{ userName, pictureUrl },
			{
				where: { id: req.params.id }
			}
		);

		let result = await Account.findOne({ where: { id: req.params.id } });

		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

// Delete account
router.delete("/delete/:id", async (req, res) => {
	try {
		let { contactId } = await Contact.findOne({
			where: { accountId: req.params.id }
		});
		await PhoneNumber.destroy({
			where: { contactId: req.params.id }
		});
		await Email.destroy({
			where: { contactId: req.params.id }
		});
		await Address.destroy({
			where: { accouncontactIdtId: req.params.id }
		});
		// ====> Add Group as well

		await Contact.destroy({
			where: { contactId: req.params.id }
		});
		await Account.destroy({
			where: { accountId: req.params.id }
		});

		res.json({
			msg: "Account removed."
		});
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

module.exports = router;

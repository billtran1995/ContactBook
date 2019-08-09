const express = require("express");
const boom = require("@hapi/boom");
const router = express.Router();

const { Account, Contact, PhoneNumber, Email, Address } = require("../db");

// Get accounts
router.get("/", async (req, res, next) => {
	try {
		const result = await Account.findAll();

		res.json(result);
	} catch (err) {
		console.error(err);
		next(boom.internal("Unable to get accounts"));
	}
});

// Get an account
router.get("/:accountId", async (req, res, next) => {
	const { accountId } = req.params;
	try {
		const result = await Account.findOne({ where: { id: contactId } });

		res.json(result);
	} catch (err) {
		console.error(err);
		next(boom.internal("Unable to find account"));
	}
});

// Create an account
router.post("/create", async (req, res, next) => {
	try {
		const { userName, pictureUrl } = req.body;

		const [user] = await Account.findOrCreate({
			where: { userName },
			defaults: { pictureUrl }
		});

		res.json(user);
	} catch (err) {
		console.error(err);
		next(boom.internal("Unable to create account"));
	}
});

// Update account
router.patch("/update/:accountId", async (req, res, next) => {
	const { userName, pictureUrl } = req.body;
	const { accountId } = req.params;
	try {
		await Account.update(
			{ userName, pictureUrl },
			{
				where: { id: accountId }
			}
		);

		let result = await Account.findOne({ where: { id: accountId } });

		res.json(result);
	} catch (err) {
		console.error(err);
		next(boom.internal("Unable to update account"));
	}
});

// Delete account
router.delete("/delete/:accountId", async (req, res, next) => {
	const { accountId } = req.params;

	try {
		const contacts = await Contact.findAll({ where: { accountId } });

		await Promise.all(
			contacts.map(async ({ id }) => {
				await PhoneNumber.destroy({ where: { contactId: id } });
				await Address.destroy({ where: { contactId: id } });
				await Email.destroy({ where: { contactId: id } });
				await Contact.destroy({ where: { id } });
			})
		);

		await Account.destroy({ where: { id: accountId } });

		res.json({
			msg: "Account and all its contacts are removed"
		});
	} catch (err) {
		console.error(err);
		next(boom.internal("Unable to remove account"));
	}
});

module.exports = router;

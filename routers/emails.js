const boom = require("@hapi/boom");
const express = require("express");
const router = express.Router();

const { Email } = require("../db");
const { validateOneEmail } = require("../validators/emailValidator");

// Add new email
router.post("/create/:contactId", async (req, res, next) => {
	const { contactId } = req.params;

	try {
		const { error } = validateOneEmail(req.body);

		if (error) {
			return next(boom.badData(error.details[0].message));
		}

		const result = await Email.create({ ...req.body, contactId });

		res.json(result);
	} catch (err) {
		console.error(err);
		next(boom.internal(`Unable to add email for contact ${contactId}`));
	}
});

// Update email by ID
router.patch("/update/:contactId/:emailId", async (req, res, next) => {
	const { contactId, emailId } = req.params;

	try {
		const { error } = validateOneEmail(req.body);

		if (error) {
			return next(boom.badData(error.details[0].message));
		}

		await Email.update(req.body, { where: { id: emailId } });

		res.json({
			msg: "Email updated."
		});
	} catch (err) {
		console.error(err);
		next(
			boom.internal(
				`Unable to update email ${phoneId} for contact ${contactId}`
			)
		);
	}
});

// Delete email by ID
router.delete("/delete/:contactId/:emailId", async (req, res, next) => {
	const { contactId, emailId } = req.params;

	try {
		const result = await Email.findOne({ where: { id: emailId } });

		if (!result) {
			return next(boom.badRequest("Invalid email", { statusCode: 400 }));
		}

		await Email.destroy({ where: { id: emailId } });
		res.json({
			msg: "Email deleted."
		});
	} catch (err) {
		console.error(err);
		next(
			boom.internal(
				`Unable to delete email ${emailId} for contact ${contactId}`
			)
		);
	}
});

module.exports = router;

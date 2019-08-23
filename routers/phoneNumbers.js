const boom = require("@hapi/boom");
const express = require("express");
const router = express.Router();

const { PhoneNumber } = require("../db");
const {
	validateOnePhoneNumber
} = require("../validators/phoneNumberValidator");

// Add phone number
router.post("/create/:contactId", async (req, res, next) => {
	const { contactId } = req.params;

	try {
		// Validate
		const { error } = validateOnePhoneNumber(req.body);

		if (error) {
			return next(boom.badRequest(error.details[0].message));
		}

		const result = await PhoneNumber.create({ ...req.body, contactId });

		res.json(result);
	} catch (err) {
		console.error(err);
		next(boom.internal(`Unable to add phone number for contact ${contactId}`));
		//next(boom.notImplemented("Unable to create phone number"));
	}
});

// Update phone number
router.patch("/update/:contactId/:phoneId", async (req, res, next) => {
	const { contactId, phoneId } = req.params;

	try {
		// Validate
		const { error } = validateOnePhoneNumber(req.body);

		if (error) {
			return next(boom.badRequest(error.details[0].message));
		}

		await PhoneNumber.update(req.body, { where: { id: phoneId } });

		res.json({
			msg: "Phone number updated."
		});
	} catch (err) {
		console.error(err);
		next(
			boom.internal(
				`Unable to update phone number ${phoneId} for contact ${contactId}`
			)
		);
	}
});

// Delete phone number
router.delete("/delete/:contactId/:phoneId", async (req, res, next) => {
	const { contactId, phoneId } = req.params;

	try {
		const result = await PhoneNumber.findOne({ where: { id: phoneId } });

		if (!result) {
			return next(boom.badRequest("Invalid phone number", { statusCode: 400 }));
		}

		await PhoneNumber.destroy({ where: { id: phoneId } });

		res.json({
			msg: "Phone number deleted."
		});
	} catch (err) {
		console.error(err);
		next(
			boom.internal(
				`Unable to delete phone number ${phoneId} for contact ${contactId}`
			)
		);
	}
});

module.exports = router;

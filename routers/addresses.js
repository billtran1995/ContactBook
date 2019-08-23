const boom = require("@hapi/boom");
const express = require("express");
const router = express.Router();

const { Address } = require("../db");
const { validateOneAddress } = require("../validators/addressValidator");

// Add address
router.post("/create/:contactId", async (req, res, next) => {
	const { contactId } = req.params;

	try {
		const { error } = validateOneAddress(req.body);

		if (error) {
			return next(boom.badData(error.details[0].message));
		}

		const result = await Address.create({ ...req.body, contactId });

		res.json(result);
	} catch (err) {
		console.error(err);
		next(boom.internal(`Unable to add address for contact ${contactId}`));
	}
});

// Update address by id
router.patch("/update/:contactId/:addressId", async (req, res, next) => {
	const { contactId, addressId } = req.params;

	try {
		const { error } = validateOneAddress(req.body);

		if (error) {
			return next(boom.badData(error.details[0].message));
		}

		await Address.update(req.body, { where: { id: addressId } });

		res.json({
			msg: "Address updated."
		});
	} catch (err) {
		console.error(err);
		next(
			boom.internal(
				`Unable to update address ${addressId} for contact ${contactId}`
			)
		);
	}
});

// Delete address by id
router.delete("/delete/:contactId/:addressId", async (req, res, next) => {
	const { contactId, addressId } = req.params;

	try {
		const result = await Address.findOne({ where: { id: addressId } });

		if (!result) {
			return next(boom.badRequest("Invalid address", { statusCode: 400 }));
		}

		await Address.destroy({ where: { id: addressId } });
		res.json({
			msg: "Address deleted."
		});
	} catch (err) {
		console.error(err);
		next(
			boom.internal(
				`Unable to delete address ${addressId} for contact ${contactId}`
			)
		);
	}
});

module.exports = router;

const boom = require("@hapi/boom");
const express = require("express");
const router = express.Router();

const { Contact, PhoneNumber, Email, Address } = require("../db");
const validateContact = require("../validators/contactValidator");
const { validatePhoneNumbers } = require("../validators/phoneNumberValidator");
const { validateEmails } = require("../validators/emailValidator");
const { validateAddresses } = require("../validators/addressValidator");

// Get contacts
router.get("/:accountId", async (req, res, next) => {
	const { accountId } = req.params;

	try {
		const result = await Contact.findAll({
			include: [{ model: PhoneNumber }, { model: Email }, { model: Address }],
			where: { accountId }
		});

		res.json(result);
	} catch (err) {
		console.error(err);
		next(boom.internal("Unable to find contacts"));
	}
});

// Get contact by ID
router.get("/find/:contactId", async (req, res, next) => {
	const { contactId } = req.params;

	try {
		const result = await Contact.findOne({
			include: [{ model: PhoneNumber }, { model: Email }, { model: Address }],
			where: { id: contactId }
		});

		if (!result) {
			next(boom.notFound(`Contact ${contactId} are not found`));
		} else {
			res.status(200).json(result);
		}
	} catch (err) {
		console.error(err);
		next(boom.internal(`Unable to get contact ${contactId}`));
	}
});

// Create new contact
router.post("/create", async (req, res, next) => {
	try {
		let { contact, phoneNumbers, emails, addresses } = req.body;

		// Validation
		const { error: contactError } = validateContact(contact);
		const { error: phoneNumberError } = validatePhoneNumbers(phoneNumbers);
		const { error: emailError } = validateEmails(emails);
		const { error: addressError } = validateAddresses(addresses);
		if (contactError) {
			return next(boom.badRequest(contactError.details[0].message));
		}
		if (phoneNumberError) {
			return next(boom.badRequest(phoneNumberError.details[0].message));
		}
		if (emailError) {
			return next(boom.badRequest(emailError.details[0].message));
		}
		if (addressError) {
			return next(boom.badRequest(addressError.details[0].message));
		}

		let result = {};

		result.contact = await Contact.create(contact);

		let newNumbers = phoneNumbers.map(phoneNumber => ({
			...phoneNumber,
			contactId: result.contact.id
		}));
		let newEmail = emails.map(email => ({
			...email,
			contactId: result.contact.id
		}));
		let newAddresses = addresses.map(address => ({
			...address,
			contactId: result.contact.id
		}));

		if (result.contact) {
			result.phoneNumbers = await PhoneNumber.bulkCreate(newNumbers);
			result.emails = await Email.bulkCreate(newEmail);
			result.addresses = await Address.bulkCreate(newAddresses);
		}

		res.status(200).json(result);
	} catch (err) {
		console.error(err);
		next(boom.internal("Unable to create contact."));
	}
});

// Update contact
router.patch("/update/:contactId", async (req, res, next) => {
	const { contactId } = req.params;

	try {
		await Contact.update(req.body.contact, { where: { id: contactId } });

		const result = await Contact.findOne({
			include: [{ model: PhoneNumber }, { model: Email }, { model: Address }],
			where: { id: contactId }
		});

		res.status(200).json(result);
	} catch (err) {
		console.error(err);
		next(boom.internal(`Unable to update contact ${contactId}`));
	}
});

// Delete contact
router.delete("/delete/:contactId", async (req, res, next) => {
	const { contactId } = req.params;

	try {
		const result = await Contact.findOne({ where: { id: contactId } });

		if (!result) {
			return next(boom.badRequest("Invalid contact", { statusCode: 400 }));
		}

		await PhoneNumber.destroy({
			where: { contactId }
		});
		await Email.destroy({
			where: { contactId }
		});
		await Address.destroy({
			where: { contactId }
		});

		// ====> Delete Group

		await Contact.destroy({
			where: { id: contactId }
		});

		res.status(200).json({
			msg: "Contact removed."
		});
	} catch (err) {
		console.error(err);
		next(boom.internal(`Unable to delete contact ${contactId}`));
	}
});

module.exports = router;

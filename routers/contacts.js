const express = require("express");
const router = express.Router();
const { Contact, PhoneNumber, Email, Address } = require("../db");

// Get contacts
router.get("/:id", async (req, res) => {
	try {
		const result = await Contact.findAll({
			include: [{ model: PhoneNumber }, { model: Email }, { model: Address }],
			where: { accountId: req.params.id }
		});

		if (!result) {
			result.msg = "No contacts found.";
		}

		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

// Get a contact
router.get("/:id/:contactId", async (req, res) => {
	try {
		const result = await Contact.findOne({
			include: [{ model: PhoneNumber }, { model: Email }, { model: Address }],
			where: { id: req.params.contactId, accountId: req.params.id }
		});

		if (!result) {
			res.json({ msg: "This contact does not exist." });
		} else {
			res.json(result);
		}
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

// Create contact
router.post("/create", async (req, res) => {
	try {
		let { contact, phoneNumber, email, address } = req.body;
		let result = {};

		result.contact = await Contact.create(contact);

		if (result.contact) {
			if (phoneNumber) {
				phoneNumber = { ...phoneNumber, contactId: result.contact.id };
				result.phoneNumber = await PhoneNumber.create(phoneNumber);
			}
			if (email) {
				email = { ...email, contactId: result.contact.id };
				result.email = await Email.create(email);
			}
			if (address) {
				address = { ...address, contactId: result.contact.id };
				result.address = await Address.create(address);
			}
		}

		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

// Update contact
router.patch("/update/:id/:contactId", async (req, res) => {
	try {
		const {
			firstName,
			middleName,
			lastName,
			nickName,
			isFavorite,
			pictureUrl
		} = req.body;

		await Contact.update(
			{ firstName, middleName, lastName, nickName, isFavorite, pictureUrl },
			{ where: { accountId: req.params.id } }
		);

		const result = await Contact.findOne({
			include: [{ model: PhoneNumber }, { model: Email }, { model: Address }],
			where: { id: req.params.contactId, accountId: req.params.id }
		});

		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

// Delete contact
router.delete("/delete/:id/:contactId", async (req, res) => {
	try {
		await PhoneNumber.destroy({
			where: { contactId: req.params.contactId }
		});
		await Email.destroy({
			where: { contactId: req.params.contactIdid }
		});
		await Address.destroy({
			where: { contactId: req.params.contactId }
		});
		// ====> Add Group as well

		await Contact.destroy({
			where: { id: req.params.id, contactId: req.params.contactId }
		});

		res.json({
			msg: "Contact removed."
		});
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
});

// @route  GET api/contacts/phone-numbers/
// @desc   Get all phone numbers
// @access Private
router.get();

// @route  GET api/contacts/phone-numbers/:id
// @desc   Get phone number by id
// @access Private
router.get();

// @route  POST api/contacts/phone-numbers/
// @desc   Insert new phone number
// @access Private
router.post();

// @route  PATCH api/contacts/phone-numbers/
// @desc   Update phone number
// @access Private
router.patch();

// @route  DELETE api/contacts/phone-numbers/
// @desc   Delete phone number
// @access Private
router.delete();

module.exports = router;

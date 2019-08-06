const express = require("express");
const boom = require("@hapi/boom");
const router = express.Router();
const { Contact, PhoneNumber, Email, Address } = require("../db");

// Get contacts
router.get("/:accountId", async (req, res) => {
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

// Get a contact
router.get("/:contactId", async (req, res) => {
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

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(boom.internal("Unable to create contact."));
  }
});

// Update contact
router.patch("/update/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const {
    firstName,
    middleName,
    lastName,
    nickName,
    isFavorite,
    pictureUrl
  } = req.body;
  try {
    await Contact.update(
      { firstName, middleName, lastName, nickName, isFavorite, pictureUrl },
      { where: { id: contactId } }
    );

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
router.delete("/delete/:contactId", async (req, res) => {
  const { contactId } = req.params;

  try {
    await PhoneNumber.destroy({
      where: { contactId }
    });
    await Email.destroy({
      where: { contactId }
    });
    await Address.destroy({
      where: { contactId }
    });
    // ====> Add Group as well

    await Contact.destroy({
      where: { contactId }
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

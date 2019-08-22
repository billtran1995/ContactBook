const express = require("express");
const boom = require("@hapi/boom");
const router = express.Router();
const { Contact, PhoneNumber, Email, Address } = require("../db");

// Get contacts
router.get("/getContacts/:accountId", async (req, res, next) => {
  const { accountId } = req.params;

  try {
    const result = await Contact.findAll({
      include: [{ model: PhoneNumber }, { model: Email }, { model: Address }],
      where: { accountId },
      order: [["firstName", "ASC"]]
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    next(boom.internal("Unable to find contacts"));
  }
});

// Get a contact
router.get("/getContact/:contactId", async (req, res, next) => {
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
    let { contact, phoneNumbers, emails, addresses, accountId } = req.body;
    let result = {};

    result.contact = await Contact.create({ ...contact, accountId });

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
    // await PhoneNumber.destroy({
    // 	where: { contactId }
    // });
    // await Email.destroy({
    // 	where: { contactId }
    // });
    // await Address.destroy({
    // 	where: { contactId }
    // });
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

// Add phone number
router.post("/phone-number/create/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await PhoneNumber.create({ ...req.body, contactId });

    res.json(result);
  } catch (err) {
    console.error(err);
    next(boom.internal(`Unable to add phone number for contact ${contactId}`));
    //next(boom.notImplemented("Unable to create phone number"));
  }
});

// Update phone number
router.patch(
  "/phone-number/update/:contactId/:phoneId",
  async (req, res, next) => {
    const { contactId, phoneId } = req.params;

    try {
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
  }
);

// Delete phone number
router.delete(
  "/phone-number/delete/:contactId/:phoneId",
  async (req, res, next) => {
    const { contactId, phoneId } = req.params;

    try {
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
  }
);

// Add email
router.post("/email/create/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Email.create({ ...req.body, contactId });

    res.json(result);
  } catch (err) {
    console.error(err);
    next(boom.internal(`Unable to add email for contact ${contactId}`));
  }
});

// Update email
router.patch("/email/update/:contactId/:emailId", async (req, res, next) => {
  const { contactId, emailId } = req.params;

  try {
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

// Delete email
router.delete("/email/delete/:contactId/:emailId", async (req, res, next) => {
  const { contactId, emailId } = req.params;

  try {
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

// Add address
router.post("/address/create/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Address.create({ ...req.body, contactId });

    res.json(result);
  } catch (err) {
    console.error(err);
    next(boom.internal(`Unable to add address for contact ${contactId}`));
  }
});

// Update address
router.patch(
  "/address/update/:contactId/:addressId",
  async (req, res, next) => {
    const { contactId, addressId } = req.params;

    try {
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
  }
);

// Delete address
router.delete(
  "/address/delete/:contactId/:addressId",
  async (req, res, next) => {
    const { contactId, addressId } = req.params;

    try {
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
  }
);

module.exports = router;

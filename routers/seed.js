const express = require("express");
const faker = require("faker");
const boom = require("@hapi/boom");
const router = express.Router();

const { Account, Contact, PhoneNumber, Email, Address } = require("../db");

router.get("/seed-accounts", async (req, res, next) => {
  const { num = 1 } = req.query;
  let accounts = [];

  try {
    for (let i = 0; i < num; i++) {
      accounts.push({
        userName: faker.internet.userName(),
        pictureUrl: faker.internet.avatar()
      });
    }

    if (accounts.length) {
      await Account.bulkCreate(accounts);
      res.status(200).json("Success");
    } else {
      throw new Error("Fail generating fake data");
    }
  } catch (err) {
    console.error(err);
    next(boom.internal("Fail to seed accounts"));
  }
});

router.get("/seed-contacts", async (req, res, next) => {
  const { num = 1, accountId = 1 } = req.query;
  let contacts = [];

  try {
    for (let i = 0; i < num; i++) {
      contacts.push({
        firstName: faker.name.firstName(),
        middleName: faker.name.suffix(),
        lastName: faker.name.lastName(),
        nickName: faker.internet.userName(),
        isFavorite: "",
        pictureUrl: faker.internet.avatar(),
        accountId
      });
    }

    if (contacts.length) {
      let createdContacts = await Contact.bulkCreate(contacts);

      await Promise.all(
        createdContacts.map(async contact => {
          let randomPhoneNumberAmount = Math.floor(Math.random() * 5) + 1;
          let randomAddressAmount = Math.floor(Math.random() * 5) + 1;
          let randomEmailAmount = Math.floor(Math.random() * 5) + 1;
          let phoneTypes = ["Home", "Work", "Cellphone"];
          let addressTypes = ["Home", "Work", "School"];
          let phoneNumbers = [];
          let addresses = [];
          let emails = [];

          for (let i = 0; i < randomPhoneNumberAmount; i++) {
            phoneNumbers.push({
              number: faker.phone.phoneNumber(),
              type: faker.helpers.randomize(phoneTypes),
              contactId: contact.id
            });
          }

          for (let i = 0; i < randomAddressAmount; i++) {
            addresses.push({
              street: faker.address.streetAddress(),
              city: faker.address.city(),
              state: faker.address.stateAbbr(),
              zip: faker.address.zipCode(),
              country: faker.address.country(),
              type: faker.helpers.randomize(addressTypes),
              contactId: contact.id
            });
          }

          for (let i = 0; i < randomEmailAmount; i++) {
            emails.push({
              email: faker.internet.email(),
              type: faker.helpers.randomize(addressTypes),
              contactId: contact.id
            });
          }

          if (phoneNumbers.length && addresses.length && emails.length) {
            await PhoneNumber.bulkCreate(phoneNumbers);
            await Address.bulkCreate(addresses);
            await Email.bulkCreate(emails);
          } else {
            throw new Error("Fail generating fake data");
          }
        })
      );

      res.status(200).json("Success");
    } else {
      throw new Error("Fail to generate fake data");
    }
  } catch (err) {
    console.error(err);
    next(boom.internal("Fail to seed contacts"));
  }
});

module.exports = router;

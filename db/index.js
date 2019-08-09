const Sequelize = require("sequelize");
const { database, username, password, host, port, dbname } = require("../keys");
const sequelize = new Sequelize(
	`${database}://${username}:${password}@${host}:${port}/${dbname}`
);

// Test connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch(err => {
//     console.error("Unable to connect to the database:", err);
//   });
// ---------------

const Account = require("../models/account.model")(sequelize, Sequelize);
const Contact = require("../models/contact.model")(sequelize, Sequelize);
const PhoneNumber = require("../models/phoneNumber.model")(
	sequelize,
	Sequelize
);
const Address = require("../models/address.model")(sequelize, Sequelize);
const Email = require("../models/email.model")(sequelize, Sequelize);

Account.hasMany(Contact, { onDelete: "cascade" });
Contact.hasMany(PhoneNumber, { onDelete: "cascade" });
Contact.hasMany(Address, { onDelete: "cascade" });
Contact.hasMany(Email, { onDelete: "cascade" });

module.exports = {
	sequelize,
	Account,
	Contact,
	PhoneNumber,
	Address,
	Email
};

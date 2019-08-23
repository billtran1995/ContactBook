const Joi = require("joi");

const Type = {
	home: "Home",
	work: "Work",
	foreign: "Foreign"
};
const schema = {
	street: Joi.string()
		.min(5)
		.max(100)
		.required(),
	city: Joi.string()
		.min(2)
		.max(50)
		.required(),
	state: Joi.string()
		.min(2)
		.max(2)
		.allow(""),
	zip: Joi.number(),
	country: Joi.string()
		.min(4)
		.max(50)
		.required(),
	type: Joi.string()
		.valid([Type.home, Type.work, Type.foreign])
		.required()
};

function validateOneAddress(address) {
	return Joi.validate(address, schema);
}

function validateAddresses(addresses) {
	const arraySchema = Joi.array().items(schema);
	const result = Joi.validate(addresses, arraySchema);

	return result;
}

module.exports = { validateOneAddress, validateAddresses };

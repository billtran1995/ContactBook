const Joi = require("joi");

const Type = {
	home: "Home",
	work: "Work",
	cell: "Cell Phone"
};
const schema = {
	number: Joi.string()
		.min(10)
		.required(),
	type: Joi.string()
		.valid([Type.home, Type.work, Type.cell])
		.required()
};

function validateOnePhoneNumber(phone) {
	return Joi.validate(phone, schema);
}

function validatePhoneNumbers(phones) {
	const arraySchema = Joi.array().items(schema);
	const result = Joi.validate(phones, arraySchema);

	return result;
}

module.exports = {
	validateOnePhoneNumber,
	validatePhoneNumbers
};

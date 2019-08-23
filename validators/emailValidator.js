const Joi = require("joi");

const Type = {
	home: "Home",
	work: "Work",
	personal: "Personal"
};
const schema = {
	email: Joi.string()
		.email({ minDomainSegments: 2 })
		.required(),
	type: Joi.string()
		.valid([Type.home, Type.work, Type.personal])
		.required()
};

function validateOneEmail(email) {
	return Joi.validate(email, schema);
}

function validateEmails(emails) {
	const arraySchema = Joi.array().items(schema);
	const result = Joi.validate(emails, arraySchema);

	return result;
}

module.exports = { validateOneEmail, validateEmails };

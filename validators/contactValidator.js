const Joi = require("joi");

function validateContact(contact) {
	const schema = {
		firstName: Joi.string()
			.min(3)
			.max(20)
			.required(),
		middleName: Joi.string()
			.max(20)
			.allow(""),
		lastName: Joi.string()
			.min(3)
			.max(20)
			.required(),
		nickName: Joi.string()
			.max(20)
			.allow(""),
		isFavorite: Joi.string()
			.max(1)
			.allow(""),
		pictureUrl: Joi.string().allow(""),
		accountId: Joi.number().required()
	};
	const result = Joi.validate(contact, schema);

	return result;
}

module.exports = validateContact;

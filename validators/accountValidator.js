const Joi = require("joi");

function validateAccount(account) {
	const schema = {
		name: Joi.string()
			.min(10)
			.max(20)
			.required()
	};
	const result = Joi.validate(account, schema);

	return result;
}

module.exports = validateAccount;

const Joi = require('joi');

const id = Joi.number();
const password = Joi.string()
  // eslint-disable-next-line prefer-regex-literals
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  .messages({
    'string.pattern.base': `Password should be between 3 to 30 characters and contain letters or numbers only`,
    'string.empty': `Password cannot be empty`,
    'any.required': `Password is required`,
  });
const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
});

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  password,
  email,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };

const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

const createGenderSchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const updateGenderSchema = Joi.object({
  name,
  image,
});

const getGenderSchema = Joi.object({
  id: id.required(),
});

module.exports = { createGenderSchema, updateGenderSchema, getGenderSchema };

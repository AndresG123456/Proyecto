const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();
const weight = Joi.number().precision(1);
const history = Joi.string().min(20).max(150);

const createCharacteSchema = Joi.object({
  name: name.required(),
  image: image.required(),
  weight: weight.required(),
  history: history.required(),
});

const updateCharacterSchema = Joi.object({
  weight,
  history,
  image,
  name,
});

const getCharacterSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCharacteSchema,
  updateCharacterSchema,
  getCharacterSchema,
};

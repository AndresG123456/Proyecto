const router = require('express').Router();
const passport = require('passport');

const UserService = require('../services/gender.service');
const validatorHandler = require('../middleware/validator.handler');
const { createGenderSchema } = require('../schemas/gender.schema');

const service = new UserService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const categories = await service.find();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createGenderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const user = await service.create(body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

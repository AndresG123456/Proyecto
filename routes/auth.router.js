const router = require('express').Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config');
const UserService = require('../services/auth.service');
const validatorHandler = require('../middleware/validator.handler');
const { createUserSchema } = require('../schemas/user.schema');

const service = new UserService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      const payload = { sub: user.id };
      delete user.dataValues.password;
      const token = jwt.sign(payload, config.secret);
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/register',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const user = await service.register(body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

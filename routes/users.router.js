const router = require('express').Router();
const passport = require('passport');

const UserService = require('../services/user.service');
const validatorHandler = require('../middleware/validator.handler');
const { updateUserSchema, getUserSchema } = require('../schemas/user.schema');

const service = new UserService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.delete(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

const router = require('express').Router();
const passport = require('passport');
const CharacterService = require('../services/character.service');

const service = new CharacterService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      // eslint-disable-next-line prefer-const
      let options = {
        include: ['movies'],
        where: {},
      };

      const { name, age, movies } = req.query;
      if (name) {
        options.where.name = name;
      }

      if (age) {
        options.where.age = age;
      }

      if (movies) {
        options.include[0] = {
          association: 'movies',
          as: 'movies',
          where: { id: movies },
        };
      }

      const allCharacters = await service.find(options);
      res.json(allCharacters);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newCharacter = await service.create(body);
      res.json(newCharacter);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const character = await service.findOne(id);
      res.json(character);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const character = await service.update(id, body);
      res.json(character);
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
      await service.delete(id);
      res.json(id);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

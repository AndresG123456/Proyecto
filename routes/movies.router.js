const router = require('express').Router();
const passport = require('passport');

const MovieService = require('../services/movie.service');
const validatorHandler = require('../middleware/validator.handler');
const {
  createMovieSchema,
  updateMovieSchema,
  getMovieSchema,
} = require('../schemas/movie.schema');

const service = new MovieService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      // eslint-disable-next-line prefer-const
      let options = {
        include: ['characters', 'gender'],
        where: {},
        order: [],
      };

      const { name, gender, order } = req.query;
      if (name) {
        options.where.title = name;
      }

      if (gender) {
        options.include[1] = {
          association: 'gender',
          as: 'gender',
          where: { name: gender },
        };
      }

      if (order) {
        options.order = [['title', order]];
      }

      const AllMovies = await service.find(options);
      res.json(AllMovies);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createMovieSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newMovie = await service.create(body);
      res.json(newMovie);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-character',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newCharacter = await service.addCharacter(body);
      res.json(newCharacter);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getMovieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = await service.findOne(id);
      res.json(movie);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getMovieSchema, 'params'),
  validatorHandler(updateMovieSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const movie = await service.update(id, body);
      res.json(movie);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getMovieSchema, 'params'),
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

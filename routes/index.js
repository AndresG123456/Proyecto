const express = require('express');

const moviesRouter = require('./movies.router');
const charactersRouter = require('./characters.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const genderRouter = require('./gender.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/movies', moviesRouter);
  router.use('/characters', charactersRouter);
  router.use('/auth', authRouter);
  router.use('/users', usersRouter);
  router.use('/gender', genderRouter);
}

module.exports = routerApi;

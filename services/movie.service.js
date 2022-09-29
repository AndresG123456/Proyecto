const boom = require('@hapi/boom');

const { models } = require('../libs/sequilize');

class MovieService {
  async create(data) {
    const newMovie = await models.Movie.create(data);
    return newMovie;
  }

  async addCharacter(data) {
    const newCharacter = await models.MovieCharacter.create(data);
    return newCharacter;
  }

  async find(options) {
    const movies = await models.Movie.findAll(options);
    return movies;
  }

  async findOne(id) {
    const movie = await models.Movie.findByPk(id);
    if (!movie) {
      throw boom.notFound('movie not found');
    }
    return movie;
  }

  async update(id, changes) {
    const movie = await this.findOne(id);
    const rta = movie.update(changes);
    return rta;
  }

  async delete(id) {
    const movie = await this.findOne(id);
    await movie.destroy();
    return { id };
  }
}

module.exports = MovieService;

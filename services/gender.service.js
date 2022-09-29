const { models } = require('../libs/sequilize');

class GenderService {
  async create(data) {
    const newGender = models.Gender.create(data);
    return newGender;
  }

  async find() {
    const genders = models.Gender.findAll({ include: ['movies'] });
    return genders;
  }
}

module.exports = GenderService;

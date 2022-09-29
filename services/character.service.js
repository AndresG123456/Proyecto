const boom = require('@hapi/boom');
const { models } = require('../libs/sequilize');

class CharacterService {
  async create(data) {
    const newCharacter = models.Character.create(data);
    return newCharacter;
  }

  find(query) {
    const characters = models.Character.findAll(query);
    return characters;
  }

  findOne(id) {
    const character = models.Character.findByPk(id);
    if (!character) {
      throw boom.notFound('character not found');
    }
    return character;
  }

  async update(id, changes) {
    const character = await this.findOne(id);
    const rta = character.update(changes);
    return rta;
  }

  async delete(id) {
    const character = await this.findOne(id);
    await character.destroy();
    return { id };
  }
}

module.exports = CharacterService;

const { Model, DataTypes, Sequelize } = require('sequelize');

const { MOVIE_TABLE } = require('./movie.model');
const { CHARACTER_TABLE } = require('./character.model');

const MOVIE_CHARACTER_TABLE = 'movie_character';

const MovieCharacterSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  movieId: {
    field: 'movie_id',
    type: DataTypes.INTEGER,
    references: {
      model: MOVIE_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  characterId: {
    field: 'character_id',
    type: DataTypes.INTEGER,
    references: {
      model: CHARACTER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class MovieCharacter extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_CHARACTER_TABLE,
      modelName: 'MovieCharacter',
      timestamps: false,
    };
  }
}

module.exports = {
  MOVIE_CHARACTER_TABLE,
  MovieCharacterSchema,
  MovieCharacter,
};

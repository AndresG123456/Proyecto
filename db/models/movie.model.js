const { Model, DataTypes, Sequelize } = require('sequelize');

const { GENDER_TABLE } = require('./gender.model');

const MOVIE_TABLE = 'movies';

const MovieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  image: { allowNull: false, type: DataTypes.STRING },
  title: { allowNull: false, type: DataTypes.STRING },
  qualification: { allowNull: false, type: DataTypes.INTEGER },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  genderId: {
    field: 'gender_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GENDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Movie extends Model {
  static associate(models) {
    this.belongsTo(models.Gender, { as: 'gender' });
    this.belongsToMany(models.Character, {
      as: 'characters',
      through: models.MovieCharacter,
      foreignKey: 'movieId',
      otherKey: 'characterId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_TABLE,
      modelName: 'Movie',
      timestamps: false,
    };
  }
}

module.exports = { MOVIE_TABLE, MovieSchema, Movie };

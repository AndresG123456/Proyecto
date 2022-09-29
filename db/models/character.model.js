const { Model, DataTypes, Sequelize } = require('sequelize');

const CHARACTER_TABLE = 'character';

const CharacterSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  age: { allowNull: false, type: DataTypes.INTEGER },
  image: { allowNull: false, type: DataTypes.STRING },
  name: { allowNull: false, type: DataTypes.STRING },
  weight: { allowNull: false, type: DataTypes.DECIMAL },
  history: { allowNull: false, type: DataTypes.STRING },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Character extends Model {
  static associate(models) {
    this.belongsToMany(models.Character, {
      as: 'movies',
      through: models.MovieCharacter,
      foreignKey: 'characterId',
      otherKey: 'movieId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CHARACTER_TABLE,
      modelName: 'Character',
      timestamps: false,
    };
  }
}

module.exports = { CHARACTER_TABLE, CharacterSchema, Character };

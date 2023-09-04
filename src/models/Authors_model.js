const {Model, DataTypes} = require("sequelize");
const sequelize = require("../database");

class Authors extends Model {}

Authors.init(
  {
    author_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    author_first_name: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    author_last_name: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_of_death: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    author_country: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author_photo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "authors",
    sequelize,
  }
);

module.exports = Authors;

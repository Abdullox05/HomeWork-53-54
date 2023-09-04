const {Model, DataTypes} = require("sequelize");
const sequelize = require("../database");

class Users extends Model {}

Users.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_first_name: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    user_last_name: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    user_photo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "users",
    sequelize,
  }
);

module.exports = Users;

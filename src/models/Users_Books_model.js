const {Model, DataTypes} = require("sequelize");
const sequelize = require("../database");

class Users_Books extends Model {}

Users_Books.init(
  {
    users_books_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    last_page: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "users_books",
    sequelize,
  }
);

module.exports = Users_Books;

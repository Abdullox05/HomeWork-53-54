const {Sequelize} = require("sequelize");

const config = require("../../config");

const sequelize = new Sequelize(config.db_url);

module.exports = sequelize;

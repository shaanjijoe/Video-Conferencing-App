const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db', // Replace with your desired SQLite database file path
  logging: false,
});

module.exports = sequelize;


const { DataTypes } = require('sequelize');
const sequelize = require('../orm')

const ChatUser = sequelize.define('ChatUser', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  profileImage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = ChatUser;

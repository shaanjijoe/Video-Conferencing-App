// models/Message.js
const { DataTypes } = require('sequelize');
const sequelize = require('../orm')

const Message = sequelize.define('Message', {
  content: {
    type: DataTypes.TEXT,
    allowNull: true, // Allow null for image messages
  },
  messageType: {
    type: DataTypes.ENUM('text', 'image'),
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Message;
 
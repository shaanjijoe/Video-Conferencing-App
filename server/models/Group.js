// models/Group.js
const { DataTypes } = require('sequelize');
const sequelize = require('../orm')

const Group = sequelize.define('Group', {
  // Remove unique constraint from groupName
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Group;

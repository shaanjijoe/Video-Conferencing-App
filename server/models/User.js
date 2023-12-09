const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../orm')

const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  // Use hooks to hash the password before saving
User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });
  
module.exports = User;
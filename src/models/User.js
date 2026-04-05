const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: false,
    defaultValue: null,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  indexes: [
    {
      name: 'users_email_idx',
      fields: ['email'],
    }
  ]
});

User.beforeCreate(async (user) => {
  const count = await User.count();
  const number = String(count + 1).padStart(3, '0');
  user.id = `U${number}`;
  user.password_hash = await bcrypt.hash(user.password_hash, 10);
});

module.exports = User;
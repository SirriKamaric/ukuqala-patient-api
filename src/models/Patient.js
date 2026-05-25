const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },

  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  condition: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false
  }

}, {

  indexes: [
    {
      fields: ['userId']
    }
  ],

  timestamps: true

});

module.exports = Patient;
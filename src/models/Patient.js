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
  },
  age: {
    type: DataTypes.INTEGER, // Matches your requirement to use age
    allowNull: false,
  },
  gender: { // New field added for your Information System project
    type: DataTypes.STRING,
    allowNull: true,
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID, // Links to your practitioner account (SIRRI KAMARIC)
    allowNull: false,
  }
});

module.exports = Patient;
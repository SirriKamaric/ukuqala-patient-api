const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Patient = sequelize.define('Patient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  indexes: [
    {
      name: 'patients_name_idx',
      fields: ['name'],
    },
    {
      name: 'patients_condition_idx',
      fields: ['condition'],
    }
  ]
});

module.exports = Patient;
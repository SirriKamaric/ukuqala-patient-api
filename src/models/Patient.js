const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Patient = sequelize.define('Patient', {
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

Patient.beforeCreate(async (patient) => {
  const count = await Patient.count();
  const number = String(count + 1).padStart(3, '0');
  patient.id = `P${number}`;
});

module.exports = Patient;
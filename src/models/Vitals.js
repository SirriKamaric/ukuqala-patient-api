const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vitals = sequelize.define('Vitals', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  heartRate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bloodPressure: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  patientId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  recordedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  }
}, {
  timestamps: true,
});

module.exports = Vitals;
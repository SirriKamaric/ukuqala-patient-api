const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Or your db path

const Vitals = sequelize.define('Vitals', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  heart_rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  blood_pressure: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // CRITICAL: Ensure this field exists to link to the Patient
  patientId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  // Requirement 4.1: Track who recorded the data
  recordedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  }
}, {
  timestamps: true, // This automatically provides the 'createdAt' field used in the UI
});

module.exports = Vitals;
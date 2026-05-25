const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  patientName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  doctorName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  time: {
    type: DataTypes.STRING,
    allowNull: false
  },

  reason: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'appointments',
  timestamps: true
});

module.exports = Appointment;
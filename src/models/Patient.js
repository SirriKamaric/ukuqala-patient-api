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
      min: 0 // Prevents invalid academic data entries
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
    allowNull: false,
    references: {
      model: 'Users', // Explicitly links to the practitioner table
      key: 'id'
    }
  }
}, {
  // Added for better database performance in your study
  indexes: [
    {
      fields: ['userId']
    }
  ],
  timestamps: true // Tracks when patients are added/updated (Requirement 6.2)
});

module.exports = Patient;
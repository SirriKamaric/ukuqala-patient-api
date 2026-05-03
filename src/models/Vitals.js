const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid'); // Matches your existing User.js logic

const Vitals = sequelize.define('Vitals', {
    id: { 
        type: DataTypes.UUID, 
        defaultValue: () => uuidv4(), 
        primaryKey: true 
    },
    patientId: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    bloodPressure: { type: DataTypes.STRING }, // e.g., "120/80"
    heartRate: { type: DataTypes.INTEGER },
    temperature: { type: DataTypes.FLOAT },
    respiratoryRate: { type: DataTypes.INTEGER },
    oxygenSaturation: { type: DataTypes.INTEGER },
    recordedBy: { 
        type: DataTypes.UUID, 
        allowNull: false 
    }
}, { 
    timestamps: true 
});

module.exports = Vitals;
const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const { v4: uuidv4 } = require('uuid');

const Document = sequelize.define(
  'Document',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    /* REAL FILE PATH */
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },

    fileType: {
      type: DataTypes.STRING,
      allowNull: true
    },

    patientId: {
      type: DataTypes.UUID,
      allowNull: false,

      references: {
        model: 'Patients',
        key: 'id'
      },

      onDelete: 'CASCADE'
    },

    uploadedBy: {
      type: DataTypes.UUID,
      allowNull: false,

      references: {
        model: 'Users',
        key: 'id'
      }
    }
  },

  {
    timestamps: true,

    indexes: [
      {
        fields: ['patientId']
      }
    ]
  }
);

module.exports = Document;
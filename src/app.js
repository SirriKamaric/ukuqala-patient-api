const express = require('express');
const cors = require('cors');
const app = express();
const adminRoutes = require('./routes/admin');
require('dotenv').config();

// Requirement 4.1: Security & Cross-Origin Resource Sharing
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5176'], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json()); 

// Import Routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes'); 
// REMOVED: vitalsRoutes import (It is now inside patientRoutes)

// API Version 4 Route Mounting
app.use('/api/v4/auth', authRoutes);

/**
 * Requirement 4.3 & 4.4:
 * This handles BOTH patients and nested vitals 
 * (/api/v4/patients and /api/v4/patients/:id/vitals)
 */
app.use('/api/v4/patients', patientRoutes);
app.use('/api/v4/admin', adminRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ 
    message: 'Internal Server Error', 
    error: err.message 
  });
});

module.exports = app;
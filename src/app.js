const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Requirement 4.1: Security & Cross-Origin Resource Sharing
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5176'], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json()); // Essential for Requirement 4.3 & 4.4 (POST data)

// Import Routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const vitalsRoutes = require('./routes/vitalsRoutes');

// API Version 4 Route Mounting
app.use('/api/v4/auth', authRoutes);
app.use('/api/v4/patients', patientRoutes);

// Optional: Global vitals access
app.use('/api/v4/vitals', vitalsRoutes); 

// Error handling middleware for dissertation robustness
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error', error: err.message });
});

module.exports = app;
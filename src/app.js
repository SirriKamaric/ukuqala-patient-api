const express = require('express');
const cors = require('cors'); // Added for CORS support
const app = express();
require('dotenv').config();

// Enable CORS for your Vite frontend on port 5173
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const vitalsRoutes = require('./routes/vitalsRoutes');

// Updated to v4 as per your requirement
app.use('/api/v4/auth', authRoutes);
app.use('/api/v4/patients', patientRoutes);
app.use('/api/v4/vitals', vitalsRoutes); // Following your v4 versioning

module.exports = app;
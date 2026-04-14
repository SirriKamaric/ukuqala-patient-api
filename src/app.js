const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');

// Updated to v4 as per your requirement
app.use('/api/v4/auth', authRoutes);
app.use('/api/v4/patients', patientRoutes);

module.exports = app;
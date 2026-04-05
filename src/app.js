const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/patients', patientRoutes);

module.exports = app;
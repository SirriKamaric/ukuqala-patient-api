const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

require('dotenv').config();

/* ROUTES */
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes'); // ✅ ADDED

/* DOCUMENT ROUTES DISABLED TEMPORARILY */
// const documentRoutes = require('./routes/documentRoutes');

/* CORS */
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5176'
  ],
  credentials: true,
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS'
  ],
  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ]
};

app.use(cors(corsOptions));

/* BODY PARSER */
app.use(express.json());

/* STATIC FILES */
app.use(
  '/uploads',
  express.static(
    path.join(__dirname, '../uploads')
  )
);

/* API ROUTES */
app.use('/api/v4/auth', authRoutes);

app.use('/api/v4/patients', patientRoutes);

/* APPOINTMENT ROUTES ✅ ADDED */
app.use('/api/v4/appointments', appointmentRoutes);

/* DOCUMENTS DISABLED TEMPORARILY */
// app.use('/api/v4/documents', documentRoutes);

app.use('/api/v4/admin', adminRoutes);

/* ERROR HANDLER */
app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).send({
    message: 'Internal Server Error',
    error: err.message
  });

});

module.exports = app;
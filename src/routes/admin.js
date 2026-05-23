const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// const { protect, adminOnly } = require('../middleware/authMiddleware'); 
// Un-comment the middleware line above when your auth system is ready to secure these routes

// Doctors Management Endpoints
router.get('/doctors', adminController.getAdminDoctors);
router.get('/doctors/:id/appointments', adminController.getDoctorAppointments);
router.post('/tickets/:id/resolve', adminController.handleDoctorTicket);

// Patients Management Endpoints
router.get('/patients', adminController.getAdminPatients);

// Document Verification Endpoint
router.put('/doctors/:id/verify-docs', adminController.verifyDocument);

module.exports = router;
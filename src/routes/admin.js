const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Doctors
router.get('/doctors', adminController.getAdminDoctors);

router.get(
  '/doctors/:id/appointments',
  adminController.getDoctorAppointments
);

router.put(
  '/doctors/:id/verify-docs',
  adminController.verifyDocument
);

router.put(
  '/doctors/:id/avatar',
  adminController.uploadDoctorAvatar
);

router.delete(
  '/doctors/:id',
  adminController.deleteDoctor
);

// Tickets
router.post(
  '/tickets/:id/resolve',
  adminController.handleDoctorTicket
);

// Patients
router.get(
  '/patients',
  adminController.getAdminPatients
);

module.exports = router;
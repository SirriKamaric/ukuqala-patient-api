const express = require('express');
const router = express.Router();

const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointment.controller');

// CREATE
router.post('/', createAppointment);

// READ ALL
router.get('/', getAppointments);

// READ ONE
router.get('/:id', getAppointmentById);

// UPDATE
router.put('/:id', updateAppointment);

// DELETE
router.delete('/:id', deleteAppointment);

module.exports = router;
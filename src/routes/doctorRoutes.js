const express = require('express');

const {
  getDoctors,
  createDoctor,
  deleteDoctor
} = require('../controllers/doctorcontroller.js');

const router = express.Router();

router.get('/', getDoctors);
router.post('/', createDoctor);
router.delete('/:id', deleteDoctor);

module.exports = router;
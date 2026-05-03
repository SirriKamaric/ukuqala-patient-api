const express = require('express');
const router = express.Router();
const vitalsController = require('../controllers/vitalsController');

// Updated to match your actual filename 'authMiddleware.js'
const authMiddleware = require('../middleware/authMiddleware'); 

router.post('/', authMiddleware, vitalsController.addVitals);
router.get('/:patientId', authMiddleware, vitalsController.getPatientVitals);

module.exports = router;
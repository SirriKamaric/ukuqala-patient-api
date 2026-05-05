const express = require('express');
const router = express.Router();
const vitalsController = require('../controllers/vitalsController'); // Adjust path as needed

// This line is likely missing or incorrect:
router.post('/:id/vitals', vitalsController.addVitals);

// For fetching history:
router.get('/:id/vitals', vitalsController.getVitalsByPatient);

module.exports = router;
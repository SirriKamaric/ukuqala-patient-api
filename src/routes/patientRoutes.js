const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController'); 
const vitalsController = require('../controllers/vitalsController');
const { protect } = require('../middleware/authMiddleware');

// --- Patient Routes ---
router.get('/', protect, patientController.getAllPatients); 
router.post('/', protect, patientController.createPatient); 
router.get('/:id', protect, patientController.getPatientById);
router.put('/:id', protect, patientController.updatePatient);
router.delete('/:id', protect, patientController.deletePatient);

// --- Nested Vitals Routes ---
// Line 18 check: ensure commas separate the path, middleware, and handler
router.post('/:id/vitals', protect, vitalsController.addVitals); 
router.get('/:id/vitals', protect, vitalsController.getVitalsByPatient); 

module.exports = router;
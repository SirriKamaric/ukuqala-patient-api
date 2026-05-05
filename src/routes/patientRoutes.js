const express = require('express');
const router = express.Router();
const {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
} = require('../controllers/patientController');

const { 
    getVitalsByPatient, 
    addVitals 
} = require('../controllers/vitalsController'); 

const { protect } = require('../middleware/authMiddleware');

// --- DEBUG ---
router.get('/ping', (req, res) => res.send('pong'));

// --- Requirement 4.4: VITALS (MUST BE ABOVE GENERIC /:id) ---
router.route('/:id/vitals')
    .get(protect, getVitalsByPatient)
    .post(protect, addVitals);

// --- Requirement 4.3: PATIENT CRUD ---
router.route('/')
    .get(protect, getAllPatients)
    .post(protect, createPatient);

router.route('/:id')
    .get(protect, getPatientById)
    .put(protect, updatePatient)
    .delete(protect, deletePatient);

module.exports = router;
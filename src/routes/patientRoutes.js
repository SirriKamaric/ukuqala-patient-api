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


router.get('/ping', (req, res) => res.send('pong'));


router.route('/:id/vitals')
    .get(protect, getVitalsByPatient)
    .post(protect, addVitals);

router.route('/')
    .get(protect, getAllPatients)
    .post(protect, createPatient);

router.route('/:id')
    .get(protect, getPatientById)
    .put(protect, updatePatient)
    .delete(protect, deletePatient);

module.exports = router;
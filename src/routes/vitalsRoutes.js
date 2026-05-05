const express = require('express');
const router = express.Router();
const vitalsController = require('../controllers/vitalsController');
const { protect } = require('../middleware/authMiddleware');

console.log('--- Debugging Vitals Route ---');
console.log('Protect Middleware:', protect);
console.log('AddVitals Controller:', vitalsController.addVitals);

// The ':id' here is what fills 'req.params.id' in your controller
router.post('/:id', protect, vitalsController.addVitals);
router.get('/:id', protect, vitalsController.getVitalsByPatient);

module.exports = router;
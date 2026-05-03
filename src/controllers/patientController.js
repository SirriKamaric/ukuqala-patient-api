const Patient = require('../models/Patient');

// Create a new patient
exports.createPatient = async (req, res) => {
  try {
    // Extracting gender along with other fields for your Information System project
    const { name, age, gender, condition } = req.body; 
    
    const newPatient = await Patient.create({
      name,
      age,
      gender, 
      condition,
      userId: req.user.id // Taken from the JWT token via verifyToken
    });
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single patient
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update patient
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    
    // Updates name, age, gender, and condition based on req.body
    await patient.update(req.body);
    res.json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    
    await patient.destroy();
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
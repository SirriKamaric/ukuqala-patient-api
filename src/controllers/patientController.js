const Patient = require('../models/Patient');

// Requirement 4.3: Create a new patient
exports.createPatient = async (req, res) => {
  try {
    const { name, age, gender, condition } = req.body; 
    
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    const newPatient = await Patient.create({
      name,
      age,
      gender, 
      condition,
      userId: req.user.id 
    });
    
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ message: "Validation error", error: error.message });
  }
};

// Requirement 4.3: Get all patients for the dashboard/list
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
        where: { userId: req.user.id }
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error: error.message });
  }
};

// Requirement 4.3: Get single patient detail
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({
        where: { id: req.params.id, userId: req.user.id }
    });
    
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update patient details
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({
        where: { id: req.params.id, userId: req.user.id }
    });

    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    
    await patient.update(req.body);
    res.json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete patient
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({
        where: { id: req.params.id, userId: req.user.id }
    });

    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    
    await patient.destroy();
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
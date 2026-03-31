const Patient = require('../models/Patient');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60 });

const createPatient = async (req, res) => {
  try {
    const { name, age, condition } = req.body;
    const patient = await Patient.create({ name, age, condition });
    cache.del('all_patients');
    return res.status(201).json(patient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const cached = cache.get('all_patients');
    if (cached) {
      console.log('Returning data from cache');
      return res.status(200).json(cached);
    }
    const patients = await Patient.findAll();
    cache.set('all_patients', patients);
    console.log('Returning data from database');
    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    await patient.update(req.body);
    cache.del('all_patients');
    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    await patient.destroy();
    cache.del('all_patients');
    return res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
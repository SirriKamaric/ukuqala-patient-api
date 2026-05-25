const Doctor = require('../models/Doctor');

// GET ALL DOCTORS
exports.getDoctors = async (req, res) => {
  const doctors = await Doctor.findAll();
  res.json(doctors);
};

// CREATE DOCTOR
exports.createDoctor = async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.json(doctor);
};

// ❗ FIXED DELETE (THIS IS WHAT YOU WERE MISSING)
exports.deleteDoctor = async (req, res) => {
  try {

    const id = req.params.id;

    const deleted = await Doctor.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        message: 'Doctor not found'
      });
    }

    res.json({
      message: 'Doctor deleted permanently'
    });

  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};
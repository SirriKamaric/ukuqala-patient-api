const Vitals = require('../models/Vitals');

exports.addVitals = async (req, res) => {
    try {
        const vitals = await Vitals.create({
            ...req.body,
            recordedBy: req.user.id // Taken from your auth middleware
        });
        res.status(201).json(vitals);
    } catch (error) {
        res.status(500).json({ message: "Error saving vitals", error: error.message });
    }
};

exports.getPatientVitals = async (req, res) => {
    try {
        const history = await Vitals.findAll({
            where: { patientId: req.params.patientId },
            order: [['createdAt', 'DESC']]
        });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "Error fetching history", error: error.message });
    }
};
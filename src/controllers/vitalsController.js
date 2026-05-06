const Vitals = require('../models/Vitals');

// Requirement 4.4: Add new vitals
exports.addVitals = async (req, res) => {
    try {
        const { id } = req.params;
        const { heartRate, bloodPressure, temperature } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const vitals = await Vitals.create({
            patientId: id,
            heartRate: Number(heartRate),
            bloodPressure, // Ensure comma here
            temperature: Number(temperature), // Ensure comma here
            recordedBy: req.user.id
        });

        res.status(201).json(vitals);
    } catch (error) {
        res.status(500).json({ message: "Error saving vitals", error: error.message });
    }
};

// Requirement 4.4: Fetch history
exports.getVitalsByPatient = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await Vitals.findAll({
            where: { patientId: id },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(history || []);
    } catch (error) {
        res.status(500).json({ message: "Error fetching history", error: error.message });
    }
};
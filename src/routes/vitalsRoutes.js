const Vitals = require('../models/Vitals');

// Requirement 4.4: Add new vitals for a specific patient
exports.addVitals = async (req, res) => {
    try {
        const { id } = req.params;
        const { heartRate, bloodPressure, temperature, respiratoryRate, oxygenSaturation } = req.body;

        // 1. Validation check for required fields
        if (!heartRate || !bloodPressure || !temperature) {
            return res.status(400).json({ message: "All health metrics are required." });
        }

        // 2. Safety check for your auth middleware (Requirement 4.1)
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // 3. Create entry with explicit field mapping
        const vitals = await Vitals.create({
            patientId: id,
            bloodPressure,
            heartRate,
            temperature,
            respiratoryRate:  respiratoryRate || null,
            oxygenSaturation: oxygenSaturation || null,
            recordedBy: req.user.id
        });

        res.status(201).json(vitals);
    } catch (error) {
        console.error("Vitals Creation Error:", error);
        res.status(500).json({ message: "Error saving vitals", error: error.message });
    }
};

// Requirement 4.4: Fetch vitals history for a specific patient
exports.getVitalsByPatient = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Fetch history with descending order to show latest first
        const history = await Vitals.findAll({
            where: { patientId: id },
            order: [['createdAt', 'DESC']]
        });

        // 2. Return empty array rather than 404 if no history exists
        res.status(200).json(history || []);
    } catch (error) {
        console.error("Vitals Retrieval Error:", error);
        res.status(500).json({ message: "Error fetching history", error: error.message });
    }
};
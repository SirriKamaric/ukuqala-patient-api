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

        // 3. Create entry with EXPLICIT snake_case field mapping
        const vitals = await Vitals.create({
            patientId: id,
            heart_rate: heartRate,        // Mapped to model field
            blood_pressure: bloodPressure, // Mapped to model field
            temperature: temperature,      // Matches model
            respiratory_rate: respiratoryRate || null,
            oxygen_saturation: oxygenSaturation || null,
            recordedBy: req.user.id       // Requirement 4.1 audit trail
        });

        res.status(201).json(vitals);
    } catch (error) {
        console.error("Vitals Creation Error:", error);
        res.status(500).json({ message: "Error saving vitals", error: error.message });
    }
};

// Requirement 4.4: Fetch history
exports.getVitalsByPatient = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch history in reverse chronological order
        const history = await Vitals.findAll({
            where: { patientId: id },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(history || []);
    } catch (error) {
        console.error("Vitals Retrieval Error:", error);
        res.status(500).json({ message: "Error fetching history", error: error.message });
    }
};
 // const db = require('../config/db');

// 1. Fetch Doctors
exports.getAdminDoctors = async (req, res) => {
  try {
    const mockDoctors = [
      {
        id: "DOC-CHW-01",
        name: "Dr. Benatsus Chenwie",
        email: "benatsus@gmail.com",
        specialty: "Cardiologist",
        avatar: "",
        workspaceStatus: "APPROVED",
        licenseStatus: "APPROVED",
        idStatus: "PENDING",
        diplomaStatus: "PENDING",
        appointments: [
          {
            id: "a1",
            date: "2026-05-20",
            status: "Pending"
          }
        ],
        tickets: [
          {
            id: "t1",
            issue: "Login synchronization error",
            status: "OPEN"
          }
        ]
      },
      {
        id: "DOC-BIN-02",
        name: "Dr. Quinta Binwie",
        email: "quinta@gmail.com",
        specialty: "Neurologist",
        avatar: "",
        workspaceStatus: "PENDING",
        licenseStatus: "PENDING",
        idStatus: "APPROVED",
        diplomaStatus: "APPROVED",
        appointments: [],
        tickets: []
      }
    ];

    res.json(mockDoctors);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch doctors."
    });
  }
};

// 2. Doctor Appointments
exports.getDoctorAppointments = async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve appointments."
    });
  }
};

// 3. Verify Documents
exports.verifyDocument = async (req, res) => {
  const { docType, status } = req.body;

  try {
    res.status(200).json({
      message: `${docType} updated to ${status}`
    });
  } catch (error) {
    res.status(400).json({
      message: "Verification failed."
    });
  }
};

// 4. Resolve Tickets
exports.handleDoctorTicket = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  try {
    res.status(200).json({
      message: `Ticket ${id} updated to ${action}`
    });
  } catch (error) {
    res.status(500).json({
      message: "Ticket update failed."
    });
  }
};

// 5. Fetch Patients
exports.getAdminPatients = async (req, res) => {
  try {
    const mockPatients = [
      {
        id: "PAT-001",
        name: "Amadou Bello",
        age: 28,
        bloodGroup: "O+",
        location: "Yaoundé",
        appointments: [
          {
            id: "pa1",
            doctorName: "Dr. Benatsus Chenwie"
          }
        ]
      }
    ];

    res.json(mockPatients);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch patients."
    });
  }
};

// 6. Upload Doctor Avatar
exports.uploadDoctorAvatar = async (req, res) => {
  const { id } = req.params;
  const { avatar } = req.body;

  try {
    res.status(200).json({
      message: `Avatar updated for ${id}`,
      avatar
    });
  } catch (error) {
    res.status(500).json({
      message: "Avatar upload failed."
    });
  }
};

// 7. Delete Doctor
exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    res.status(200).json({
      message: `Doctor ${id} deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      message: "Doctor deletion failed."
    });
  }
};
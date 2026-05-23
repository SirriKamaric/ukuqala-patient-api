// const db = require('../config/db'); // Commented out to prevent MODULE_NOT_FOUND error since we are using mock data

// 1. Fetch all doctors, their tickets, and verification states
exports.getAdminDoctors = async (req, res) => {
  try {
    // Relational SQL query fetching profile info and relational states
    // const result = await db.query('SELECT * FROM doctors ORDER BY name ASC');
    // return res.json(result.rows);

    // Reliable fallback mock data matching frontend expectations
    const mockDoctors = [
      {
        id: "DOC-CHW-01",
        name: "Dr. Benatsus Chenwie",
        licenseStatus: "APPROVED",
        idStatus: "PENDING",
        diplomaStatus: "PENDING",
        appointments: [
          { id: "a1", date: "2026-05-20", status: "Pending" },
          { id: "a2", date: "2026-05-22", status: "Completed" }
        ],
        tickets: [
          { id: "t1", issue: "Database synchronization timeout error on login", status: "OPEN" }
        ]
      },
      {
        id: "DOC-BIN-02",
        name: "Dr. Quinta Binwie",
        licenseStatus: "PENDING",
        idStatus: "APPROVED",
        diplomaStatus: "APPROVED",
        appointments: [],
        tickets: []
      }
    ];
    res.json(mockDoctors);
  } catch (error) {
    res.status(500).json({ message: "Database read failure during system scan." });
  }
};

// 2. Fetch specific appointments for filtering
exports.getDoctorAppointments = async (req, res) => {
  const { id } = req.params;
  try {
    // const result = await db.query('SELECT * FROM appointments WHERE doctor_id = $1', [id]);
    // res.json(result.rows);
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve specific appointment records." });
  }
};

// 3. Update Verification Document States
exports.verifyDocument = async (req, res) => {
  const { id } = req.params;
  const { docType, status } = req.body; // e.g., docType: 'license', status: 'APPROVED'
  
  try {
    // Dynamic validation query based on document column requirements
    // const allowedColumns = ['licenseStatus', 'idStatus', 'diplomaStatus'];
    // if (allowedColumns.includes(docType)) {
    //   await db.query(`UPDATE doctors SET ${docType} = $1 WHERE id = $2`, [status, id]);
    // }
    
    res.status(200).json({ message: `Document category [${docType}] updated successfully to ${status}.` });
  } catch (error) {
    res.status(400).json({ message: "Execution failure: Status update rejected." });
  }
};

// 4. Resolve Active Support Tickets
exports.handleDoctorTicket = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  try {
    // await db.query('UPDATE tickets SET status = $1 WHERE id = $2', [action, id]);
    res.status(200).json({ message: `Ticket ${id} closed via action state: ${action}` });
  } catch (error) {
    res.status(500).json({ message: "Server error during administrative ticket mutation." });
  }
};

// 5. Fetch comprehensive Patient records 
exports.getAdminPatients = async (req, res) => {
  try {
    // const result = await db.query('SELECT * FROM patients ORDER BY created_at DESC');
    // res.json(result.rows);

    const mockPatients = [
      {
        id: "PAT-001",
        name: "Amadou Bello",
        age: 28,
        bloodGroup: "O+",
        location: "Yaoundé",
        height: 178,
        appointments: [
          { id: "pa1", time: "10:30 AM", doctorName: "Dr. Benatsus Chenwie" }
        ],
        tickets: [
          { id: "pt1", subject: "Profile image upload compression bug", status: "Open" }
        ]
      }
    ];
    res.json(mockPatients);
  } catch (error) {
    res.status(500).json({ message: "Failed to gather patient profiles context." });
  }
};
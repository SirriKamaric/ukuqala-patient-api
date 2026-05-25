import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AppointmentsPage() {

  const API = "http://localhost:3000/api/v4/appointments";

  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  /* FORM STATE */
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  /* =========================
     LOAD APPOINTMENTS (DB)
  ========================== */
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(API);
      setAppointments(res.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  /* FIXED useEffect (no warning) */
  useEffect(() => {
    const loadData = async () => {
      await fetchAppointments();
    };

    loadData();
  }, []);

  /* =========================
     SAVE APPOINTMENT
  ========================== */
  const handleSaveAppointment = async () => {

    if (!patient || !doctor || !date || !time) {
      alert('Please fill all fields');
      return;
    }

    const newAppointment = {
      patientName: patient,
      doctorName: doctor,
      date,
      time,
      reason: "General" // optional placeholder
    };

    try {
      await axios.post(API, newAppointment);

      await fetchAppointments();

      setPatient('');
      setDoctor('');
      setDate('');
      setTime('');

      setShowModal(false);

      alert('Appointment Saved Successfully');

    } catch (error) {
      console.log("Save error:", error);
    }
  };

  /* =========================
     DELETE APPOINTMENT
  ========================== */
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      await fetchAppointments();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div>

      {/* HEADER */}
      <div style={headerStyle}>

        <div>
          <h1 style={titleStyle}>Appointments</h1>
          <p style={subtitleStyle}>Manage all hospital appointments</p>
        </div>

        <button
          style={addBtn}
          onClick={() => setShowModal(true)}
        >
          + New Appointment
        </button>

      </div>

      {/* TABLE */}
      <div style={tableContainer}>

        <table style={tableStyle}>

          <thead>
            <tr>
              <th style={thStyle}>Patient</th>
              <th style={thStyle}>Doctor</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Time</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>

            {appointments.map(appt => (
              <tr key={appt.id}>

                <td style={tdStyle}>{appt.patientName}</td>
                <td style={tdStyle}>{appt.doctorName}</td>
                <td style={tdStyle}>{appt.date}</td>
                <td style={tdStyle}>{appt.time}</td>

                <td style={tdStyle}>
                  <button
                    style={deleteBtn}
                    onClick={() => handleDelete(appt.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {showModal && (
        <div style={modalOverlay}>

          <div style={modalBox}>

            <h2 style={modalTitle}>Create Appointment</h2>

            <input
              type="text"
              placeholder="Patient Name"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Doctor Name"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              style={inputStyle}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={inputStyle}
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={inputStyle}
            />

            <div style={modalActions}>

              <button
                style={cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                style={saveBtn}
                onClick={handleSaveAppointment}
              >
                Save Appointment
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================
   STYLES (UNCHANGED)
========================= */

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
  flexWrap: 'wrap',
  gap: '20px'
};

const titleStyle = { color: '#fff', margin: 0 };

const subtitleStyle = {
  color: '#8b949e',
  marginTop: '8px'
};

const addBtn = {
  background: '#238636',
  border: 'none',
  color: '#fff',
  padding: '12px 18px',
  borderRadius: '12px',
  cursor: 'pointer',
  fontWeight: '600'
};

const tableContainer = {
  background: '#161B22',
  border: '1px solid #30363d',
  borderRadius: '18px',
  overflow: 'hidden'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};

const thStyle = {
  textAlign: 'left',
  padding: '18px',
  color: '#8b949e',
  borderBottom: '1px solid #30363d'
};

const tdStyle = {
  padding: '18px',
  color: '#fff',
  borderBottom: '1px solid #222'
};

const deleteBtn = {
  background: '#da3633',
  border: 'none',
  color: '#fff',
  padding: '6px 12px',
  borderRadius: '8px',
  cursor: 'pointer'
};

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalBox = {
  width: '400px',
  background: '#161B22',
  border: '1px solid #30363d',
  borderRadius: '20px',
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
};

const modalTitle = { color: '#fff', margin: 0 };

const inputStyle = {
  background: '#0D1117',
  border: '1px solid #30363d',
  color: '#fff',
  padding: '12px',
  borderRadius: '10px',
  outline: 'none'
};

const modalActions = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  marginTop: '10px'
};

const cancelBtn = {
  background: '#21262d',
  border: 'none',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: '10px',
  cursor: 'pointer'
};

const saveBtn = {
  background: '#238636',
  border: 'none',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: '10px',
  cursor: 'pointer'
};
import { useEffect, useState } from 'react';

import { getPatients, createPatient, deletePatient } from "../api/patients";
export default function PatientsPage() {

  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');

  /* =========================
     FETCH PATIENTS
  ========================== */
  const fetchPatients = async () => {
    const data = await getPatients();
    setPatients(data);
  };

  /* FIXED useEffect (no ESLint warning pattern) */
  useEffect(() => {
    const loadData = async () => {
      await fetchPatients();
    };

    loadData();
  }, []);

  /* =========================
     CREATE PATIENT
  ========================== */
  const handleSave = async () => {

    if (!name || !age || !gender || !phone) {
      alert("Please fill all fields");
      return;
    }

    const newPatient = {
      name,
      age,
      gender,
      phone
    };

    const result = await createPatient(newPatient);

    if (result?.error) {
      alert(result.message);
      return;
    }

    await fetchPatients();

    setName('');
    setAge('');
    setGender('');
    setPhone('');
    setShowModal(false);
  };

  /* =========================
     DELETE PATIENT
  ========================== */
  const handleDelete = async (id) => {
    const result = await deletePatient(id);

    if (result?.error) {
      alert(result.message);
      return;
    }

    await fetchPatients();
  };

  return (
    <div>

      {/* HEADER */}
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Patients</h1>
          <p style={subtitleStyle}>Manage hospital patients</p>
        </div>

        <button style={addBtn} onClick={() => setShowModal(true)}>
          + New Patient
        </button>
      </div>

      {/* TABLE */}
      <div style={tableContainer}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Age</th>
              <th style={thStyle}>Gender</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td style={tdStyle}>{p.name}</td>
                <td style={tdStyle}>{p.age}</td>
                <td style={tdStyle}>{p.gender}</td>
                <td style={tdStyle}>{p.phone}</td>

                <td style={tdStyle}>
                  <button style={deleteBtn} onClick={() => handleDelete(p.id)}>
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

            <h2 style={modalTitle}>Add Patient</h2>

            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />

            <div style={modalActions}>
              <button style={cancelBtn} onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button style={saveBtn} onClick={handleSave}>
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

/* =========================
   STYLES (ALL FIXED HERE)
========================= */

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px'
};

const titleStyle = {
  color: '#fff',
  margin: 0
};

const subtitleStyle = {
  color: '#8b949e',
  marginTop: '6px'
};

const addBtn = {
  background: '#238636',
  border: 'none',
  color: '#fff',
  padding: '12px 18px',
  borderRadius: '12px',
  cursor: 'pointer'
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
  justifyContent: 'center'
};

const modalBox = {
  width: '400px',
  background: '#161B22',
  padding: '30px',
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
};

const modalTitle = {
  color: '#fff',
  margin: 0
};

const inputStyle = {
  background: '#0D1117',
  border: '1px solid #30363d',
  color: '#fff',
  padding: '10px',
  borderRadius: '10px'
};

const modalActions = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px'
};

const cancelBtn = {
  background: '#21262d',
  color: '#fff',
  padding: '10px',
  borderRadius: '10px',
  border: 'none'
};

const saveBtn = {
  background: '#238636',
  color: '#fff',
  padding: '10px',
  borderRadius: '10px',
  border: 'none'
};
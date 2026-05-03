import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import apiClient from '../api/apiClient';
import DeleteModal from '../components/DeleteModal'; // Ensure this file exists

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      const response = await apiClient.get('/patients');
      setPatients(response.data);
    } catch (err) {
      console.error("Failed to fetch patients", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Open delete confirmation
  const handleDeleteClick = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  // Execute delete via API
  const handleConfirmDelete = async () => {
    try {
      await apiClient.delete(`/patients/${selectedPatient.id}`);
      // Remove from UI state immediately
      setPatients(patients.filter(p => p.id !== selectedPatient.id));
      setIsModalOpen(false);
    } catch (error) {
      alert("Failed to delete patient. Please try again.");
      console.error(error);
    }
  };

  const capitalize = (str) => {
    if (!str) return 'N/A';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Patient Records</h2>
        <button 
          onClick={() => navigate('/add-patient')} 
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.opacity = '0.9'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          + Add New Patient
        </button>
      </div>

      <div style={tableContainerStyle}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Age</th>
              <th style={thStyle}>Gender</th>
              <th style={thStyle}>Condition / Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={emptyStateStyle}>Loading patients...</td></tr>
            ) : patients.length > 0 ? (
              patients.map((patient) => (
                <tr key={patient.id} style={trStyle}>
                  <td style={tdStyle}><strong>{patient.name}</strong></td>
                  <td style={tdStyle}>{patient.age}</td>
                  <td style={tdStyle}>{capitalize(patient.gender)}</td>
                  <td style={tdStyle}>
                    <span style={statusBadgeStyle}>
                      {capitalize(patient.condition) || 'Stable'}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <button 
                      onClick={() => navigate(`/edit-patient/${patient.id}`)}
                      style={editButtonStyle}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(patient)}
                      style={deleteButtonStyle}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" style={emptyStateStyle}>No patients found. Click '+ Add New Patient' to begin.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmDelete}
        patientName={selectedPatient?.name}
      />
    </DashboardLayout>
  );
};

// --- Styles ---

const tableContainerStyle = { 
  backgroundColor: 'var(--card-surface)', 
  borderRadius: '12px', 
  overflow: 'hidden', 
  border: '1px solid var(--border-color)',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
};

const thStyle = { padding: '15px', color: '#888', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' };
const tdStyle = { padding: '15px', color: '#eee' };
const trStyle = { borderTop: '1px solid var(--border-color)', transition: 'background 0.2s ease' };

const statusBadgeStyle = { 
  color: 'var(--success)', 
  backgroundColor: 'rgba(34, 197, 94, 0.1)', 
  padding: '4px 10px', 
  borderRadius: '6px', 
  fontSize: '13px',
  fontWeight: '500'
};

const emptyStateStyle = { padding: '40px', textAlign: 'center', color: '#666' };

const buttonStyle = { 
  backgroundColor: 'var(--primary-blue)', 
  color: 'white', 
  padding: '12px 24px', 
  border: 'none', 
  borderRadius: '8px', 
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'opacity 0.2s ease'
};

const editButtonStyle = {
  backgroundColor: 'transparent',
  color: 'var(--primary-blue)',
  border: '1px solid var(--primary-blue)',
  padding: '6px 12px',
  borderRadius: '4px',
  marginRight: '8px',
  cursor: 'pointer',
  fontSize: '12px'
};

const deleteButtonStyle = {
  backgroundColor: 'transparent',
  color: 'var(--danger)',
  border: '1px solid var(--danger)',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px'
};

export default PatientsPage;
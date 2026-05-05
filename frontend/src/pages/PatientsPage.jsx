import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import apiClient from '../api/apiClient';
import { DeleteModal } from '../components/DeleteModal';

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

  // FIXED: Wrapped in an async caller to avoid React 19 cascading render error
  useEffect(() => {
    const loadData = async () => {
      await fetchPatients();
    };
    loadData();
  }, []);

  const handleDeleteClick = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await apiClient.delete(`/patients/${selectedPatient.id}`);
      setPatients(patients.filter(p => p.id !== selectedPatient.id));
      setIsModalOpen(false);
    } catch {
      alert("Delete failed. Please try again.");
    }
  };

  const capitalize = (str) => {
    if (!str) return 'N/A';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Patient Records</h2>
        <button 
          onClick={() => navigate('/add-patient')} 
          style={buttonStyle}
        >
          + Add New Patient
        </button>
      </div>

      <div style={tableContainerStyle}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Age</th>
              <th style={thStyle}>Gender</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={emptyStateStyle}>Loading...</td></tr>
            ) : patients.length > 0 ? (
              patients.map((p) => (
                <tr key={p.id} style={trStyle}>
                  <td style={tdStyle}><strong>{p.name}</strong></td>
                  <td style={tdStyle}>{p.age}</td>
                  <td style={tdStyle}>{capitalize(p.gender)}</td>
                  <td style={tdStyle}>
                    <button 
                      onClick={() => navigate(`/edit-patient/${p.id}`)} 
                      style={editButtonStyle}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteClick(p)} style={deleteButtonStyle}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" style={emptyStateStyle}>No patients found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <DeleteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirmDelete}
        patientName={selectedPatient?.name}
      />
    </DashboardLayout>
  );
};

// Styles
const tableContainerStyle = { backgroundColor: 'var(--card-surface)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' };
const thStyle = { padding: '15px', color: '#888', fontSize: '14px', textTransform: 'uppercase' };
const tdStyle = { padding: '15px', color: '#eee' };
const trStyle = { borderTop: '1px solid var(--border-color)' };
const emptyStateStyle = { padding: '40px', textAlign: 'center', color: '#666' };
const buttonStyle = { backgroundColor: 'var(--primary-blue)', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer' };
const editButtonStyle = { backgroundColor: 'transparent', color: 'var(--primary-blue)', border: '1px solid var(--primary-blue)', padding: '6px 12px', borderRadius: '4px', marginRight: '8px', cursor: 'pointer' };
const deleteButtonStyle = { backgroundColor: 'transparent', color: 'var(--danger)', border: '1px solid var(--danger)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' };

export default PatientsPage;
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import apiClient from '../api/apiClient';

const EditPatientPage = () => {
  const { id } = useParams(); // Grabs the ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Form state aligned with your database schema
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    condition: ''
  });

  // Fetch the current patient data on load
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await apiClient.get(`/patients/${id}`);
        setFormData(response.data);
      } catch (err) {
        console.error("Error fetching patient details:", err);
        alert("Could not find this patient record.");
        navigate('/patients');
      } finally {
        setLoading(false);
      }
    };
    fetchPatientData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API v4 PUT request to update the record
      await apiClient.put(`/patients/${id}`, formData);
      alert("Patient updated successfully!");
      navigate('/patients');
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to save changes.");
    }
  };

  if (loading) return <DashboardLayout><div>Loading patient data...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div style={formContainerStyle}>
        <h2 style={{ marginBottom: '20px' }}>Edit Patient: {formData.name}</h2>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label>Full Name</label>
            <input 
              style={inputStyle}
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>

          <div style={inputGroupStyle}>
            <label>Age</label>
            <input 
              style={inputStyle}
              type="number" 
              value={formData.age} 
              onChange={(e) => setFormData({...formData, age: e.target.value})} 
              required 
            />
          </div>

          <div style={inputGroupStyle}>
            <label>Gender</label>
            <select 
              style={inputStyle}
              value={formData.gender} 
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button type="submit" style={saveButtonStyle}>Update Patient</button>
            <button type="button" onClick={() => navigate('/patients')} style={cancelButtonStyle}>Cancel</button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

// Internal styles to keep the UI consistent with your dashboard
const formContainerStyle = { padding: '30px', backgroundColor: 'var(--card-surface)', borderRadius: '12px', border: '1px solid var(--border-color)' };
const inputGroupStyle = { marginBottom: '15px', display: 'flex', flexDirection: 'column' };
const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #444', backgroundColor: '#222', color: 'white', marginTop: '5px' };
const saveButtonStyle = { backgroundColor: 'var(--primary-blue)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '10px' };
const cancelButtonStyle = { backgroundColor: 'transparent', color: '#888', border: '1px solid #444', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' };

export default EditPatientPage;
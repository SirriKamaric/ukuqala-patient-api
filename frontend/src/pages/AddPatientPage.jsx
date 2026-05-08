import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const AddPatientPage = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    age: '', 
    gender: '', 
    condition: '' 
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      await apiClient.post('/patients', formData);
      navigate('/patients'); 
    } catch (err) {
      console.error("Error adding patient:", err);
      alert("Failed to add patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', color: 'white' }}>
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', marginTop: '20px' }}>
        <input 
          style={inputStyle} 
          placeholder="Patient Name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required 
        />
        
        <input 
          type="number" 
          style={inputStyle} 
          placeholder="Age" 
          value={formData.age}
          onChange={(e) => setFormData({...formData, age: e.target.value})}
          required 
        />

      
        <select 
          style={inputStyle} 
          value={formData.gender}
          onChange={(e) => setFormData({...formData, gender: e.target.value})}
          required
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input 
          style={inputStyle} 
          placeholder="Primary Condition" 
          value={formData.condition}
          onChange={(e) => setFormData({...formData, condition: e.target.value})}
          required 
        />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Registering...' : 'Register Patient'}
        </button>
      </form>
    </div>
  );
};

const inputStyle = { 
  width: '100%', 
  padding: '12px', 
  marginBottom: '15px', 
  backgroundColor: '#1a1a1a', 
  border: '1px solid #333', 
  color: 'white', 
  borderRadius: '8px',
  display: 'block' 
};

const buttonStyle = { 
  width: '100%', 
  padding: '12px', 
  backgroundColor: '#2563eb', 
  color: 'white', 
  fontWeight: 'bold', 
  border: 'none', 
  borderRadius: '8px', 
  cursor: 'pointer' 
};

export default AddPatientPage;
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import apiClient from '../api/apiClient';

const PatientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [vitalsForm, setVitalsForm] = useState({
    heart_rate: '',
    blood_pressure: '',
    temperature: ''
  });

  const fetchData = async () => {
    try {
      // 1. Fetch Patient Basic Info
      const patientRes = await apiClient.get(`/patients/${id}`);
      setPatient(patientRes.data);

      // 2. Fetch Vitals (Separated to catch 404s gracefully)
      try {
        const vitalsRes = await apiClient.get(`/patients/${id}/vitals`);
        setVitals(vitalsRes.data || []);
      } catch (vitalsErr) {
        console.warn("Vitals endpoint not found or empty:", vitalsErr.message);
        setVitals([]); // Fallback to empty list
      }
    } catch (err) {
      console.error("Critical Data fetch failed:", err);
      // If the patient itself is 404, go back
      navigate('/patients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };
    loadData();
  }, [id]);

  const handleAddVitals = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post(`/patients/${id}/vitals`, vitalsForm);
      setVitalsForm({ heart_rate: '', blood_pressure: '', temperature: '' });
      await fetchData(); // Refresh
      alert("Vitals recorded successfully!");
    } catch (err) {
      console.error("Failed to add vitals:", err);
      alert("Error: Backend vitals route (POST) not found (404). Check your backend controller.");
    }
  };

  if (loading) return <DashboardLayout><div>Loading patient profile...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <div style={cardStyle}>
          <button onClick={() => navigate('/patients')} style={{marginBottom: '10px', cursor: 'pointer'}}>← Back to List</button>
          <h2 style={{ color: 'var(--primary-blue)' }}>{patient?.name}'s Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
            <p><strong>Age:</strong> {patient?.age}</p>
            <p><strong>Condition:</strong> {patient?.condition || 'N/A'}</p>
          </div>
        </div>

        <div style={cardStyle}>
          <h3>Record New Vitals (Requirement 4.4)</h3>
          <form onSubmit={handleAddVitals} style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
            <input type="number" placeholder="HR (bpm)" value={vitalsForm.heart_rate} onChange={(e) => setVitalsForm({...vitalsForm, heart_rate: e.target.value})} style={inputStyle} required />
            <input type="text" placeholder="BP (120/80)" value={vitalsForm.blood_pressure} onChange={(e) => setVitalsForm({...vitalsForm, blood_pressure: e.target.value})} style={inputStyle} required />
            <input type="number" step="0.1" placeholder="Temp (°C)" value={vitalsForm.temperature} onChange={(e) => setVitalsForm({...vitalsForm, temperature: e.target.value})} style={inputStyle} required />
            <button type="submit" style={addBtnStyle}>Save Vitals</button>
          </form>
        </div>

        <div style={cardStyle}>
          <h3>Vitals History</h3>
          <div style={{ marginTop: '15px' }}>
            {vitals.length > 0 ? vitals.map((v) => (
              <div key={v.id} style={vitalsEntryStyle}>
                <span><strong>HR:</strong> {v.heart_rate}</span>
                <span><strong>BP:</strong> {v.blood_pressure}</span>
                <span><strong>Temp:</strong> {v.temperature}°C</span>
                <span style={{ color: '#888', fontSize: '12px' }}>{new Date(v.createdAt).toLocaleString()}</span>
              </div>
            )) : <p style={{ color: '#666' }}>No vitals found. Ensure the route /api/v4/patients/:id/vitals is set up in your backend.</p>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const cardStyle = { background: 'var(--card-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' };
const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #444', background: '#222', color: 'white', flex: '1', minWidth: '120px' };
const addBtnStyle = { background: 'var(--primary-blue)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' };
const vitalsEntryStyle = { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #333' };

export default PatientDetailPage;
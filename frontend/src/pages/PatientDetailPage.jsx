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
    heartRate: '',
    bloodPressure: '',
    temperature: ''
  });

  const handleAddVitals = async (e) => {
    e.preventDefault();
    try {
      /**
       * ✅ FIXED: Target the nested patient endpoint
       * Matches router.post('/:id/vitals', ...) in patientRoutes.js
       */
      await apiClient.post(`/patients/${id}/vitals`, {
        heartRate: Number(vitalsForm.heartRate),
        bloodPressure: vitalsForm.bloodPressure,
        temperature: Number(vitalsForm.temperature),
      });

      setVitalsForm({ heartRate: '', bloodPressure: '', temperature: '' });

      // ✅ Refresh vitals using the nested GET path
      const vitalsRes = await apiClient.get(`/patients/${id}/vitals`);
      const sorted = (vitalsRes.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setVitals(sorted);

    } catch (err) {
      console.error('Failed to add vitals:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to save vitals.');
    }
  };

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const patientRes = await apiClient.get(`/patients/${id}`);
        setPatient(patientRes.data);

        try {
          /**
           * ✅ FIXED: Consistent URL /patients/${id}/vitals
           * This resolves the GET 404 you were seeing
           */
          const vitalsRes = await apiClient.get(`/patients/${id}/vitals`);
          const sorted = (vitalsRes.data || []).sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setVitals(sorted);
        } catch (vitalsErr) {
          console.warn('Vitals fetch failed:', vitalsErr.message);
          setVitals([]);
        }
      } catch (err) {
        console.error('Patient fetch failed:', err);
        navigate('/patients');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);

  // ... (Rest of the component remains the same for styling and UI)
  if (loading) return <DashboardLayout><div>Loading patient profile...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        {/* Patient Info */}
        <div style={cardStyle}>
          <button onClick={() => navigate('/patients')} style={{ marginBottom: '10px', cursor: 'pointer' }}>← Back to List</button>
          <h2 style={{ color: 'var(--primary-blue)' }}>{patient?.name}'s Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
            <p><strong>Age:</strong> {patient?.age}</p>
            <p><strong>Condition:</strong> {patient?.condition || 'N/A'}</p>
          </div>
        </div>

        {/* Add Vitals Form */}
        <div style={cardStyle}>
          <h3>Record New Vitals</h3>
          <form onSubmit={handleAddVitals} style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
            <input
              type="number"
              placeholder="HR (bpm)"
              value={vitalsForm.heartRate}
              onChange={(e) => setVitalsForm({ ...vitalsForm, heartRate: e.target.value })}
              style={inputStyle}
              required
            />
            <input
              type="text"
              placeholder="BP (120/80)"
              value={vitalsForm.bloodPressure}
              onChange={(e) => setVitalsForm({ ...vitalsForm, bloodPressure: e.target.value })}
              style={inputStyle}
              required
            />
            <input
              type="number"
              step="0.1"
              placeholder="Temp (°C)"
              value={vitalsForm.temperature}
              onChange={(e) => setVitalsForm({ ...vitalsForm, temperature: e.target.value })}
              style={inputStyle}
              required
            />
            <button type="submit" style={addBtnStyle}>Save Vitals</button>
          </form>
        </div>

        {/* Vitals History */}
        <div style={cardStyle}>
          <h3>Vitals History</h3>
          <div style={{ marginTop: '15px' }}>
            {vitals.length > 0 ? vitals.map((v) => (
              <div key={v.id} style={vitalsEntryStyle}>
                <span><strong>HR:</strong> {v.heartRate} bpm</span>
                <span><strong>BP:</strong> {v.bloodPressure}</span>
                <span><strong>Temp:</strong> {v.temperature}°C</span>
                <span style={{ color: '#888', fontSize: '12px' }}>{new Date(v.createdAt).toLocaleString()}</span>
              </div>
            )) : <p style={{ color: '#666' }}>No vitals recorded yet for this patient.</p>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// ... Styles (cardStyle, inputStyle, etc.) remain unchanged
const cardStyle = { background: 'var(--card-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' };
const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #444', background: '#222', color: 'white', flex: '1', minWidth: '120px' };
const addBtnStyle = { background: 'var(--primary-blue)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' };
const vitalsEntryStyle = { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #333' };

export default PatientDetailPage;
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/apiClient';

const Vitals = () => {
  const { id: patientId } = useParams();

  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    heartRate: '',
    bloodPressure: '',
    temperature: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // ✅ async function defined INSIDE the effect — linter is satisfied
  useEffect(() => {
    if (!patientId) return;

    const loadVitals = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.get(`/vitals/${patientId}`);
        const sorted = (res.data || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setVitals(sorted);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load vitals.');
      } finally {
        setLoading(false);
      }
    };

    loadVitals();
  }, [patientId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiClient.post(`/vitals/${patientId}`, {
        heartRate: Number(form.heartRate),
        bloodPressure: form.bloodPressure,
        temperature: Number(form.temperature),
      });
      setForm({ heartRate: '', bloodPressure: '', temperature: '' });

      // ✅ Inline refresh after POST — no external fetchVitals needed
      const res = await apiClient.get(`/vitals/${patientId}`);
      const sorted = (res.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setVitals(sorted);

    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save vitals.');
    } finally {
      setSubmitting(false);
    }
  };

  const isAbnormal = (v) =>
    v.heartRate < 60 || v.heartRate > 100 ||
    v.temperature < 36 || v.temperature > 37.5;

  if (loading) return <div style={centerStyle}>Loading vitals...</div>;
  if (error) return <div style={{ ...centerStyle, color: 'red' }}>{error}</div>;

  return (
    <div style={pageStyle}>
      <h2 style={{ color: 'var(--primary-blue)', marginBottom: '20px' }}>
        Patient Vitals
      </h2>

      {/* POST Form */}
      <div style={cardStyle}>
        <h3>Record New Vitals</h3>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            name="heartRate"
            type="number"
            placeholder="Heart Rate (bpm)"
            value={form.heartRate}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            name="bloodPressure"
            type="text"
            placeholder="Blood Pressure (120/80)"
            value={form.bloodPressure}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            name="temperature"
            type="number"
            step="0.1"
            placeholder="Temperature (°C)"
            value={form.temperature}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <button type="submit" style={btnStyle} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Vitals'}
          </button>
        </form>
      </div>

      {/* GET History */}
      <div style={cardStyle}>
        <h3>Vitals History</h3>
        {vitals.length === 0 ? (
          <p style={{ color: '#888', marginTop: '10px' }}>
            No vitals recorded yet.
          </p>
        ) : (
          vitals.map((v) => (
            <div
              key={v.id}
              style={{
                ...entryStyle,
                background: isAbnormal(v) ? '#2a1f00' : 'transparent',
                borderLeft: isAbnormal(v) ? '3px solid #f0a500' : '3px solid transparent',
              }}
            >
              {isAbnormal(v) && (
                <span style={{ color: '#f0a500', fontSize: '12px' }}>
                  ⚠ Out of normal range
                </span>
              )}
              <div style={rowStyle}>
                <span><strong>HR:</strong> {v.heartRate} bpm</span>
                <span><strong>BP:</strong> {v.bloodPressure}</span>
                <span><strong>Temp:</strong> {v.temperature}°C</span>
                <span style={{ color: '#888', fontSize: '12px' }}>
                  {new Date(v.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const pageStyle = { padding: '24px', maxWidth: '800px', margin: '0 auto' };
const centerStyle = { textAlign: 'center', padding: '40px', color: '#888' };
const cardStyle = { background: 'var(--card-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '20px' };
const formStyle = { display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' };
const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #444', background: '#222', color: 'white', flex: '1', minWidth: '140px' };
const btnStyle = { background: 'var(--primary-blue)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' };
const entryStyle = { padding: '12px 10px', borderBottom: '1px solid #333', borderRadius: '6px', marginBottom: '4px' };
const rowStyle = { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginTop: '4px' };

export default Vitals;
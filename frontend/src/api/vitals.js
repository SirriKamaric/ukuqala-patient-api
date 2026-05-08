import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner'; 
import { getVitals, createVitals } from '../api/vitals';

const Vitals = () => {
  const { id: patientId } = useParams();
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ heartRate: '', bloodPressure: '', temperature: '' });

  // Requirement 6.2: Fixed Effect to avoid cascading renders and memory leaks
  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const res = await getVitals(patientId);
        if (isMounted) {
          const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setVitals(sorted);
        }
      } catch {
        if (isMounted) setErrorMessage('Unable to load health records.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (patientId) loadData();
    return () => { isMounted = false; };
  }, [patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createVitals(patientId, form);
      setForm({ heartRate: '', bloodPressure: '', temperature: '' });
      // Refresh data after successful POST
      const res = await getVitals(patientId);
      const sorted = (res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setVitals(sorted);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to save vitals.');
    } finally {
      setSubmitting(false);
    }
  };

  const isAbnormal = (v) => 
    v.heartRate < 60 || v.heartRate > 100 || v.temperature < 36 || v.temperature > 37.5;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="vitals-wrapper">
      <h2 className="section-title">Health Monitoring</h2>

      {errorMessage && <div className="error-banner">{errorMessage}</div>}

      {/* Requirement 4.4 & 6.3: Vitals Entry Form */}
      <div className="vitals-card">
        <h3>New Measurement</h3>
        <form onSubmit={handleSubmit} className="vitals-inline-form">
          <input
            name="heartRate"
            type="number"
            placeholder="Heart Rate"
            value={form.heartRate}
            onChange={(e) => setForm({ ...form, heartRate: e.target.value })}
            required
          />
          <input
            name="bloodPressure"
            type="text"
            placeholder="BP (e.g. 120/80)"
            value={form.bloodPressure}
            onChange={(e) => setForm({ ...form, bloodPressure: e.target.value })}
            required
          />
          <input
            name="temperature"
            type="number"
            step="0.1"
            placeholder="Temp (°C)"
            value={form.temperature}
            onChange={(e) => setForm({ ...form, temperature: e.target.value })}
            required
          />
          <button type="submit" className="btn-save" disabled={submitting}>
            {submitting ? 'Saving...' : 'Record'}
          </button>
        </form>
      </div>

      {/* Requirement 4.4 & 6.3: Vitals History with Abnormal Range logic */}
      <div className="vitals-card">
        <h3>History</h3>
        {vitals.length === 0 ? (
          <p className="text-muted">No vitals recorded yet.</p>
        ) : (
          <div className="vitals-list">
            {vitals.map((v) => (
              <div key={v.id} className={`vitals-item ${isAbnormal(v) ? 'abnormal-entry' : ''}`}>
                <div className="vitals-data-row">
                  <span><strong>HR:</strong> {v.heartRate} bpm</span>
                  <span><strong>BP:</strong> {v.bloodPressure}</span>
                  <span><strong>Temp:</strong> {v.temperature}°C</span>
                  <span className="vitals-date">{new Date(v.createdAt).toLocaleDateString()}</span>
                </div>
                {isAbnormal(v) && <span className="abnormal-badge">⚠ Attention Required</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Vitals;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '../api/apiClient';

export default function AddPatientPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    age: '',
    condition: '',
    gender: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {

      await apiClient.post('/patients', {
        name: form.name,
        age: Number(form.age),
        condition: form.condition,
        gender: form.gender
      });

      navigate('/patients');

    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Failed to create patient'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>

      <div style={styles.card}>

        <h1 style={styles.title}>Add Patient</h1>

        <p style={styles.subtitle}>
          Register a new patient record
        </p>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Patient Name"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => updateField('age', e.target.value)}
            style={styles.input}
            required
          />

          {/* ✅ NEW GENDER FIELD */}
          <select
            value={form.gender}
            onChange={(e) => updateField('gender', e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Condition"
            value={form.condition}
            onChange={(e) => updateField('condition', e.target.value)}
            style={styles.input}
            required
          />

          <button
            type="submit"
            style={styles.button}
          >
            {loading ? 'Saving...' : 'Create Patient'}
          </button>

        </form>

      </div>

    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#0D1117',
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  card: {
    width: '100%',
    maxWidth: '500px',
    background: '#161B22',
    padding: '32px',
    borderRadius: '18px',
    border: '1px solid #30363d'
  },

  title: {
    color: '#fff',
    marginBottom: '8px'
  },

  subtitle: {
    color: '#8b949e',
    marginBottom: '25px'
  },

  input: {
    width: '100%',
    padding: '14px',
    marginBottom: '18px',
    borderRadius: '10px',
    border: '1px solid #30363d',
    background: '#0D1117',
    color: '#fff',
    boxSizing: 'border-box'
  },

  button: {
    width: '100%',
    padding: '14px',
    border: 'none',
    borderRadius: '10px',
    background: '#1f6feb',
    color: '#fff',
    fontWeight: '600',
    cursor: 'pointer'
  },

  error: {
    background: '#2d1617',
    color: '#ff7b72',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '18px'
  }
};
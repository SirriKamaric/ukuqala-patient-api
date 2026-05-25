import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState('patient');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password
      });

      if (role === 'doctor') {
        const doctors =
          JSON.parse(
            localStorage.getItem('custom_doctors')
          ) || [];

        doctors.push({
          id: Date.now(),
          name: `Dr. ${form.name}`,
          email: form.email,
          specialty: form.specialty,
          workspaceStatus: 'PENDING'
        });

        localStorage.setItem(
          'custom_doctors',
          JSON.stringify(doctors)
        );
      }

      navigate('/login');

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Registration failed'
      );
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>

        <h1 style={styles.title}>
          Create Account
        </h1>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <div style={styles.tabs}>
          <button
            type="button"
            onClick={() => setRole('patient')}
            style={{
              ...styles.tab,
              background:
                role === 'patient'
                  ? '#1f6feb'
                  : 'transparent'
            }}
          >
            Patient
          </button>

          <button
            type="button"
            onClick={() => setRole('doctor')}
            style={{
              ...styles.tab,
              background:
                role === 'doctor'
                  ? '#1f6feb'
                  : 'transparent'
            }}
          >
            Doctor
          </button>
        </div>

        <input
          placeholder="Full Name"
          style={styles.input}
          required
          onChange={e =>
            update('name', e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          required
          onChange={e =>
            update('email', e.target.value)
          }
        />

        {role === 'doctor' && (
          <input
            placeholder="Specialty"
            style={styles.input}
            required
            onChange={e =>
              update('specialty', e.target.value)
            }
          />
        )}

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          required
          onChange={e =>
            update('password', e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          style={styles.input}
          required
          onChange={e =>
            update(
              'confirmPassword',
              e.target.value
            )
          }
        />

        <button style={styles.button}>
          {loading ? 'Please wait...' : 'Register'}
        </button>

        <p style={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#0D1117'
  },

  card: {
    width: '100%',
    maxWidth: '400px',
    background: '#161B22',
    padding: '35px',
    borderRadius: '18px',
    border: '1px solid #30363d'
  },

  title: {
    color: '#fff'
  },

  tabs: {
    display: 'flex',
    gap: '10px',
    margin: '20px 0'
  },

  tab: {
    flex: 1,
    padding: '12px',
    border: '1px solid #30363d',
    color: '#fff',
    borderRadius: '10px',
    cursor: 'pointer'
  },

  input: {
    width: '100%',
    padding: '13px',
    margin: '14px 0',
    borderRadius: '10px',
    border: '1px solid #30363d',
    background: '#0D1117',
    color: '#fff',
    boxSizing: 'border-box'
  },

  button: {
    width: '100%',
    padding: '13px',
    background: '#1f6feb',
    border: 'none',
    color: '#fff',
    borderRadius: '10px',
    marginTop: '18px',
    cursor: 'pointer',
    fontWeight: '600'
  },

  error: {
    background: '#2d1617',
    color: '#ff7b72',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '15px'
  },

  footer: {
    color: '#8b949e',
    textAlign: 'center',
    marginTop: '20px'
  },

  link: {
    color: '#58a6ff'
  }
};
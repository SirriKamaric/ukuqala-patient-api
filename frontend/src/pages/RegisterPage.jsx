import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';


const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Requirement 4.1: Client-side match validation
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      // On success: redirect to Login with success state
      navigate('/login', { state: { message: 'Registration successful! Please login.' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const styles = {
    container: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--dark-bg)' },
    card: { backgroundColor: 'var(--card-surface)', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', border: '1px solid var(--border-color)' },
    input: { width: '100%', padding: '12px', marginBottom: '15px', backgroundColor: 'var(--dark-bg)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '8px' },
    button: { width: '100%', backgroundColor: 'var(--primary-orange)', color: 'white', fontWeight: 'bold' } // Using Primary Orange for Register accent
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Create Account</h2>
        {error && <p style={{ color: 'var(--danger)', marginBottom: '15px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" style={styles.input} required 
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="email" placeholder="Email" style={styles.input} required 
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" style={styles.input} required 
            onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <input type="password" placeholder="Confirm Password" style={styles.input} required 
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary-blue)' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
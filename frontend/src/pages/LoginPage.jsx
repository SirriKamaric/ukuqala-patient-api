import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const data = await loginUser({ email, password });
      
      if (data.token) {
        // --- START PENDING QUALIFICATION GATEKEEPER ---
        // Check local storage to see if this user registered as a clinician
        const localCustomDocs = JSON.parse(localStorage.getItem('custom_doctors') || '[]');
        const doctorProfile = localCustomDocs.find(d => d.email.toLowerCase() === email.toLowerCase());

        if (doctorProfile && doctorProfile.workspaceStatus !== 'APPROVED') {
          throw new Error('⏳ Access Denied: Your medical qualification credentials are currently pending administrative review.');
        }
        // --- END PENDING QUALIFICATION GATEKEEPER ---

        login(data.token, data.user || { name: email.split('@')[0] });
        navigate('/dashboard');
      } else {
        throw new Error('No token received.');
      }
    } catch (err) {
      // Catch either our custom verification error or standard backend network rejection strings
      const serverMessage = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
      setError(serverMessage);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Ukuqala Login</h2>
        {error && <div style={styles.errorBanner}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>Sign In</button>
        </form>
        <p style={styles.footerText}>
          Don't have an account?{' '}
          <Link to="/register" style={styles.link}>Register</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh', display: 'flex',
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#0f172a'
  },
  card: {
    backgroundColor: '#1e293b', padding: '40px',
    borderRadius: '12px', width: '100%', maxWidth: '400px',
    border: '1px solid #334155', boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
  },
  title: { marginBottom: '24px', textAlign: 'center', color: '#f8fafc', fontSize: '1.5rem' },
  label: { display: 'block', color: '#94a3b8', marginBottom: '8px', fontSize: '0.875rem' },
  input: {
    width: '100%', padding: '12px', marginBottom: '20px',
    backgroundColor: '#0f172a', border: '1px solid #334155',
    color: 'white', borderRadius: '8px', boxSizing: 'border-box'
  },
  button: {
    width: '100%', padding: '12px', backgroundColor: '#3b82f6',
    color: 'white', fontWeight: 'bold', border: 'none',
    borderRadius: '8px', cursor: 'pointer', marginTop: '10px'
  },
  errorBanner: {
    color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: '10px', borderRadius: '6px', marginBottom: '20px',
    textAlign: 'center', fontSize: '0.9rem',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    lineHeight: '1.4'
  },
  footerText: { marginTop: '24px', textAlign: 'center', color: '#94a3b8' },
  link: { color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }
};

export default LoginPage;
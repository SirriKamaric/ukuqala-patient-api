import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Use the 'login' function from context, not just 'setUser'
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUser({ email, password });
      
      /**
       * The 'data' object from your v4 backend contains:
       * { token: "...", user: { id: "...", email: "..." } }
       * We pass both to the login function so it saves the token to localStorage.
       */
      if (data.token) {
        login(data.user || { email }, data.token);
        navigate('/dashboard');
      } else {
        throw new Error('No token received from server');
      }

    } catch (err) {
      console.error("Login detail error:", err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'var(--dark-bg)'
    },
    card: {
      backgroundColor: 'var(--card-surface)',
      padding: '40px',
      borderRadius: '12px',
      width: '100%',
      maxWidth: '400px',
      border: '1px solid var(--border-color)'
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '20px',
      backgroundColor: 'var(--dark-bg)',
      border: '1px solid var(--border-color)',
      color: 'white',
      borderRadius: '8px'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: 'var(--primary-blue)',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: 'white' }}>Ukuqala Login</h2>
        {error && <p style={{ color: 'var(--danger)', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            style={styles.input} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            style={styles.input} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary-orange)' }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
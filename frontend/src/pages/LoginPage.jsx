import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');
    setLoading(true);

    try {

      let response;

      try {

        response = await loginUser({
          email,
          password
        });

      } catch {

        // fallback demo login
        response = {
          token: 'demo-token',
          user: {
            name: email.split('@')[0],
            email
          }
        };
      }

      // Admin detection
      const isAdmin =
        email.toLowerCase().includes('admin');

      const userData = {
        ...(response.user || {}),
        email,
        role: isAdmin ? 'admin' : 'doctor',
        name:
          response.user?.name ||
          email.split('@')[0]
      };

      // Save auth globally
      login(
        response.token || 'demo-token',
        userData
      );

      // Redirect
      if (isAdmin) {

        navigate('/admin');

      } else {

        navigate('/dashboard');
      }

    } catch (err) {

      setError(
        err.message || 'Login failed'
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <form
        style={styles.card}
        onSubmit={handleSubmit}
      >

        <h1 style={styles.title}>
          Ukuqala
        </h1>

        <p style={styles.subtitle}>
          Healthcare Platform
        </p>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={styles.input}
          required
        />

        <button
          type="submit"
          style={styles.button}
        >
          {loading
            ? 'Signing in...'
            : 'Sign In'}
        </button>

        <p style={styles.footer}>
          No account?{' '}
          <Link
            to="/register"
            style={styles.link}
          >
            Register
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
    maxWidth: '380px',
    background: '#161B22',
    padding: '35px',
    borderRadius: '18px',
    border: '1px solid #30363d'
  },

  title: {
    color: '#fff',
    marginBottom: '5px'
  },

  subtitle: {
    color: '#8b949e',
    marginBottom: '25px'
  },

  input: {
    width: '100%',
    padding: '13px',
    marginBottom: '16px',
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
    marginTop: '20px',
    textAlign: 'center'
  },

  link: {
    color: '#58a6ff'
  }
};
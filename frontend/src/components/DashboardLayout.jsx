import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const styles = {
    wrapper: { display: 'flex', height: '100vh', width: '100vw' },
    sidebar: {
      width: '220px',
      backgroundColor: 'var(--primary-blue)', // The #1A73E8 blue
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      color: 'white'
    },
    main: { 
      flex: 1, 
      backgroundColor: 'var(--dark-bg)', // The #0D1117 dark background
      padding: '40px', 
      overflowY: 'auto',
      color: 'var(--text-primary)'
    },
    navLink: { 
      color: 'white', 
      textDecoration: 'none', 
      display: 'block', 
      margin: '15px 0', 
      fontWeight: '500'
    },
    logoutBtn: { 
      backgroundColor: 'transparent', 
      border: '1px solid white', 
      color: 'white', 
      marginTop: 'auto',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.wrapper}>
      <nav style={styles.sidebar}>
        <h2 style={{ marginBottom: '40px' }}>UKUQALA</h2>
        <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
        <Link to="/patients" style={styles.navLink}>Patients</Link>
        
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </nav>

      <main style={styles.main}>
        <header style={{ marginBottom: '30px' }}>
          <h1>Welcome, {user?.name || 'Practitioner'}</h1>
        </header>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
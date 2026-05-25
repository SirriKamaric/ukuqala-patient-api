import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function DashboardLayout({
  children
}) {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();
    navigate('/login');
  };

  return (

    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#0D1117'
      }}
    >

      {/* Sidebar */}

      <aside
        style={{
          width: '240px',
          background: '#161B22',
          borderRight: '1px solid #30363d',
          padding: '24px',
          color: '#fff'
        }}
      >

        <h2
          style={{
            marginBottom: '40px'
          }}
        >
          UKUQALA
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
        >

          <Link
            to="/dashboard"
            style={linkStyle}
          >
            Dashboard
          </Link>

          <Link
            to="/patients"
            style={linkStyle}
          >
            Patients
          </Link>

          <Link
            to="/admin"
            style={linkStyle}
          >
            Admin Panel
          </Link>

        </div>

        <button
          onClick={handleLogout}
          style={{
            marginTop: '40px',
            width: '100%',
            padding: '12px',
            background: '#1f6feb',
            border: 'none',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>

      </aside>

      {/* Main */}

      <main
        style={{
          flex: 1,
          padding: '32px',
          color: '#fff',
          overflowY: 'auto'
        }}
      >

        <div
          style={{
            marginBottom: '30px'
          }}
        >

          <h1>
            Welcome, {
              user?.name ||
              'User'
            }
          </h1>

        </div>

        {children}

      </main>

    </div>
  );
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '16px'
};
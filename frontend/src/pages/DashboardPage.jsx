import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import apiClient from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPatients: 0,
    latestVitals: 0,
    recentPatients: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Requirement 4.2: Fetch data from GET /api/patients
        const response = await apiClient.get('/patients');
        const patients = response.data;
        
        setStats({
          totalPatients: patients.length,
          // Requirement 4.2: Last 5 entries for the recent list
          recentPatients: patients.slice(-5).reverse(), 
          latestVitals: patients.filter(p => p.hasVitals).length // Example derived stat
        });
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <DashboardLayout><div>Loading Dashboard...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      {/* Requirement 4.2: Welcome message with logged-in user's name */}
      <h2 style={{ marginBottom: '20px' }}>Welcome back, {user?.name || 'Practitioner'}</h2>

      {/* Quick Stats Cards */}
      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <h3>Total Patients</h3>
          <p style={statNumberStyle}>{stats.totalPatients}</p>
        </div>
        <div style={statCardStyle}>
          <h3>Active Cases</h3>
          <p style={statNumberStyle}>{stats.totalPatients > 0 ? 'Live' : 'None'}</p>
        </div>
        <div style={statCardStyle}>
          <h3>System Status</h3>
          <p style={{ ...statNumberStyle, color: '#4caf50' }}>Online</p>
        </div>
      </div>

      {/* Requirement 4.2: Recent Patients List */}
      <div style={{ marginTop: '30px', ...cardStyle }}>
        <h3>Recent Patient Entries</h3>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
          {stats.recentPatients.length > 0 ? stats.recentPatients.map(p => (
            <li key={p.id} style={listItemStyle} onClick={() => navigate(`/patients/${p.id}`)}>
              <span><strong>{p.name}</strong></span>
              <span style={{ color: '#888' }}>{p.condition || 'General Checkup'}</span>
              <span style={{ color: 'var(--primary-blue)' }}>View Details →</span>
            </li>
          )) : <p>No recent patients found.</p>}
        </ul>
      </div>
    </DashboardLayout>
  );
};

// Styles for Requirement 4.2
const statsGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' };
const statCardStyle = { background: 'var(--card-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center' };
const statNumberStyle = { fontSize: '32px', fontWeight: 'bold', margin: '10px 0', color: 'var(--primary-blue)' };
const cardStyle = { background: 'var(--card-surface)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' };
const listItemStyle = { display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #333', cursor: 'pointer', transition: 'background 0.2s' };

export default DashboardPage;
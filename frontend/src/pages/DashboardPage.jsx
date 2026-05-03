import DashboardLayout from '../components/DashboardLayout';

const DashboardPage = () => {
  // Mock stats for the Ukuqala interface
  const stats = [
    { label: 'Total Patients', value: '12', color: 'var(--primary-blue)' },
    { label: 'Pending Vitals', value: '5', color: 'var(--primary-orange)' },
    { label: 'Urgent Alerts', value: '2', color: 'var(--danger)' },
  ];

  return (
    <DashboardLayout>
      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px' 
      }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ 
            backgroundColor: 'var(--card-surface)', 
            padding: '20px', 
            borderRadius: '12px', 
            borderLeft: `5px solid ${stat.color}`,
            borderBottom: '1px solid var(--border-color)'
          }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
              {stat.label}
            </p>
            <h2 style={{ fontSize: '2rem', marginTop: '10px' }}>{stat.value}</h2>
          </div>
        ))}
      </div>
      
      {/* Recent Activity Section */}
      <div style={{ 
        marginTop: '40px', 
        backgroundColor: 'var(--card-surface)', 
        padding: '30px', 
        borderRadius: '12px',
        border: '1px solid var(--border-color)' 
      }}>
        <h3>Recent Activity</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '15px' }}>
          No recent patient updates found in the system.
        </p>
      </div>
    </DashboardLayout>
  );
};

// This line is CRITICAL to fix that SyntaxError you saw earlier
export default DashboardPage;
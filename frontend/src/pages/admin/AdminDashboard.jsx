export default function AdminDashboard() {

  const stats = [
    {
      title: 'Total Doctors',
      value: '24'
    },
    {
      title: 'Total Patients',
      value: '142'
    },
    {
      title: 'Pending Approvals',
      value: '5'
    },
    {
      title: 'Open Tickets',
      value: '12'
    }
  ];

  return (
    <div>

      {/* PAGE HEADER */}
      <div style={{ marginBottom: '30px' }}>

        <h1
          style={{
            color: '#fff',
            margin: 0
          }}
        >
          Admin Dashboard
        </h1>

        <p
          style={{
            color: '#8b949e',
            marginTop: '10px'
          }}
        >
          Monitor and manage the healthcare system
        </p>

      </div>

      {/* KPI CARDS */}
      <div style={statsGrid}>

        {stats.map(stat => (

          <div
            key={stat.title}
            style={cardStyle}
          >

            <p style={cardTitle}>
              {stat.title}
            </p>

            <h2 style={cardValue}>
              {stat.value}
            </h2>

          </div>

        ))}

      </div>

      {/* RECENT ACTIVITY */}
      <div style={sectionStyle}>

        <h2 style={sectionTitle}>
          Recent Activity
        </h2>

        <div style={activityList}>

          <div style={activityItem}>
            Doctor John applied for verification
          </div>

          <div style={activityItem}>
            Patient Sarah booked an appointment
          </div>

          <div style={activityItem}>
            New support ticket submitted
          </div>

          <div style={activityItem}>
            Doctor Emily uploaded license
          </div>

        </div>

      </div>

      {/* SYSTEM STATUS */}
      <div style={sectionStyle}>

        <h2 style={sectionTitle}>
          System Status
        </h2>

        <div style={statusBox}>

          <div style={statusRow}>
            <span>Backend API</span>
            <span style={{ color: '#3fb950' }}>
              Online
            </span>
          </div>

          <div style={statusRow}>
            <span>Database</span>
            <span style={{ color: '#3fb950' }}>
              Connected
            </span>
          </div>

          <div style={statusRow}>
            <span>Appointments Service</span>
            <span style={{ color: '#3fb950' }}>
              Active
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

/* STYLES */

const statsGrid = {
  display: 'grid',
  gridTemplateColumns:
    'repeat(auto-fit,minmax(220px,1fr))',
  gap: '20px',
  marginBottom: '30px'
};

const cardStyle = {
  background: '#161B22',
  border: '1px solid #30363d',
  borderRadius: '18px',
  padding: '24px'
};

const cardTitle = {
  color: '#8b949e',
  marginBottom: '12px',
  fontSize: '15px'
};

const cardValue = {
  color: '#fff',
  margin: 0,
  fontSize: '34px'
};

const sectionStyle = {
  background: '#161B22',
  border: '1px solid #30363d',
  borderRadius: '18px',
  padding: '24px',
  marginBottom: '24px'
};

const sectionTitle = {
  color: '#fff',
  marginTop: 0,
  marginBottom: '20px'
};

const activityList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px'
};

const activityItem = {
  background: '#0D1117',
  padding: '14px',
  borderRadius: '10px',
  color: '#c9d1d9'
};

const statusBox = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px'
};

const statusRow = {
  display: 'flex',
  justifyContent: 'space-between',
  color: '#c9d1d9'
};
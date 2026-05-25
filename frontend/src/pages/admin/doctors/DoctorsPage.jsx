import { useNavigate } from 'react-router-dom';

export default function DoctorsPage() {
  const navigate = useNavigate();

  const doctors = [
    {
      id: 1,
      name: 'Dr John Doe',
      specialty: 'Cardiologist',
      email: 'john@example.com',
      status: 'APPROVED',
      verified: true
    },
    {
      id: 2,
      name: 'Dr Sarah Smith',
      specialty: 'Neurologist',
      email: 'sarah@example.com',
      status: 'PENDING',
      verified: false
    },
    {
      id: 3,
      name: 'Dr Emily Brown',
      specialty: 'Pediatrician',
      email: 'emily@example.com',
      status: 'BLOCKED',
      verified: true
    }
  ];

  return (
    <div>

      {/* PAGE HEADER */}
      <div style={headerStyle}>

        <div>
          <h1 style={titleStyle}>Doctors</h1>
          <p style={subtitleStyle}>Manage doctors and approvals</p>
        </div>

        <input
          placeholder="Search doctors..."
          style={searchInput}
        />

      </div>

      {/* TABLE */}
      <div style={tableContainer}>

        <table style={tableStyle}>

          <thead>
            <tr>
              <th style={thStyle}>Doctor</th>
              <th style={thStyle}>Specialty</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Verification</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>

            {doctors.map(doc => (
              <tr key={doc.id} style={rowStyle}>

                <td style={tdStyle}>{doc.name}</td>
                <td style={tdStyle}>{doc.specialty}</td>
                <td style={tdStyle}>{doc.email}</td>

                <td style={tdStyle}>
                  <span
                    style={{
                      ...badgeStyle,
                      background: doc.verified ? '#16351f' : '#3b2f12',
                      color: doc.verified ? '#3fb950' : '#d29922'
                    }}
                  >
                    {doc.verified ? 'Verified' : 'Pending'}
                  </span>
                </td>

                <td style={tdStyle}>
                  <span
                    style={{
                      ...badgeStyle,
                      background:
                        doc.status === 'APPROVED'
                          ? '#16351f'
                          : doc.status === 'BLOCKED'
                          ? '#3a1515'
                          : '#3b2f12',

                      color:
                        doc.status === 'APPROVED'
                          ? '#3fb950'
                          : doc.status === 'BLOCKED'
                          ? '#ff7b72'
                          : '#d29922'
                    }}
                  >
                    {doc.status}
                  </span>
                </td>

                <td style={tdStyle}>
                  <div style={actionContainer}>

                    {/* ✅ FIXED HERE */}
                    <button
                      onClick={() =>
                        navigate(`/admin/doctors/${doc.id}/documents`)
                      }
                      style={viewBtn}
                    >
                      View Documents
                    </button>

                    <button style={approveBtn}>Approve</button>
                    <button style={blockBtn}>Block</button>

                  </div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

/* STYLES */

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
  gap: '20px',
  flexWrap: 'wrap'
};

const titleStyle = {
  color: '#fff',
  margin: 0
};

const subtitleStyle = {
  color: '#8b949e',
  marginTop: '8px'
};

const searchInput = {
  background: '#161B22',
  border: '1px solid #30363d',
  color: '#fff',
  padding: '12px 16px',
  borderRadius: '12px',
  minWidth: '260px'
};

const tableContainer = {
  background: '#161B22',
  border: '1px solid #30363d',
  borderRadius: '18px',
  overflow: 'hidden'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};

const thStyle = {
  textAlign: 'left',
  padding: '18px',
  color: '#8b949e',
  borderBottom: '1px solid #30363d',
  fontSize: '14px'
};

const tdStyle = {
  padding: '18px',
  color: '#fff',
  borderBottom: '1px solid #222'
};

const rowStyle = {
  background: '#161B22'
};

const badgeStyle = {
  padding: '6px 12px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: '600'
};

const actionContainer = {
  display: 'flex',
  gap: '10px'
};

const viewBtn = {
  background: '#1f6feb',
  border: 'none',
  color: '#fff',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer'
};

const approveBtn = {
  background: '#238636',
  border: 'none',
  color: '#fff',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer'
};

const blockBtn = {
  background: '#da3633',
  border: 'none',
  color: '#fff',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer'
};
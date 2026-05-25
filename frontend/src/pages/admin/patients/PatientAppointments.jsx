import { useParams, useNavigate } from 'react-router-dom';

export default function PatientAppointments() {

  const { id } = useParams();
  const navigate = useNavigate();

  const appointments = [
    {
      id: 1,
      doctor: 'Dr Sarah Johnson',
      date: '2026-06-01',
      time: '10:00 AM',
      status: 'Completed'
    },
    {
      id: 2,
      doctor: 'Dr John Doe',
      date: '2026-06-03',
      time: '01:30 PM',
      status: 'Pending'
    }
  ];

  return (
    <div>

      {/* HEADER */}
      <div style={headerStyle}>

        <button
          style={backBtn}
          onClick={() =>
            navigate(`/admin/patients/${id}`)
          }
        >
          ← Back
        </button>

        <div>

          <h1 style={titleStyle}>
            Patient Appointments
          </h1>

          <p style={subtitleStyle}>
            View all appointments
          </p>

        </div>

      </div>

      {/* TABLE */}
      <div style={tableContainer}>

        <table style={tableStyle}>

          <thead>

            <tr>

              <th style={thStyle}>Doctor</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Time</th>
              <th style={thStyle}>Status</th>

            </tr>

          </thead>

          <tbody>

            {appointments.map(appt => (

              <tr key={appt.id}>

                <td style={tdStyle}>
                  {appt.doctor}
                </td>

                <td style={tdStyle}>
                  {appt.date}
                </td>

                <td style={tdStyle}>
                  {appt.time}
                </td>

                <td style={tdStyle}>

                  <span
                    style={{
                      ...statusBadge,

                      background:
                        appt.status === 'Completed'
                          ? '#16351f'
                          : '#3b2f12',

                      color:
                        appt.status === 'Completed'
                          ? '#3fb950'
                          : '#d29922'
                    }}
                  >
                    {appt.status}
                  </span>

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
  alignItems: 'center',
  gap: '20px',
  marginBottom: '30px',
  flexWrap: 'wrap'
};

const backBtn = {
  background: '#21262d',
  border: '1px solid #30363d',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: '10px',
  cursor: 'pointer'
};

const titleStyle = {
  color: '#fff',
  margin: 0
};

const subtitleStyle = {
  color: '#8b949e',
  marginTop: '8px'
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
  borderBottom: '1px solid #30363d'
};

const tdStyle = {
  padding: '18px',
  color: '#fff',
  borderBottom: '1px solid #222'
};

const statusBadge = {
  padding: '6px 12px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: '600'
};
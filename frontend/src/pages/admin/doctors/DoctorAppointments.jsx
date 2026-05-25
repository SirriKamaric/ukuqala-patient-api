import { useNavigate, useParams } from 'react-router-dom';

export default function DoctorAppointments() {

  const navigate = useNavigate();
  const { id } = useParams();

  // TEMP MOCK DATA
  const doctor = {
    id,
    name: 'Dr Sarah Johnson',
    specialty: 'Cardiology'
  };

  const appointments = [
    {
      id: 1,
      patient: 'John Smith',
      date: '2026-05-26',
      time: '10:00 AM',
      status: 'CONFIRMED'
    },
    {
      id: 2,
      patient: 'Emily Brown',
      date: '2026-05-27',
      time: '2:30 PM',
      status: 'PENDING'
    },
    {
      id: 3,
      patient: 'David Wilson',
      date: '2026-05-28',
      time: '9:15 AM',
      status: 'COMPLETED'
    }
  ];

  return (

    <div>

      {/* HEADER */}
      <div style={headerStyle}>

        <div>

          <h1 style={titleStyle}>
            Doctor Appointments
          </h1>

          <p style={subtitleStyle}>
            {doctor.name} • {doctor.specialty}
          </p>

        </div>

        <button
          onClick={() =>
            navigate(`/admin/doctors/${id}`)
          }
          style={backBtn}
        >
          Back To Profile
        </button>

      </div>

      {/* STATS */}
      <div style={statsGrid}>

        <div style={statCard}>
          <h2 style={statNumber}>
            {appointments.length}
          </h2>

          <p style={statLabel}>
            Total Appointments
          </p>
        </div>

        <div style={statCard}>
          <h2 style={statNumber}>
            {
              appointments.filter(
                a => a.status === 'CONFIRMED'
              ).length
            }
          </h2>

          <p style={statLabel}>
            Confirmed
          </p>
        </div>

        <div style={statCard}>
          <h2 style={statNumber}>
            {
              appointments.filter(
                a => a.status === 'PENDING'
              ).length
            }
          </h2>

          <p style={statLabel}>
            Pending
          </p>
        </div>

        <div style={statCard}>
          <h2 style={statNumber}>
            {
              appointments.filter(
                a => a.status === 'COMPLETED'
              ).length
            }
          </h2>

          <p style={statLabel}>
            Completed
          </p>
        </div>

      </div>

      {/* FILTERS */}
      <div style={filterBar}>

        <input
          placeholder="Search patient..."
          style={inputStyle}
        />

        <select style={inputStyle}>

          <option>
            All Status
          </option>

          <option>
            CONFIRMED
          </option>

          <option>
            PENDING
          </option>

          <option>
            COMPLETED
          </option>

        </select>

      </div>

      {/* TABLE */}
      <div style={tableContainer}>

        <table style={tableStyle}>

          <thead>

            <tr>

              <th style={thStyle}>
                Patient
              </th>

              <th style={thStyle}>
                Date
              </th>

              <th style={thStyle}>
                Time
              </th>

              <th style={thStyle}>
                Status
              </th>

              <th style={thStyle}>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {appointments.map(appt => (

              <tr
                key={appt.id}
                style={rowStyle}
              >

                <td style={tdStyle}>
                  {appt.patient}
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
                      ...badgeStyle,

                      background:
                        appt.status === 'CONFIRMED'
                          ? '#16351f'
                          : appt.status === 'COMPLETED'
                          ? '#10243f'
                          : '#3b2f12',

                      color:
                        appt.status === 'CONFIRMED'
                          ? '#3fb950'
                          : appt.status === 'COMPLETED'
                          ? '#58a6ff'
                          : '#d29922'
                    }}
                  >
                    {appt.status}
                  </span>

                </td>

                <td style={tdStyle}>

                  <div style={actionContainer}>

                    <button style={viewBtn}>
                      View
                    </button>

                    <button style={cancelBtn}>
                      Cancel
                    </button>

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

/* ========================= */
/* STYLES */
/* ========================= */

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '28px',
  flexWrap: 'wrap',
  gap: '20px'
};

const titleStyle = {
  color: '#fff',
  margin: 0
};

const subtitleStyle = {
  color: '#8b949e',
  marginTop: '8px'
};

const backBtn = {
  background: '#21262d',
  border: '1px solid #30363d',
  color: '#fff',
  padding: '12px 18px',
  borderRadius: '10px',
  cursor: 'pointer'
};

const statsGrid = {
  display: 'grid',
  gridTemplateColumns:
    'repeat(auto-fit,minmax(220px,1fr))',
  gap: '18px',
  marginBottom: '28px'
};

const statCard = {
  background: '#161B22',
  border: '1px solid #30363d',
  borderRadius: '18px',
  padding: '24px'
};

const statNumber = {
  color: '#58a6ff',
  fontSize: '34px',
  margin: 0
};

const statLabel = {
  color: '#8b949e',
  marginTop: '10px'
};

const filterBar = {
  display: 'flex',
  gap: '16px',
  marginBottom: '24px',
  flexWrap: 'wrap'
};

const inputStyle = {
  background: '#161B22',
  border: '1px solid #30363d',
  color: '#fff',
  padding: '12px 16px',
  borderRadius: '12px',
  minWidth: '240px'
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

const cancelBtn = {
  background: '#da3633',
  border: 'none',
  color: '#fff',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer'
};
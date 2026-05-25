import { useParams, useNavigate } from 'react-router-dom';

export default function PatientProfile() {

  const { id } = useParams();
  const navigate = useNavigate();

  // TEMP MOCK DATA
  const patient = {
    id,
    name: 'John Smith',
    age: 28,
    gender: 'Male',
    bloodGroup: 'O+',
    height: '178 cm',
    weight: '74 kg',
    location: 'Yaounde, Cameroon',
    condition: 'Malaria',
    phone: '+237 670000000',
    emergencyContact: '+237 680000000',
    status: 'ACTIVE'
  };

  // TEMP APPOINTMENTS
  const appointments = [
    {
      id: 1,
      doctor: 'Dr John Doe',
      date: '2026-05-28',
      status: 'Completed'
    },
    {
      id: 2,
      doctor: 'Dr Sarah Smith',
      date: '2026-06-02',
      status: 'Pending'
    }
  ];

  return (
    <div>

      {/* TOP BAR */}
      <div style={topBar}>

        <button
          onClick={() =>
            navigate('/admin/patients')
          }
          style={backBtn}
        >
          ← Back
        </button>

      </div>

      {/* PROFILE CARD */}
      <div style={profileCard}>

        {/* HEADER */}
        <div style={headerSection}>

          <div style={avatar}>
            {patient.name.charAt(0)}
          </div>

          <div>

            <h1 style={nameStyle}>
              {patient.name}
            </h1>

            <p style={subtitleStyle}>
              Patient ID: #{patient.id}
            </p>

            <span style={statusBadge}>
              {patient.status}
            </span>

          </div>

        </div>

        {/* INFORMATION GRID */}
        <div style={infoGrid}>

          <div style={infoCard}>
            <p style={label}>Age</p>
            <h3 style={value}>
              {patient.age}
            </h3>
          </div>

          <div style={infoCard}>
            <p style={label}>Gender</p>
            <h3 style={value}>
              {patient.gender}
            </h3>
          </div>

          <div style={infoCard}>
            <p style={label}>Blood Group</p>
            <h3 style={value}>
              {patient.bloodGroup}
            </h3>
          </div>

          <div style={infoCard}>
            <p style={label}>Height</p>
            <h3 style={value}>
              {patient.height}
            </h3>
          </div>

          <div style={infoCard}>
            <p style={label}>Weight</p>
            <h3 style={value}>
              {patient.weight}
            </h3>
          </div>

          <div style={infoCard}>
            <p style={label}>Condition</p>
            <h3 style={value}>
              {patient.condition}
            </h3>
          </div>

          <div style={infoCard}>
            <p style={label}>Phone</p>
            <h3 style={value}>
              {patient.phone}
            </h3>
          </div>

          <div style={infoCard}>
            <p style={label}>Emergency Contact</p>
            <h3 style={value}>
              {patient.emergencyContact}
            </h3>
          </div>

          <div style={infoCard}>
            <p style={label}>Location</p>
            <h3 style={value}>
              {patient.location}
            </h3>
          </div>

        </div>

      </div>

      {/* APPOINTMENTS SECTION */}
      <div style={appointmentsSection}>

        <div style={sectionHeader}>

          <h2 style={sectionTitle}>
            Patient Appointments
          </h2>

          <button
            style={viewAllBtn}
            onClick={() =>
              navigate(`/admin/patients/${id}/appointments`)
            }
          >
            View All
          </button>

        </div>

        <div style={appointmentsGrid}>

          {appointments.map(appt => (

            <div
              key={appt.id}
              style={appointmentCard}
            >

              <p style={label}>
                Doctor
              </p>

              <h3 style={value}>
                {appt.doctor}
              </h3>

              <p style={label}>
                Date
              </p>

              <h3 style={value}>
                {appt.date}
              </h3>

              <span
                style={{
                  ...appointmentBadge,

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

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

/* STYLES */

const topBar = {
  marginBottom: '24px'
};

const backBtn = {
  background: '#21262d',
  border: '1px solid #30363d',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: '10px',
  cursor: 'pointer'
};

const profileCard = {
  background: '#161B22',
  border: '1px solid #30363d',
  borderRadius: '20px',
  padding: '30px'
};

const headerSection = {
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
  marginBottom: '30px',
  flexWrap: 'wrap'
};

const avatar = {
  width: '110px',
  height: '110px',
  borderRadius: '50%',
  background: '#1f6feb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '42px',
  fontWeight: '700'
};

const nameStyle = {
  color: '#fff',
  margin: 0
};

const subtitleStyle = {
  color: '#8b949e',
  marginTop: '8px'
};

const statusBadge = {
  display: 'inline-block',
  marginTop: '14px',
  background: '#16351f',
  color: '#3fb950',
  padding: '6px 14px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: '600'
};

const infoGrid = {
  display: 'grid',
  gridTemplateColumns:
    'repeat(auto-fit,minmax(220px,1fr))',
  gap: '18px'
};

const infoCard = {
  background: '#0D1117',
  border: '1px solid #30363d',
  borderRadius: '16px',
  padding: '20px'
};

const label = {
  color: '#8b949e',
  marginBottom: '10px',
  fontSize: '14px'
};

const value = {
  color: '#fff',
  margin: 0
};

const appointmentsSection = {
  marginTop: '30px',
  background: '#161B22',
  border: '1px solid #30363d',
  borderRadius: '20px',
  padding: '30px'
};

const sectionHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
  flexWrap: 'wrap',
  gap: '16px'
};

const sectionTitle = {
  color: '#fff',
  margin: 0
};

const viewAllBtn = {
  background: '#21262d',
  border: '1px solid #30363d',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: '10px',
  cursor: 'pointer'
};

const appointmentsGrid = {
  display: 'grid',
  gridTemplateColumns:
    'repeat(auto-fit,minmax(260px,1fr))',
  gap: '20px'
};

const appointmentCard = {
  background: '#0D1117',
  border: '1px solid #30363d',
  borderRadius: '16px',
  padding: '20px'
};

const appointmentBadge = {
  display: 'inline-block',
  marginTop: '16px',
  padding: '6px 14px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: '600'
};
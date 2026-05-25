import { useParams, useNavigate } from 'react-router-dom';

export default function DoctorProfile() {

  const { id } = useParams();
  const navigate = useNavigate();

  // TEMP MOCK DATA
  const doctor = {
    id,
    name: 'Dr John Doe',
    specialty: 'Cardiologist',
    email: 'john@example.com',
    phone: '+237 670000000',
    status: 'APPROVED',
    verified: true,
    experience: '8 Years',
    location: 'Yaounde, Cameroon',
    bio:
      'Experienced cardiologist specialized in heart disease management and patient care.'
  };

  return (
    <div>

      {/* TOP BAR */}
      <div style={topBar}>

        <button
          onClick={() => navigate('/admin/doctors')}
          style={backBtn}
        >
          ← Back
        </button>

      </div>

      {/* PROFILE CARD */}
      <div style={profileCard}>

        {/* PROFILE HEADER */}
        <div style={profileHeader}>

          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt={doctor.name}
            style={avatar}
          />

          <div style={{ flex: 1 }}>

            <h1 style={nameStyle}>
              {doctor.name}
            </h1>

            <p style={specialtyStyle}>
              {doctor.specialty}
            </p>

            <div style={badgeContainer}>

              <span
                style={{
                  ...badge,
                  background: '#16351f',
                  color: '#3fb950'
                }}
              >
                {doctor.status}
              </span>

              <span
                style={{
                  ...badge,
                  background: doctor.verified
                    ? '#16351f'
                    : '#3b2f12',

                  color: doctor.verified
                    ? '#3fb950'
                    : '#d29922'
                }}
              >
                {doctor.verified
                  ? 'Verified'
                  : 'Pending'}
              </span>

            </div>

          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div style={actionBar}>

          <button
            onClick={() =>
              navigate(
                `/admin/doctors/${id}/appointments`
              )
            }
            style={appointmentBtn}
          >
            View Appointments
          </button>

          <button style={approveBtn}>
            Approve Doctor
          </button>

          <button style={blockBtn}>
            Block Account
          </button>

        </div>

        {/* INFORMATION */}
        <div style={infoGrid}>

          <div style={infoCard}>
            <p style={label}>Email</p>
            <h3 style={value}>
              {doctor.email}
            </h3>
          </div>

          <div style={infoCard}>
            <p style={label}>Phone</p>
            <h3 style={value}>
              {doctor.phone}
            </h3>
          </div>

          <div style={infoCard}>
            <p style={label}>Experience</p>
            <h3 style={value}>
              {doctor.experience}
            </h3>
          </div>

          <div style={infoCard}>
            <p style={label}>Location</p>
            <h3 style={value}>
              {doctor.location}
            </h3>
          </div>

        </div>

        {/* BIO */}
        <div style={bioCard}>

          <h2 style={sectionTitle}>
            Biography
          </h2>

          <p style={bioText}>
            {doctor.bio}
          </p>

        </div>

      </div>

    </div>
  );
}

/* ========================= */
/* STYLES */
/* ========================= */

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

const profileHeader = {
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
  marginBottom: '30px',
  flexWrap: 'wrap'
};

const avatar = {
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '4px solid #1f6feb'
};

const nameStyle = {
  color: '#fff',
  margin: 0
};

const specialtyStyle = {
  color: '#8b949e',
  marginTop: '8px'
};

const badgeContainer = {
  display: 'flex',
  gap: '10px',
  marginTop: '14px',
  flexWrap: 'wrap'
};

const badge = {
  padding: '6px 14px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: '600'
};

const actionBar = {
  display: 'flex',
  gap: '14px',
  marginBottom: '30px',
  flexWrap: 'wrap'
};

const appointmentBtn = {
  background: '#1f6feb',
  border: 'none',
  color: '#fff',
  padding: '12px 18px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '600'
};

const approveBtn = {
  background: '#238636',
  border: 'none',
  color: '#fff',
  padding: '12px 18px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '600'
};

const blockBtn = {
  background: '#da3633',
  border: 'none',
  color: '#fff',
  padding: '12px 18px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '600'
};

const infoGrid = {
  display: 'grid',
  gridTemplateColumns:
    'repeat(auto-fit,minmax(220px,1fr))',
  gap: '18px',
  marginBottom: '30px'
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

const bioCard = {
  background: '#0D1117',
  border: '1px solid #30363d',
  borderRadius: '16px',
  padding: '24px'
};

const sectionTitle = {
  color: '#fff',
  marginTop: 0
};

const bioText = {
  color: '#c9d1d9',
  lineHeight: '1.8'
};
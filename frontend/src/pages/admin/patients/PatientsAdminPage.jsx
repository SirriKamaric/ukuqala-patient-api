import { useNavigate } from 'react-router-dom';

export default function PatientsAdminPage() {

  const navigate = useNavigate();

  // TEMP MOCK DATA
  const patients = [
    {
      id: 1,
      name: 'John Smith',
      age: 28,
      gender: 'Male',
      bloodGroup: 'O+',
      condition: 'Malaria'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      age: 34,
      gender: 'Female',
      bloodGroup: 'A+',
      condition: 'Diabetes'
    },
    {
      id: 3,
      name: 'Michael Brown',
      age: 19,
      gender: 'Male',
      bloodGroup: 'B+',
      condition: 'Asthma'
    }
  ];

  return (
    <div>

      {/* HEADER */}
      <div style={headerStyle}>

        <div>

          <h1 style={titleStyle}>
            Patients
          </h1>

          <p style={subtitleStyle}>
            Manage all registered patients
          </p>

        </div>

        <input
          placeholder="Search patients..."
          style={searchInput}
        />

      </div>

      {/* TABLE */}
      <div style={tableContainer}>

        <table style={tableStyle}>

          <thead>

            <tr>

              <th style={thStyle}>Patient</th>
              <th style={thStyle}>Age</th>
              <th style={thStyle}>Gender</th>
              <th style={thStyle}>Blood Group</th>
              <th style={thStyle}>Condition</th>
              <th style={thStyle}>Actions</th>

            </tr>

          </thead>

          <tbody>

            {patients.map(patient => (

              <tr
                key={patient.id}
                style={rowStyle}
              >

                <td style={tdStyle}>
                  {patient.name}
                </td>

                <td style={tdStyle}>
                  {patient.age}
                </td>

                <td style={tdStyle}>
                  {patient.gender}
                </td>

                <td style={tdStyle}>
                  {patient.bloodGroup}
                </td>

                <td style={tdStyle}>
                  {patient.condition}
                </td>

                <td style={tdStyle}>

                  <button
                    onClick={() =>
                      navigate(
                        `/admin/patients/${patient.id}`
                      )
                    }
                    style={viewBtn}
                  >
                    View Profile
                  </button>

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

const viewBtn = {
  background: '#1f6feb',
  border: 'none',
  color: '#fff',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer'
};
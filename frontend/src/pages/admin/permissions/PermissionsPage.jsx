import { useState } from 'react';

export default function PermissionsPage() {

  const [permissions, setPermissions] = useState([
    {
      id: 1,
      role: 'Admin',
      patients: true,
      appointments: true,
      tickets: true
    },
    {
      id: 2,
      role: 'Doctor',
      patients: true,
      appointments: true,
      tickets: false
    },
    {
      id: 3,
      role: 'Receptionist',
      patients: false,
      appointments: true,
      tickets: true
    }
  ]);

  const togglePermission = (id, field) => {

    setPermissions(
      permissions.map(permission =>
        permission.id === id
          ? {
              ...permission,
              [field]: !permission[field]
            }
          : permission
      )
    );
  };

  const getButtonStyle = (value) => ({
    ...permissionBtn,

    background: value
      ? '#16351f'
      : '#3a1515',

    color: value
      ? '#3fb950'
      : '#ff7b72',

    border: value
      ? '1px solid #3fb95033'
      : '1px solid #ff7b7233'
  });

  return (
    <div>

      {/* HEADER */}
      <div style={headerStyle}>

        <div>

          <h1 style={titleStyle}>
            Permissions
          </h1>

          <p style={subtitleStyle}>
            Manage staff access permissions
          </p>

        </div>

      </div>

      {/* TABLE */}
      <div style={tableContainer}>

        <table style={tableStyle}>

          <thead>

            <tr>

              <th style={thStyle}>Role</th>
              <th style={thStyle}>Patients</th>
              <th style={thStyle}>Appointments</th>
              <th style={thStyle}>Tickets</th>

            </tr>

          </thead>

          <tbody>

            {permissions.map(permission => (

              <tr key={permission.id}>

                <td style={tdStyle}>
                  {permission.role}
                </td>

                <td style={tdStyle}>

                  <button
                    style={getButtonStyle(
                      permission.patients
                    )}
                    onClick={() =>
                      togglePermission(
                        permission.id,
                        'patients'
                      )
                    }
                  >
                    {permission.patients
                      ? 'Allowed'
                      : 'Denied'}
                  </button>

                </td>

                <td style={tdStyle}>

                  <button
                    style={getButtonStyle(
                      permission.appointments
                    )}
                    onClick={() =>
                      togglePermission(
                        permission.id,
                        'appointments'
                      )
                    }
                  >
                    {permission.appointments
                      ? 'Allowed'
                      : 'Denied'}
                  </button>

                </td>

                <td style={tdStyle}>

                  <button
                    style={getButtonStyle(
                      permission.tickets
                    )}
                    onClick={() =>
                      togglePermission(
                        permission.id,
                        'tickets'
                      )
                    }
                  >
                    {permission.tickets
                      ? 'Allowed'
                      : 'Denied'}
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
  marginBottom: '30px'
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

const permissionBtn = {
  border: 'none',
  padding: '8px 14px',
  borderRadius: '999px',
  cursor: 'pointer',
  fontWeight: '600',
  minWidth: '90px'
};
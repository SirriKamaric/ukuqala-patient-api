import { Outlet, NavLink } from 'react-router-dom';

export default function AdminLayout() {

  return (
    <div style={layoutStyle}>

      {/* SIDEBAR */}
      <aside style={sidebarStyle}>

        <h2 style={logoStyle}>
          Admin Panel
        </h2>

        <nav style={navStyle}>

          <NavLink
            to="/admin"
            style={linkStyle}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/doctors"
            style={linkStyle}
          >
            Doctors
          </NavLink>

          <NavLink
            to="/admin/patients"
            style={linkStyle}
          >
            Patients
          </NavLink>

          <NavLink
            to="/admin/appointments"
            style={linkStyle}
          >
            Appointments
          </NavLink>

          <NavLink
            to="/admin/tickets"
            style={linkStyle}
          >
            Tickets
          </NavLink>

          <NavLink
            to="/admin/permissions"
            style={linkStyle}
          >
            Permissions
          </NavLink>

          <NavLink
            to="/admin/documents"
            style={linkStyle}
          >
            Documents
          </NavLink>

        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main style={contentStyle}>

        {/* THIS RENDERS NESTED ROUTES */}
        <Outlet />

      </main>

    </div>
  );
}

/* STYLES */

const layoutStyle = {
  display: 'flex',
  minHeight: '100vh',
  background: '#0d1117'
};

const sidebarStyle = {
  width: '250px',
  background: '#161b22',
  borderRight: '1px solid #30363d',
  padding: '24px'
};

const logoStyle = {
  color: '#fff',
  marginBottom: '30px'
};

const navStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
};

const linkStyle = {
  color: '#c9d1d9',
  textDecoration: 'none',
  padding: '10px 14px',
  borderRadius: '10px',
  background: '#21262d'
};

const contentStyle = {
  flex: 1,
  padding: '30px'
};
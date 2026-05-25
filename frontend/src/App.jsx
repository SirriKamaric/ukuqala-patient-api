import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

/* AUTH */
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

/* MAIN SYSTEM */
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';

/* PATIENT PAGES */
import AddPatientPage from './pages/AddPatientPage';
import PatientDetailPage from './pages/PatientDetailPage';
import EditPatientPage from './pages/EditPatientPage';

/* ADMIN */
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';

/* DOCTORS */
import DoctorsPage from './pages/admin/doctors/DoctorsPage';
import DoctorProfile from './pages/admin/doctors/DoctorProfile';
import DoctorAppointments from './pages/admin/doctors/DoctorAppointments';
import DoctorTickets from './pages/admin/doctors/DoctorTickets';
import DoctorDocuments from "./pages/admin/documents/DoctorDocuments";

/* PATIENTS (ADMIN) */
import PatientsAdminPage from './pages/admin/patients/PatientsAdminPage';
import PatientProfile from './pages/admin/patients/PatientProfile';
import PatientAppointments from './pages/admin/patients/PatientAppointments';
import PatientTickets from './pages/admin/patients/PatientTickets';

/* APPOINTMENTS */
import AppointmentsPage from './pages/admin/appointments/AppointmentsPage';
import AppointmentDetails from './pages/admin/appointments/AppointmentDetails';

/* TICKETS */
import TicketsPage from './pages/admin/tickets/TicketsPage';
import TicketDetails from './pages/admin/tickets/TicketDetails';

/* PERMISSIONS */
import PermissionsPage from './pages/admin/permissions/PermissionsPage';

/* DOCUMENTS */
import DocumentsPage from './pages/admin/documents/DocumentsPage';

export default function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* ROOT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* AUTH */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* PATIENT SYSTEM */}
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/patients/new" element={<AddPatientPage />} />
        <Route path="/patients/:id" element={<PatientDetailPage />} />
        <Route path="/patients/:id/edit" element={<EditPatientPage />} />

        {/* ADMIN PANEL */}
        <Route path="/admin/*" element={<AdminLayout />}>

          <Route index element={<AdminDashboard />} />

          {/* DOCTORS */}
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="doctors/:id" element={<DoctorProfile />} />
          <Route path="doctors/:id/appointments" element={<DoctorAppointments />} />
          <Route path="doctors/:id/tickets" element={<DoctorTickets />} />
          <Route path="doctors/:id/documents" element={<DoctorDocuments />} />

          {/* PATIENTS */}
          <Route path="patients" element={<PatientsAdminPage />} />
          <Route path="patients/:id" element={<PatientProfile />} />
          <Route path="patients/:id/appointments" element={<PatientAppointments />} />
          <Route path="patients/:id/tickets" element={<PatientTickets />} />

          {/* APPOINTMENTS */}
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="appointments/:id" element={<AppointmentDetails />} />

          {/* TICKETS */}
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="tickets/:id" element={<TicketDetails />} />

          {/* PERMISSIONS */}
          <Route path="permissions" element={<PermissionsPage />} />

          {/* DOCUMENTS */}
          <Route path="documents" element={<DocumentsPage />} />

        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </AuthProvider>
  );
}
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import AddPatientPage from './pages/AddPatientPage';
import EditPatientPage from './pages/EditPatientPage';
import PatientDetailPage from './pages/PatientDetailPage';
import Vitals from './components/Vitals';
import AdminPanel from './pages/AdminPanel';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Core Dashboard View */}
          <Route path="/dashboard" element={
            <PrivateRoute><DashboardPage /></PrivateRoute>
          } />
          
          {/* Patient Directory & Management Sub-modules */}
          <Route path="/patients" element={
            <PrivateRoute><PatientsPage /></PrivateRoute>
          } />
          <Route path="/add-patient" element={
            <PrivateRoute><AddPatientPage /></PrivateRoute>
          } />
          <Route path="/edit-patient/:id" element={
            <PrivateRoute><EditPatientPage /></PrivateRoute>
          } />
          <Route path="/patients/:id" element={
            <PrivateRoute><PatientDetailPage /></PrivateRoute>
          } />
          <Route path="/patients/:id/vitals" element={
            <PrivateRoute><Vitals /></PrivateRoute>
          } />
          
          {/* Secured System Administration Panel */}
          <Route path="/admin" element={
            <PrivateRoute><AdminPanel /></PrivateRoute>
          } />
          
          {/* Global Fallback Route Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
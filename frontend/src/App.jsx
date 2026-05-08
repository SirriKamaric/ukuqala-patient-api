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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={
            <PrivateRoute><DashboardPage /></PrivateRoute>
          } />
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
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import your pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import AddPatientPage from './pages/AddPatientPage';
import EditPatientPage from './pages/EditPatientPage';
import PatientDetailPage from './pages/PatientDetailPage'; // FIXED: Added this import

// Requirement 4.1: Route Protection Component
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes - Requirement 4.1 */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/patients" 
            element={
              <PrivateRoute>
                <PatientsPage />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/add-patient" 
            element={
              <PrivateRoute>
                <AddPatientPage />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/edit-patient/:id" 
            element={
              <PrivateRoute>
                <EditPatientPage />
              </PrivateRoute>
            } 
          />

          {/* Requirement 4.3: Patient Detail Route */}
          <Route 
            path="/patients/:id" 
            element={
              <PrivateRoute>
                <PatientDetailPage />
              </PrivateRoute>
            } 
          />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
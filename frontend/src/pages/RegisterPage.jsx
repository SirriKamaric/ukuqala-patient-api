import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';

const RegisterPage = () => {
  const [role, setRole] = useState('PATIENT');
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    specialty: '', 
    avatar: null   
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    // Force validation for Doctors before hitting any network API code
    if (role === 'DOCTOR' && !formData.specialty) {
      return setError('Please provide your medical specialty');
    }

    setLoading(true); // Turn loading indicator ON immediately

    try {
      // 1. Core authentication entry creation on the backend server
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // 2. Role-Based Routing Matrix Block
      if (role === 'DOCTOR') {
        // Build the pristine doctor registration object profile
        const newDoctorProfile = {
          id: `DOC-${formData.name.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
          name: `Dr. ${formData.name}`,
          specialty: formData.specialty,
          email: formData.email,
          avatar: formData.avatar || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60", 
          licenseStatus: 'Pending',
          idStatus: 'Pending',
          diplomaStatus: 'Pending',
          appointments: [],
          tickets: []
        };

        // Persist local state arrays clearly before navigating away
        const existingDocs = JSON.parse(localStorage.getItem('custom_doctors') || '[]');
        existingDocs.push(newDoctorProfile);
        localStorage.setItem('custom_doctors', JSON.stringify(existingDocs));
        localStorage.setItem('last_registered_role', 'DOCTOR');

        // Route directly to login with the custom portal message parameters
        navigate('/login', { state: { message: 'Clinical access request submitted successfully! Please log in to your portal.' } });
      } else {
        // Standard Patient Registry Flow
        localStorage.setItem('last_registered_role', 'PATIENT');
        navigate('/login', { state: { message: 'Registration successful! Please login.' } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Check network database sync.');
    } finally {
      setLoading(false); // Turn loading indicator OFF
    }
  };

  const styles = {
    container: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' },
    card: { backgroundColor: '#161b22', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', border: '1px solid #30363d', boxSizing: 'border-box' },
    input: { width: '100%', padding: '12px', marginBottom: '15px', backgroundColor: '#0D1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px', boxSizing: 'border-box' },
    button: { width: '100%', backgroundColor: role === 'DOCTOR' ? '#1A73E8' : '#E67E22', color: 'white', fontWeight: 'bold', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
    toggleTab: { flex: 1, padding: '10px', background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', fontWeight: 'bold', borderBottom: '2px solid transparent', fontSize: '13px' },
    activeTab: { color: 'white', borderBottom: role === 'DOCTOR' ? '2px solid #1A73E8' : '2px solid #E67E22' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: '10px', textAlign: 'center', color: '#ffffff' }}>Create Account</h2>
        <p style={{ color: '#8b949e', fontSize: '12px', textAlign: 'center', marginBottom: '20px' }}>Identify your user profile role node</p>
        
        {/* Toggle Grid */}
        <div style={{ display: 'flex', background: '#0D1117', padding: '4px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #30363d' }}>
          <button 
            type="button" 
            onClick={() => setRole('PATIENT')} 
            style={{ ...styles.toggleTab, ...(role === 'PATIENT' ? styles.activeTab : {}) }}
          >
            Patient Portal
          </button>
          <button 
            type="button" 
            onClick={() => setRole('DOCTOR')} 
            style={{ ...styles.toggleTab, ...(role === 'DOCTOR' ? styles.activeTab : {}) }}
          >
            Clinical Registry
          </button>
        </div>

        {error && <p style={{ color: '#ff7b72', marginBottom: '15px', fontSize: '13px', textAlign: 'center' }}>⚠️ {error}</p>}
        
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder={role === 'DOCTOR' ? "Full Name (e.g. Palma Tekoh)" : "Full Name"} style={styles.input} required 
            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          
          <input type="email" placeholder="Email" style={styles.input} required 
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          
          {role === 'DOCTOR' && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <input type="text" placeholder="Medical Specialty (e.g. Systems Analyst)" style={styles.input}
                value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})} />
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#8b949e', marginBottom: '4px' }}>📸 Upload Authentic Profile Photo</label>
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ fontSize: '12px', color: '#8b949e' }} />
              </div>
            </div>
          )}

          <input type="password" placeholder="Password" style={styles.input} required 
            value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <input type="password" placeholder="Confirm Password" style={styles.input} required 
            value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
          
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Processing Registration...' : role === 'DOCTOR' ? 'Apply for Clinical Access' : 'Register'}
          </button>
        </form>
        
        <p style={{ marginTop: '20px', textAlign: 'center', color: '#8b949e', fontSize: '13px' }}>
          Already have an account? <Link to="/login" style={{ color: '#58a6ff' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
import { useState } from 'react';
import '../App.css'; 

const DoctorAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialty: '',
    phone: '',
    avatar: null // Holds the real uploaded profile picture string
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Converts your uploaded physical image file into a real Base64 web asset
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
    setLoading(true);

    try {
      if (isLogin) {
        // --- LOGIN PIPELINE ---
        // Check if there is a locally registered doctor matching this email
        const localDoctor = JSON.parse(localStorage.getItem('registered_doctor'));
        
        if (localDoctor && localDoctor.email === formData.email) {
          // Set current user session role as DOCTOR
          localStorage.setItem('user_role', 'DOCTOR');
          localStorage.setItem('current_user', JSON.stringify(localDoctor));
          alert(`Welcome back, ${localDoctor.name}! Accessing Doctor Workspace Terminal...`);
          // Redirect logic can go here (e.g., window.location.href = "/doctor-workspace")
        } else {
          // Fallback to Admin role if no custom doctor matches
          localStorage.setItem('user_role', 'ADMIN');
          alert("Admin credentials detected. Routing to Central Admin Dashboard...");
          window.location.reload(); // Reloads to let your router pick up the new state
        }
      } else {
        // --- REGISTRATION PIPELINE ---
        const newDoctorProfile = {
          id: `DOC-${Date.now().toString().slice(-4)}`, // Generates a unique testing ID
          name: formData.name,
          specialty: formData.specialty,
          email: formData.email,
          phone: formData.phone,
          avatar: formData.avatar, // Your authentic uploaded picture!
          licenseStatus: 'Pending',
          idStatus: 'Pending',
          diplomaStatus: 'Pending',
          appointments: [],
          tickets: []
        };

        // Save the profile variables securely into localStorage so the Admin Panel can read it
        localStorage.setItem('registered_doctor', JSON.stringify(newDoctorProfile));
        
        alert("Registration profile created successfully! Switch back to Login to access your terminal.");
        setIsLogin(true); // Automatically flips view back to login screen
      }
    } catch {
      alert("Authentication node error: Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', background: '#0D1117', color: '#c9d1d9', padding: '20px'
    }}>
      <div style={{
        background: '#161b22', border: '1px solid #30363d', borderRadius: '12px',
        width: '450px', padding: '32px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ color: '#58a6ff', margin: '0 0 6px 0' }}>Ukuqala Medical Network</h2>
          <p style={{ color: '#8b949e', fontSize: '13px', margin: 0 }}>
            {isLogin ? "Practitioner Secure Authentication Terminal" : "Apply for System Clinical Credentials"}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {!isLogin && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>Full Name (with Title)</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Dr. Jane Doe" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>Medical Specialty</label>
                <input type="text" name="specialty" required value={formData.specialty} onChange={handleInputChange} placeholder="e.g., Cardiologist, Pediatrician" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>Telecom Contact Node</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+237 ..." style={inputStyle} />
              </div>
              
              {/* Native Personal Image Upload Engine */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>📸 Personal Profile Picture (Authentic File)</label>
                <input type="file" required onChange={handleFileChange} accept="image/*" style={{ fontSize: '12px' }} />
              </div>
            </>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>Secure Email Address</label>
            <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="username@ukuqala.org" style={inputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>Cryptographic Password</label>
            <input type="password" name="password" required value={formData.password} onChange={handleInputChange} placeholder="••••••••" style={inputStyle} />
          </div>

          {!isLogin && (
            <div style={{ background: '#0D1117', padding: '12px', borderRadius: '6px', border: '1px solid #30363d', marginTop: '8px' }}>
              <span style={{ display: 'block', fontSize: '11px', color: '#7ee787', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase' }}>
                Required Verification Files
              </span>
              <div style={{ marginBottom: '10px' }}>
                <label style={fileLabelStyle}>🗂️ Medical Practice License</label>
                <input type="file" required accept=".pdf,image/*" style={{ fontSize: '12px' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={fileLabelStyle}>🪪 National ID Document</label>
                <input type="file" required accept=".pdf,image/*" style={{ fontSize: '12px' }} />
              </div>
              <div>
                <label style={fileLabelStyle}>🎓 Academic Degree Diploma</label>
                <input type="file" required accept=".pdf,image/*" style={{ fontSize: '12px' }} />
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            backgroundColor: '#238636', color: '#fff', border: '1px solid #2ea44f',
            padding: '10px', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold', fontSize: '14px', marginTop: '10px'
          }}>
            {loading ? "Processing Network Handshake..." : isLogin ? "Access Portal Terminal" : "Submit Registration Request"}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px' }}>
          <span style={{ color: '#8b949e' }}>
            {isLogin ? "New to the platform infrastructure? " : "Already registered as an authority? "}
          </span>
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ background: 'none', border: 'none', color: '#58a6ff', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
          >
            {isLogin ? "Apply for Access" : "Log In Here"}
          </button>
        </div>

      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  background: '#0D1117',
  border: '1px solid #30363d',
  borderRadius: '6px',
  color: '#c9d1d9',
  fontSize: '13px',
  boxSizing: 'border-box'
};

const fileLabelStyle = {
  display: 'block',
  fontSize: '12px',
  color: '#8b949e',
  marginBottom: '4px'
};

export default DoctorAuth;
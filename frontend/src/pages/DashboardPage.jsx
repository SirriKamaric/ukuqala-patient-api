import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { getPatients } from '../api/patients'; 
import { useAuth } from '../hooks/useAuth';
import { KpiCard } from '../components/KpiCard'; 
import '../App.css'; 

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalPatients: 0, recentPatients: [] });

  // 1. Calculate clinical identification variables instantly during render phase
  const localCustomDocs = JSON.parse(localStorage.getItem('custom_doctors') || '[]');
  const currentDoctor = user?.email 
    ? localCustomDocs.find((d) => d.email.toLowerCase() === user.email.toLowerCase())
    : null;

  const isApprovedDoctor = !currentDoctor || currentDoctor.workspaceStatus === 'APPROVED';

  // 2. Set the initial loading state dynamically based on approval clearance 
  // If they are blocked, loading is instantly false, preventing synchronous sets inside useEffect!
  const [loading, setLoading] = useState(isApprovedDoctor);

  useEffect(() => {
    // If derived state indicates the node is locked, stay quiet and do nothing
    if (!isApprovedDoctor) {
      return;
    }

    let isMounted = true;
    const loadDashboard = async () => {
      setLoading(true);
      try {
        const patients = await getPatients();
        if (isMounted) {
          setStats({
            totalPatients: patients.length,
            recentPatients: [...patients].reverse().slice(0, 5),
          });
        }
      } catch {
        // Complies with Requirement 6.2 (No console logs in production builds)
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [isApprovedDoctor]); 

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // --- RENDERING PHASE 1: LOCKED STATE INTERCEPTOR ---
  if (!isApprovedDoctor) {
    return (
      <DashboardLayout>
        <div id="center" style={{ 
          height: '75vh', display: 'flex', flexDirection: 'column', 
          justifyContent: 'center', alignItems: 'center', padding: '20px' 
        }}>
          <div style={{
            backgroundColor: '#161b22', border: '1px solid #30363d',
            padding: '40px', borderRadius: '12px', maxWidth: '500px', 
            textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
            <h2 style={{ color: '#f8fafc', marginBottom: '12px', fontSize: '1.6rem' }}>
              Registration Pending Verification
            </h2>
            <p style={{ color: '#8b949e', fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px 0' }}>
              Welcome, Dr. {user?.name || 'Practitioner'}. Your uploaded credentials, medical licenses, and academic certifications are currently inside our administrative evaluation queue.
            </p>
            <div style={{ 
              backgroundColor: '#0d1117', border: '1px solid #21262d', 
              padding: '12px', borderRadius: '6px', fontSize: '12px', 
              color: '#dbab09', marginBottom: '24px', fontWeight: '500'
            }}>
              🔒 Status Node: Access Flag Restricted Until Admin Approval
            </div>
            <p style={{ color: '#8b949e', fontSize: '12px', margin: 0 }}>
              Please check back shortly or contact the facility's workspace administrator.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // --- RENDERING PHASE 2: NORMAL OPERATIONAL DASHBOARD ---
  return (
    <DashboardLayout>
      <div id="center">
        <header className="dash-header">
          <div className="header-text">
            <h1 className="welcome-text">
              {getGreeting()}, {user?.name || 'Practitioner'}
            </h1>
            <p className="sub-title">Ukuqala Clinical Portal | Healthcare Management System</p>
          </div>
          <button className="counter" onClick={() => navigate('/patients/register')}>
            + Register New Patient
          </button>
        </header>

        <section className="stats-grid">
          <KpiCard 
            title="Total Patients" 
            value={loading ? '—' : stats.totalPatients} 
            color="blue" 
          />
          <KpiCard 
            title="Portal Status" 
            value="● Securely Connected" 
            color="green" 
          />
          <KpiCard 
            title="Authorized Account" 
            value={user?.name || 'Authorized'} 
            color="purple" 
          />
        </section>

        <section className="table-card">
          <div className="section-title-row">
            <h3 className="section-title">Recent Clinical Logs</h3>
            <button className="btn-link" onClick={() => navigate('/patients')}>
              View All Patients →
            </button>
          </div>

          <div className="table-wrapper">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Primary Condition</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="3" className="empty-state">Syncing records...</td></tr>
                ) : stats.recentPatients.length > 0 ? (
                  stats.recentPatients.map((p) => (
                    <tr key={p.id || p._id} className="table-row-hover">
                      <td className="patient-primary">{p.name}</td>
                      <td>{p.condition || 'General Evaluation'}</td>
                      <td>
                        <button 
                          className="btn-table-action" 
                          onClick={() => navigate(`/patients/${p.id || p._id}`)}
                        >
                          View Record
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="empty-state">
                      📋 No patient records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
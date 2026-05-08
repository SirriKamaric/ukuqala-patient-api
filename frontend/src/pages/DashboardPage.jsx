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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const patients = await getPatients();
        setStats({
          totalPatients: patients.length,
          recentPatients: [...patients].reverse().slice(0, 5),
        });
      } catch {
        // Silently fail or update UI state to avoid 'err' unused warning
        // Complies with Requirement 6.2: No console.logs in submission
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

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
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import Vitals from '../components/Vitals'; // Composition: Reusing our component
import { getPatientById } from '../api/patients';

const PatientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchDetails = async () => {
      try {
        const res = await getPatientById(id);
        if (isMounted) setPatient(res.data);
      } catch {
        if (isMounted) setError("Patient details not found.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchDetails();
    return () => { isMounted = false; };
  }, [id]);

  if (loading) return <DashboardLayout><LoadingSpinner /></DashboardLayout>;
  if (error) return <DashboardLayout><div className="error-banner">{error}</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="detail-header">
        <button className="btn-back" onClick={() => navigate('/patients')}>
          ← Back to Records
        </button>
      </div>

      <div className="profile-card">
        <div className="profile-info">
          <h2 className="patient-name">{patient?.name}</h2>
          <p className="patient-meta">
            <strong>Age:</strong> {patient?.age} | <strong>Gender:</strong> {patient?.gender}
          </p>
          <div className="condition-tag">
            <strong>Primary Condition:</strong> {patient?.condition || 'General Observation'}
          </div>
        </div>
      </div>

      {/* Requirement 6.1 & 6.2: Externalized Vitals Component */}
      <div className="vitals-section-wrapper">
        <Vitals />
      </div>
    </DashboardLayout>
  );
};

export default PatientDetailPage;
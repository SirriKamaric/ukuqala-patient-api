import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DashboardLayout from '../components/DashboardLayout';
import { getPatients } from '../api/patients';
import { useAuth } from '../hooks/useAuth';

import '../styles/DashboardPage.css';

export default function DashboardPage() {

  const navigate = useNavigate();
  const { user } = useAuth();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPatients = async () => {

      try {

        const data = await getPatients();

        if (Array.isArray(data)) {
          setPatients(data);
        } else {
          setPatients([]);
        }

      } catch (error) {

        console.error('Error fetching patients:', error);
        setPatients([]);

      } finally {
        setLoading(false);
      }
    };

    fetchPatients();

  }, []);

  const recentPatients = patients.slice(0, 5);

  return (
    <DashboardLayout>

      <div className="dashboard-page">

        {/* Header */}
        <div className="dashboard-header">

          <div>

            <h1 className="dashboard-title">
              Welcome, {user?.name || 'Doctor'}
            </h1>

            <p className="dashboard-subtitle">
              Healthcare Management Dashboard
            </p>

          </div>

          {/* ✅ FIXED ROUTE HERE */}
          <button
            className="primary-btn"
            onClick={() => navigate('/patients/new')}
          >
            + Add Patient
          </button>

        </div>

        {/* Stats Cards */}
        <div className="stats-grid">

          <div className="kpi-card">

            <div className="kpi-title">
              Total Patients
            </div>

            <h2 className="kpi-value">
              {patients.length}
            </h2>

          </div>

          <div className="kpi-card green">

            <div className="kpi-title">
              Recent Records
            </div>

            <h2 className="kpi-value">
              {recentPatients.length}
            </h2>

          </div>

          <div className="kpi-card purple">

            <div className="kpi-title">
              System Status
            </div>

            <h2 className="kpi-value">
              Online
            </h2>

          </div>

        </div>

        {/* Patients Table */}
        <div className="table-card">

          <div className="section-header">

            <h3>Recent Patients</h3>

            <button
              className="btn-link"
              onClick={() => navigate('/patients')}
            >
              View All
            </button>

          </div>

          {loading ? (

            <div className="empty-state">
              Loading patients...
            </div>

          ) : recentPatients.length === 0 ? (

            <div className="empty-state">
              No patients found
            </div>

          ) : (

            <table className="modern-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Condition</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {recentPatients.map(patient => (

                  <tr
                    key={patient.id || patient._id}
                    className="table-row"
                  >

                    <td>
                      {patient.id || patient._id}
                    </td>

                    <td className="patient-name">
                      {patient.name}
                    </td>

                    <td>
                      {patient.age || '--'}
                    </td>

                    <td>
                      {patient.condition || 'General'}
                    </td>

                    <td>

                      <button
                        className="btn-table-action"
                        onClick={() =>
                          navigate(`/patients/${patient.id || patient._id}`)
                        }
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}
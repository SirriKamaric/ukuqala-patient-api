import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import DoctorDetailedModal from '../components/DoctorDetailedModal';
import PatientDetailedModal from '../components/PatientDetailedModal';
import { getAdminDoctors, getAdminPatients, verifyDocument, handleDoctorTicket } from '../api/admin';
import '../App.css';

// ─────────────────────────────────────────────
// Shared Helpers
// ─────────────────────────────────────────────
const getCombinedDoctorsList = (serverDoctors = []) => {
  const localCustomDocs = JSON.parse(localStorage.getItem('custom_doctors') || '[]');
  return [...localCustomDocs, ...serverDoctors];
};

const getStatusStyle = (status) => ({
  APPROVED: { background: '#e6f4ea', color: '#137333' },
  REJECTED:  { background: '#fce8e6', color: '#c5221f' },
  Pending:   { background: '#fff8e1', color: '#b06000' },
}[status] || { background: '#fff8e1', color: '#b06000' });


// ─────────────────────────────────────────────
// AdminPanel (Root)
// ─────────────────────────────────────────────
const AdminPanel = () => {
  const [activeTab, setActiveTab]       = useState('doctors');
  const [doctors, setDoctors]           = useState([]);
  const [patients, setPatients]         = useState([]);
  const [loading, setLoading]           = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedLogDoctor, setSelectedLogDoctor]         = useState(null);
  const [selectedProfileDoctor, setSelectedProfileDoctor] = useState(null);
  const [selectedProfilePatient, setSelectedProfilePatient] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'doctors' || activeTab === 'documents') {
          const docData = await getAdminDoctors();
          if (isMounted) setDoctors(Array.isArray(docData) ? docData : []);
        } else if (activeTab === 'patients') {
          const patData = await getAdminPatients();
          if (isMounted) setPatients(Array.isArray(patData) ? patData : []);
        }
      } catch {
        if (isMounted) { setDoctors([]); setPatients([]); }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [activeTab]);

  const manualSyncDocs = async () => {
    try {
      const docData = await getAdminDoctors();
      setDoctors(Array.isArray(docData) ? docData : []);
    } catch {
      setDoctors([]);
    }
  };

  const handleDocApproval = async (doctorId, docType, newStatus) => {
    const localDocs = JSON.parse(localStorage.getItem('custom_doctors') || '[]');
    const updated = localDocs.map(doc => {
      if (doc.id !== doctorId) return doc;
      const d = { ...doc };
      if (docType === 'license') d.licenseStatus = newStatus;
      if (docType === 'idDoc')   d.idStatus      = newStatus;
      if (docType === 'diploma') d.diplomaStatus  = newStatus;
      if (d.licenseStatus === 'APPROVED' && d.idStatus === 'APPROVED' && d.diplomaStatus === 'APPROVED') {
        d.workspaceStatus = 'APPROVED';
      } else if (newStatus === 'REJECTED') {
        d.workspaceStatus = 'REJECTED';
      }
      return d;
    });
    localStorage.setItem('custom_doctors', JSON.stringify(updated));
    try {
      await verifyDocument(doctorId, docType, newStatus);
    } catch {
      console.log('Local registry updated successfully.');
    }
    alert(`Credential marked as ${newStatus}!`);
    await manualSyncDocs();
    // Refresh modal state so doc statuses update without closing
    const refreshed = JSON.parse(localStorage.getItem('custom_doctors') || '[]').find(d => d.id === doctorId);
    if (refreshed) setSelectedProfileDoctor(refreshed);
  };

  const handleTicketResolve = async (ticketId) => {
    try {
      await handleDoctorTicket(ticketId, 'RESOLVED');
      alert('Ticket resolved.');
      await manualSyncDocs();
    } catch {
      alert('System error updating ticket.');
    }
  };

  return (
    <DashboardLayout>
      <div id="center" style={{ padding: '20px' }}>
        <div className="dash-header">
          <div className="header-text">
            <h1 className="welcome-text">Administrative Control Center</h1>
            <p className="sub-title">Verify credentials and approve practitioner access keys</p>
          </div>
        </div>

        <div className="admin-tabs" style={{ display: 'flex', gap: '12px', marginBottom: '24px', marginTop: '20px' }}>
          {['doctors', 'patients', 'documents'].map(tab => (
            <button
              key={tab}
              className={`counter ${activeTab === tab ? 'active-tab' : 'inactive-tab'}`}
              style={{ padding: '10px 20px', textTransform: 'capitalize', cursor: 'pointer' }}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="empty-state" style={{ padding: '40px', textAlign: 'center' }}>
            Retrieving operational nodes...
          </div>
        ) : (
          <div className="table-card" style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            {activeTab === 'doctors'   && (
              <DoctorsView
                doctors={doctors}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                onOpenProfile={setSelectedProfileDoctor}
              />
            )}
            {activeTab === 'patients'  && <PatientsView  patients={patients} onOpenProfile={setSelectedProfilePatient} />}
            {activeTab === 'documents' && <DocumentsView doctors={doctors} onVerify={handleDocApproval} getStatusStyle={getStatusStyle} />}
          </div>
        )}
      </div>

      {selectedLogDoctor && (
        <AuditLogModal doctorCode={selectedLogDoctor} onClose={() => setSelectedLogDoctor(null)} />
      )}
      {selectedProfileDoctor && (
        <DoctorDetailedModal
          doctor={selectedProfileDoctor}
          onClose={() => setSelectedProfileDoctor(null)}
          onVerifyDoc={handleDocApproval}
          onResolveTicket={handleTicketResolve}
        />
      )}
      {selectedProfilePatient && (
        <PatientDetailedModal
          patient={selectedProfilePatient}
          onClose={() => setSelectedProfilePatient(null)}
          onResolveTicket={handleTicketResolve}
        />
      )}
    </DashboardLayout>
  );
};


// ─────────────────────────────────────────────
// Doctors Tab
// ─────────────────────────────────────────────
const DoctorsView = ({ doctors, onOpenProfile }) => {
  const allDoctors = getCombinedDoctorsList(doctors);

  return (
    <div className="table-wrapper" style={{ width: '100%', boxSizing: 'border-box' }}>
      <div style={{ paddingBottom: '16px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 4px 0', color: '#1A73E8' }}>Active Medical Registry</h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>Physicians who have cleared structural verification checks</p>
      </div>

      {allDoctors.length === 0 ? (
        <div style={{ padding: '30px', textAlign: 'center', backgroundColor: '#0D1117', borderRadius: '8px', color: '#8b949e', marginBottom: '32px' }}>
          No clinicians registered in the network system yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', width: '100%', justifyContent: 'flex-start', alignItems: 'stretch', marginBottom: '32px' }}>
          {allDoctors.map((doc, i) => (
            <div key={doc?.id ?? i} style={{
              backgroundColor: '#0D1117', border: '1px solid #30363d',
              borderRadius: '8px', padding: '20px', textAlign: 'center', color: '#c9d1d9',
              flex: '1 1 calc(33.333% - 20px)', minWidth: '260px', maxWidth: '350px',
              boxSizing: 'border-box', opacity: doc?.workspaceStatus === 'APPROVED' ? 1 : 0.6,
            }}>
              <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 12px auto' }}>
                <img
                  src={doc?.avatar || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60'}
                  alt={doc?.name}
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid #1A73E8' }}
                />
                <div style={{
                  position: 'absolute', bottom: '2px', right: '2px',
                  width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #0D1117',
                  backgroundColor: doc?.workspaceStatus === 'APPROVED' ? '#7ee787' : '#dbab09',
                }} />
              </div>
              <h4 onClick={() => onOpenProfile(doc)} style={{ color: '#58a6ff', cursor: 'pointer', margin: '0 0 4px 0' }}>
                {doc?.name}
              </h4>
              <p style={{ color: '#8b949e', fontSize: '12px', margin: '0 0 8px 0' }}>{doc?.specialty || doc?.email}</p>
              <span style={{ display: 'inline-block', backgroundColor: '#161b22', padding: '3px 8px', borderRadius: '10px', fontSize: '11px', color: doc?.workspaceStatus === 'APPROVED' ? '#7ee787' : '#dbab09' }}>
                Status: {doc?.workspaceStatus || 'Pending Approval'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


// ─────────────────────────────────────────────
// Patients Tab
// ─────────────────────────────────────────────
const PatientsView = ({ patients = [], onOpenProfile }) => (
  <div className="table-wrapper">
    <table className="modern-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
          <th style={{ padding: '12px' }}>Patient Details</th>
          <th style={{ padding: '12px' }}>Vitals Summary</th>
        </tr>
      </thead>
      <tbody>
        {patients.length === 0 ? (
          <tr><td colSpan="2" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>No patient entries found.</td></tr>
        ) : patients.map((p, i) => (
          <tr
            key={p?.id ?? i}
            onClick={() => onOpenProfile(p)}
            style={{ borderBottom: '1px solid #eee', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <td style={{ padding: '12px' }}>
              <strong style={{ color: '#1a73e8' }}>{p?.name}</strong>
              <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>ID: {p?.id}</div>
            </td>
            <td style={{ padding: '12px' }}>🩸 BG: {p?.bloodGroup || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


// ─────────────────────────────────────────────
// Documents Tab
// ─────────────────────────────────────────────
const DocumentsView = ({ doctors, onVerify, getStatusStyle }) => {
  const allDoctors = getCombinedDoctorsList(doctors);

  return (
    <div className="table-wrapper">
      <div style={{ marginBottom: '15px' }}>
        <h3 style={{ color: '#E67E22', margin: '0 0 4px 0' }}>Verification Processing Queues</h3>
        <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>All three certifications must be APPROVED to unlock system dashboard access nodes.</p>
      </div>
      <table className="modern-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee', backgroundColor: '#f8f9fa' }}>
            <th style={{ padding: '12px' }}>Doctor Name</th>
            <th style={{ padding: '12px' }}>Medical License</th>
            <th style={{ padding: '12px' }}>National ID Card</th>
            <th style={{ padding: '12px' }}>Academic Diploma</th>
          </tr>
        </thead>
        <tbody>
          {allDoctors.length === 0 ? (
            <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>No pending validation requests found.</td></tr>
          ) : allDoctors.map((doc, i) => (
            <tr key={doc?.id ?? i} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}>
                <strong>{doc?.name}</strong>
                <div style={{ fontSize: '11px', color: '#666' }}>ID: {doc?.id}</div>
              </td>
              {['license', 'idDoc', 'diploma'].map(type => {
                const statusKey     = type === 'license' ? 'licenseStatus' : type === 'idDoc' ? 'idStatus' : 'diplomaStatus';
                const currentStatus = doc[statusKey] || 'Pending';
                return (
                  <td key={type} style={{ padding: '12px' }}>
                    <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', display: 'block', width: 'max-content', marginBottom: '6px', ...getStatusStyle(currentStatus) }}>
                      {currentStatus}
                    </span>
                    {currentStatus !== 'APPROVED' && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ color: 'green', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', padding: 0 }} onClick={() => onVerify(doc?.id, type, 'APPROVED')}>✔ Approve</button>
                        <button style={{ color: 'red',   background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', padding: 0 }} onClick={() => onVerify(doc?.id, type, 'REJECTED')}>✕ Reject</button>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


// ─────────────────────────────────────────────
// Audit Log Modal
// ─────────────────────────────────────────────
const AuditLogModal = ({ doctorCode, onClose }) => (
  <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
    <div style={{ background: '#0D1117', border: '1px solid #30363d', borderRadius: '8px', width: '650px', padding: '24px', color: '#c9d1d9' }}>
      <h3 style={{ margin: '0 0 15px 0' }}>Audit Terminal Logs — node: {doctorCode}</h3>
      <p style={{ fontSize: '13px', color: '#8b949e' }}>Security monitoring array online.</p>
      <button onClick={onClose} style={{ padding: '8px 16px', cursor: 'pointer', marginTop: '15px' }}>Close Logs</button>
    </div>
  </div>
);


export default AdminPanel;
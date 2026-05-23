import { useState } from 'react';

const DoctorDetailedModal = ({ doctor, onClose, onVerifyDoc, onResolveTicket }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [apptFilter, setApptFilter] = useState('all');

  const appointments = doctor?.appointments || [
    { id: 1, patient: 'James Okonkwo', date: 'Today, 09:00', type: 'Follow-up',    status: 'upcoming'  },
    { id: 2, patient: 'Maria Santos',  date: 'Today, 11:30', type: 'Consultation', status: 'upcoming'  },
    { id: 3, patient: 'Li Wei',        date: 'Yesterday',    type: 'Check-up',     status: 'completed' },
    { id: 4, patient: 'Tom Reeves',    date: 'May 12',       type: 'Procedure',    status: 'cancelled' },
  ];

  const rawTickets = doctor?.tickets || [
    { id: 'TKT-091', title: 'Scheduling conflict on May 22nd',         date: 'May 19, 2026', body: 'Two overlapping appointments at 10:00 AM.', status: 'open'     },
    { id: 'TKT-087', title: 'Unable to access lab results portal',     date: 'May 16, 2026', body: '403 error on lab integration module.',      status: 'open'     },
    { id: 'TKT-072', title: 'Request for updated prescription access', date: 'May 08, 2026', body: 'Prescription pad access expired.',          status: 'resolved' },
  ];

  const [ticketList, setTicketList] = useState(rawTickets);

  const initials = doctor?.name
    ?.split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('') || 'DR';

  const filteredAppts = apptFilter === 'all'
    ? appointments
    : appointments.filter(a => a.status === apptFilter);

  const handleResolve = (ticketId) => {
    setTicketList(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'resolved' } : t));
    onResolveTicket?.(ticketId);
  };

  const tabs = [
    { key: 'profile',      label: 'Profile',      icon: '👤' },
    { key: 'appointments', label: 'Appointments', icon: '📅' },
    { key: 'support',      label: 'Support',      icon: '🎫' },
    { key: 'documents',    label: 'Documents',    icon: '📄' },
  ];

  // FIXED: was using 'bg' key, now correctly using 'background'
  const statusColor = {
    APPROVED: { background: '#e6f4ea', color: '#137333' },
    REJECTED:  { background: '#fce8e6', color: '#c5221f' },
    Pending:   { background: '#fff8e1', color: '#b06000' },
  };

  const apptStatusStyle = {
    upcoming:  { background: '#e8f0fe', color: '#1a73e8' },
    completed: { background: '#e6f4ea', color: '#137333' },
    cancelled: { background: '#fce8e6', color: '#c5221f' },
  };

  const getStatusStyle = (st) => statusColor[st] || statusColor.Pending;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '20px',
    }}>
      <div style={{
        background: '#fff', borderRadius: '12px',
        width: '680px', maxHeight: '85vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
      }}>

        {/* ── Header ── */}
        <div style={{ padding: '20px 24px 0', borderBottom: '1px solid #eee', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: '#1a73e8', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '600', fontSize: '16px', color: '#fff', flexShrink: 0,
            }}>
              {initials}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', fontSize: '16px', color: '#111' }}>{doctor?.name}</div>
              <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>
                {doctor?.specialty || 'General Practitioner'} · ID: {doctor?.id}
              </div>
              <span style={{
                display: 'inline-block', marginTop: '4px',
                fontSize: '11px', padding: '2px 8px', borderRadius: '20px',
                ...getStatusStyle(doctor?.workspaceStatus),
              }}>
                {doctor?.workspaceStatus || 'Pending'}
              </span>
            </div>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#999', lineHeight: 1, marginBottom: 'auto' }}
            >✕</button>
          </div>

          {/* Tab bar */}
          <div style={{ display: 'flex' }}>
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '10px 18px', fontSize: '13px',
                  fontWeight: activeTab === tab.key ? '600' : '400',
                  color: activeTab === tab.key ? '#1a73e8' : '#666',
                  borderBottom: `2px solid ${activeTab === tab.key ? '#1a73e8' : 'transparent'}`,
                  transition: 'all 0.15s',
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>

          {/* ══ PROFILE TAB ══ */}
          {activeTab === 'profile' && (
            <div>
              <p style={{ fontSize: '11px', color: '#aaa', letterSpacing: '.06em', marginBottom: '10px', textTransform: 'uppercase' }}>
                Practitioner information
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                {[
                  ['Full name',       doctor?.name],
                  ['Practitioner ID', doctor?.id],
                  ['Specialty',       doctor?.specialty || '—'],
                  ['Email',           doctor?.email     || '—'],
                  ['Phone',           doctor?.phone     || '—'],
                  ['Date joined',     doctor?.joined    || '—'],
                ].map(([label, val]) => (
                  <div key={label} style={{ background: '#f8f9fa', borderRadius: '8px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#111', wordBreak: 'break-all' }}>{val || '—'}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '11px', color: '#aaa', letterSpacing: '.06em', marginBottom: '10px', textTransform: 'uppercase' }}>
                Access status
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  ['Workspace access', doctor?.workspaceStatus || 'Pending'],
                  ['Active patients',  doctor?.patients        || '—'],
                ].map(([label, val]) => (
                  <div key={label} style={{ background: '#f8f9fa', borderRadius: '8px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#111' }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ APPOINTMENTS TAB ══ */}
          {activeTab === 'appointments' && (
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {['all', 'upcoming', 'completed', 'cancelled'].map(f => (
                  <button
                    key={f}
                    onClick={() => setApptFilter(f)}
                    style={{
                      background: apptFilter === f ? '#1a73e8' : 'none',
                      color: apptFilter === f ? '#fff' : '#666',
                      border: `1px solid ${apptFilter === f ? '#1a73e8' : '#ddd'}`,
                      padding: '5px 14px', borderRadius: '20px',
                      fontSize: '12px', cursor: 'pointer', textTransform: 'capitalize',
                    }}
                  >{f}</button>
                ))}
              </div>
              {filteredAppts.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#999', padding: '30px', fontSize: '13px' }}>
                  No appointments for this filter.
                </p>
              ) : filteredAppts.map(a => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <div>
                    <div style={{ fontWeight: '500', fontSize: '13px', color: '#111' }}>{a.patient}</div>
                    <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>📅 {a.date} · {a.type}</div>
                  </div>
                  <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', textTransform: 'capitalize', ...(apptStatusStyle[a.status] || {}) }}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ══ SUPPORT TICKETS TAB ══ */}
          {activeTab === 'support' && (
            <div>
              {ticketList.length === 0 && (
                <p style={{ textAlign: 'center', color: '#999', padding: '30px', fontSize: '13px' }}>No support tickets found.</p>
              )}
              {ticketList.map(t => (
                <div key={t.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '14px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px', gap: '12px' }}>
                    <span style={{ fontWeight: '500', fontSize: '13px', color: '#111' }}>🎫 {t.title}</span>
                    <span style={{ fontSize: '11px', color: '#aaa', whiteSpace: 'nowrap', flexShrink: 0 }}>{t.id} · {t.date}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.6', marginBottom: '10px' }}>{t.body}</p>
                  {t.status === 'resolved' ? (
                    <span style={{ fontSize: '11px', padding: '2px 10px', borderRadius: '20px', background: '#e6f4ea', color: '#137333' }}>
                      ✔ Resolved
                    </span>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleResolve(t.id)}
                        style={{ background: '#e6f4ea', color: '#137333', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
                      >✔ Mark resolved</button>
                      <button
                        style={{ background: '#fff8e1', color: '#b06000', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
                      >⚠ Escalate</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ══ DOCUMENTS TAB ══ */}
          {activeTab === 'documents' && (
            <div>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>
                All three must be <strong>Approved</strong> to unlock full dashboard access.
              </p>
              {[
                { key: 'license', label: 'Medical license',  sub: 'Professional practice certificate',   statusKey: 'licenseStatus' },
                { key: 'idDoc',   label: 'National ID card', sub: 'Government-issued identity document', statusKey: 'idStatus'      },
                { key: 'diploma', label: 'Academic diploma', sub: 'Degree from accredited institution',  statusKey: 'diplomaStatus' },
              ].map((doc, idx, arr) => {
                const st = doctor?.[doc.statusKey] || 'Pending';
                return (
                  <div key={doc.key} style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: idx < arr.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f1f3f4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', flexShrink: 0, fontSize: '18px' }}>
                      📄
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500', fontSize: '13px', color: '#111' }}>{doc.label}</div>
                      <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{doc.sub}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', ...getStatusStyle(st) }}>{st}</span>
                      {st !== 'APPROVED' && (
                        <>
                          <button onClick={() => onVerifyDoc?.(doctor?.id, doc.key, 'APPROVED')} style={{ background: '#e6f4ea', color: '#137333', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>✔ Approve</button>
                          <button onClick={() => onVerifyDoc?.(doctor?.id, doc.key, 'REJECTED')} style={{ background: '#fce8e6', color: '#c5221f', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>✕ Reject</button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DoctorDetailedModal;
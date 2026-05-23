import { useState } from 'react';

const PatientDetailedModal = ({ patient, onClose, onResolveTicket }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const rawTickets = patient?.tickets || [
    { id: 'TKT-P01', title: 'Appointment rescheduling request',     date: 'May 18, 2026', body: 'Patient requested to move their May 20 appointment to May 25.', status: 'open'     },
    { id: 'TKT-P02', title: 'Prescription refill not received',     date: 'May 14, 2026', body: 'Patient says they never received their refill from last visit.',  status: 'open'     },
    { id: 'TKT-P03', title: 'Billing discrepancy on last invoice',  date: 'May 10, 2026', body: 'Patient was charged twice for the same consultation session.',    status: 'resolved' },
  ];

  const appointments = patient?.appointments || [
    { id: 1, doctor: 'Dr. Sarah Mitchell', date: 'Today, 10:00',  type: 'Consultation', status: 'upcoming'  },
    { id: 2, doctor: 'Dr. James Osei',     date: 'May 18',        type: 'Follow-up',    status: 'completed' },
    { id: 3, doctor: 'Dr. Sarah Mitchell', date: 'May 10',        type: 'Check-up',     status: 'completed' },
    { id: 4, doctor: 'Dr. Priya Nair',     date: 'Apr 28',        type: 'Procedure',    status: 'cancelled' },
  ];

  const [ticketList, setTicketList] = useState(rawTickets);
  const [apptFilter, setApptFilter] = useState('all');

  const initials = patient?.name
    ?.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('') || 'PT';

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
  ];

  const apptStatusStyle = {
    upcoming:  { background: '#e8f0fe', color: '#1a73e8' },
    completed: { background: '#e6f4ea', color: '#137333' },
    cancelled: { background: '#fce8e6', color: '#c5221f' },
  };

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
              background: '#E67E22', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '600', fontSize: '16px', color: '#fff', flexShrink: 0,
            }}>
              {initials}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', fontSize: '16px', color: '#111' }}>{patient?.name}</div>
              <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>
                Patient · ID: {patient?.id}
              </div>
              <span style={{
                display: 'inline-block', marginTop: '4px',
                fontSize: '11px', padding: '2px 8px', borderRadius: '20px',
                background: '#e8f0fe', color: '#1a73e8',
              }}>
                {patient?.bloodGroup ? `Blood Group: ${patient.bloodGroup}` : 'Active Patient'}
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
                  color: activeTab === tab.key ? '#E67E22' : '#666',
                  borderBottom: `2px solid ${activeTab === tab.key ? '#E67E22' : 'transparent'}`,
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
                Patient information
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  ['Full name',    patient?.name        || '—'],
                  ['Patient ID',   patient?.id          || '—'],
                  ['Age',          patient?.age         ? `${patient.age} years` : '—'],
                  ['Blood group',  patient?.bloodGroup  || '—'],
                  ['Location',     patient?.location    || '—'],
                  ['Height',       patient?.height      ? `${patient.height} cm` : '—'],
                  ['Email',        patient?.email       || '—'],
                  ['Phone',        patient?.phone       || '—'],
                ].map(([label, val]) => (
                  <div key={label} style={{ background: '#f8f9fa', borderRadius: '8px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#111', wordBreak: 'break-all' }}>{val}</div>
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
                      background: apptFilter === f ? '#E67E22' : 'none',
                      color: apptFilter === f ? '#fff' : '#666',
                      border: `1px solid ${apptFilter === f ? '#E67E22' : '#ddd'}`,
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
                    <div style={{ fontWeight: '500', fontSize: '13px', color: '#111' }}>{a.doctor}</div>
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

        </div>
      </div>
    </div>
  );
};

export default PatientDetailedModal;
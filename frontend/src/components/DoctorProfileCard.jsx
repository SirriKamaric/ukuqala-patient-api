import { useState } from 'react';

// Main Container Component managing multiple doctor listings
export const DoctorProfileGroup = ({ doctors = [] }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Fallback mock data if your backend array is currently empty for testing
  const displayDoctors = doctors.length > 0 ? doctors : [
    {
      id: "DOC-2026-001",
      name: "Dr. Chenwie Benatsus",
      specialty: "Consulting Pediatrician & Health Systems Specialist",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60", // High-quality medical placeholder
      email: "c.benatsus@ukuqala.org",
      phone: "+237 677 889 900",
      department: "Clinical Operations",
      joinedDate: "March 15, 2024",
      bio: "Over 15 years of active medical service across regional referral health hubs, specialized in implementing serverless assistive tech tools for community patient tracking loops."
    },
    {
      id: "DOC-2026-002",
      name: "Dr. Binwie Quinta",
      specialty: "Lead Health Information Systems Analyst",
      avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?w=400&auto=format&fit=crop&q=60",
      email: "b.quinta@ukuqala.org",
      phone: "+237 655 443 322",
      department: "Information & Network Governance",
      joinedDate: "January 10, 2025",
      bio: "Expert in data architecture modeling, cryptographic user permissions handling, and optimizing clinical registry handshakes on distributed networks."
    }
  ];

  return (
    <div style={{ padding: '10px 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        marginTop: '16px'
      }}>
        {displayDoctors.map((doc) => (
          <DoctorCard 
            key={doc.id} 
            doctor={doc} 
            onNameClick={() => setSelectedDoctor(doc)} 
          />
        ))}
      </div>

      {/* Expanded Profile Overlay Layer */}
      {selectedDoctor && (
        <DoctorDetailedModal 
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)} 
        />
      )}
    </div>
  );
};

// --- SUB-COMPONENT 1: THE SURFACE VISUAL CARD ---
const DoctorCard = ({ doctor, onNameClick }) => {
  return (
    <div style={{
      backgroundColor: '#0D1117',
      border: '1px solid #30363d',
      borderRadius: '8px',
      padding: '20px',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      color: '#c9d1d9'
    }}>
      {/* Profile Picture Circle Frame */}
      <div style={{ position: 'relative', width: '110px', height: '110px', margin: '0 auto 16px auto' }}>
        <img 
          src={doctor.avatar} 
          alt={doctor.name} 
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid var(--primary-blue, #1A73E8)'
          }} 
        />
        <div style={{
          position: 'absolute', bottom: '4px', right: '4px',
          width: '14px', height: '14px', backgroundColor: '#7ee787',
          borderRadius: '50%', border: '2px solid #0D1117'
        }} title="System Node Active" />
      </div>

      {/* Clickable Trigger Name Link */}
      <h3 
        onClick={onNameClick}
        style={{
          color: '#58a6ff',
          cursor: 'pointer',
          margin: '0 0 6px 0',
          fontSize: '18px',
          textDecoration: 'none',
          transition: 'color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.color = '#79c0ff'}
        onMouseLeave={(e) => e.target.style.color = '#58a6ff'}
      >
        {doctor.name}
      </h3>
      
      <p style={{ color: '#8b949e', fontSize: '13px', margin: '0 0 12px 0', minHeight: '36px' }}>
        {doctor.specialty}
      </p>

      <span style={{
        backgroundColor: '#161b22',
        border: '1px solid #30363d',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        color: '#8b949e'
      }}>
        Code: {doctor.id}
      </span>
    </div>
  );
};

// --- SUB-COMPONENT 2: THE EXPANDED DETAILS TERMINAL OVERLAY ---
const DoctorDetailedModal = ({ doctor, onClose }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.75)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 1100, backdropFilter: 'blur(3px)'
    }}>
      <div style={{
        background: '#0D1117',
        border: '1px solid #30363d',
        borderRadius: '10px',
        width: '580px',
        padding: '28px',
        color: '#c9d1d9',
        boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
        position: 'relative'
      }}>
        {/* Close Button Trigger */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '20px', right: '20px',
          background: 'none', border: 'none', color: '#8b949e',
          cursor: 'pointer', fontSize: '20px'
        }}>✕</button>

        {/* Modal Layout Split */}
        <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #30363d', paddingBottom: '20px', marginBottom: '20px' }}>
          <img 
            src={doctor.avatar} 
            alt={doctor.name} 
            style={{ width: '90px', height: '90px', borderRadius: '8px', objectFit: 'cover' }} 
          />
          <div>
            <h2 style={{ color: '#58a6ff', margin: '0 0 4px 0', fontSize: '22px' }}>{doctor.name}</h2>
            <p style={{ color: '#7ee787', margin: '0 0 8px 0', fontSize: '13px', fontWeight: '500' }}>{doctor.specialty}</p>
            <span style={{ fontSize: '12px', color: '#8b949e' }}>System Core UID: <strong>{doctor.id}</strong></span>
          </div>
        </div>

        {/* Meta Info Data Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px', fontSize: '13px' }}>
          <div>
            <span style={{ color: '#8b949e', display: 'block', marginBottom: '2px' }}>Operational Unit</span>
            <strong>{doctor.department}</strong>
          </div>
          <div>
            <span style={{ color: '#8b949e', display: 'block', marginBottom: '2px' }}>Registry Entry Date</span>
            <strong>{doctor.joinedDate}</strong>
          </div>
          <div>
            <span style={{ color: '#8b949e', display: 'block', marginBottom: '2px' }}>Secure Mail Delivery</span>
            <strong style={{ color: '#58a6ff' }}>{doctor.email}</strong>
          </div>
          <div>
            <span style={{ color: '#8b949e', display: 'block', marginBottom: '2px' }}>Network Telecom Node</span>
            <strong>{doctor.phone}</strong>
          </div>
        </div>

        {/* Comprehensive Professional Bio Section */}
        <div style={{ marginTop: '24px', borderTop: '1px solid #21262d', paddingTop: '16px' }}>
          <h4 style={{ color: '#c9d1d9', margin: '0 0 6px 0', fontSize: '14px' }}>Administrative Biography Summary</h4>
          <p style={{ color: '#8b949e', fontSize: '13px', margin: 0, lineHeight: '1.6', textAlign: 'justify' }}>
            {doctor.bio}
          </p>
        </div>

        {/* Action Controls Footer */}
        <div style={{ textAlign: 'right', marginTop: '28px', borderTop: '1px solid #30363d', paddingTop: '16px' }}>
          <button onClick={onClose} style={{
            backgroundColor: '#21262d', border: '1px solid #30363d', color: '#c9d1d9',
            padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
          }}>
            Close File Records
          </button>
        </div>
      </div>
    </div>
  );
};
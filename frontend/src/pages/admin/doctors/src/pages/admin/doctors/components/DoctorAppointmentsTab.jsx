export default function DoctorDocumentsTab() {

  const documents = [
    {
      id: 1,
      name: 'Medical License',
      status: 'VERIFIED',
      uploadedAt: 'May 22, 2026'
    },
    {
      id: 2,
      name: 'National ID',
      status: 'PENDING',
      uploadedAt: 'May 21, 2026'
    },
    {
      id: 3,
      name: 'Medical Diploma',
      status: 'REJECTED',
      uploadedAt: 'May 20, 2026'
    }
  ];

  return (
    <div>

      <h2 style={titleStyle}>
        Verification Documents
      </h2>

      <div style={gridStyle}>

        {documents.map(doc => (

          <div
            key={doc.id}
            style={cardStyle}
          >

            <div>

              <h3 style={docName}>
                {doc.name}
              </h3>

              <p style={dateStyle}>
                Uploaded: {doc.uploadedAt}
              </p>

            </div>

            <span
              style={{
                ...statusBadge,
                background:
                  doc.status === 'VERIFIED'
                    ? '#16351f'
                    : doc.status === 'REJECTED'
                    ? '#3a1515'
                    : '#3b2f12',

                color:
                  doc.status === 'VERIFIED'
                    ? '#3fb950'
                    : doc.status === 'REJECTED'
                    ? '#ff7b72'
                    : '#d29922'
              }}
            >
              {doc.status}
            </span>

            <div style={actionRow}>

              <button style={viewBtn}>
                View
              </button>

              <button style={verifyBtn}>
                Verify
              </button>

              <button style={rejectBtn}>
                Reject
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

/* STYLES */

const titleStyle = {
  color: '#fff',
  marginBottom: '24px'
};

const gridStyle = {
  display: 'grid',
  gap: '18px'
};

const cardStyle = {
  background: '#0D1117',
  border: '1px solid #30363d',
  borderRadius: '18px',
  padding: '22px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px'
};

const docName = {
  color: '#fff',
  margin: 0
};

const dateStyle = {
  color: '#8b949e',
  marginTop: '8px'
};

const statusBadge = {
  width: 'fit-content',
  padding: '8px 14px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: '600'
};

const actionRow = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap'
};

const viewBtn = {
  background: '#1f6feb',
  border: 'none',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: '10px',
  cursor: 'pointer'
};

const verifyBtn = {
  background: '#238636',
  border: 'none',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: '10px',
  cursor: 'pointer'
};

const rejectBtn = {
  background: '#da3633',
  border: 'none',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: '10px',
  cursor: 'pointer'
};
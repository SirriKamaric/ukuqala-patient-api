import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api/v4';

export default function DocumentsPage() {

  const [documents, setDocuments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [form, setForm] = useState({
    patientId: '',
    title: '',
    type: 'PDF'
  });

  /* LOAD DOCUMENTS */
  useEffect(() => {

    async function loadDocuments() {

      try {

        const res = await fetch(
          `${API_URL}/documents`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        const data = await res.json();

        setDocuments(Array.isArray(data) ? data : []);

      } catch (err) {

        console.error(err);

      }
    }

    loadDocuments();

  }, []);

  /* INPUT CHANGE */
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  /* FILE CHANGE */
  const handleFileChange = (e) => {

    setSelectedFile(e.target.files[0]);

  };

  /* UPLOAD */
  const handleUpload = async () => {

    if (
      !form.patientId ||
      !form.title ||
      !selectedFile
    ) {
      return alert('Fill all fields');
    }

    try {

      const body = new FormData();

      body.append('title', form.title);
      body.append('fileType', form.type);
      body.append('patientId', form.patientId);
      body.append(
        'uploadedBy',
        localStorage.getItem('userId')
      );

      body.append('document', selectedFile);

      const res = await fetch(
        `${API_URL}/documents`,
        {
          method: 'POST',

          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },

          body
        }
      );

      const data = await res.json();

      setDocuments(prev => [...prev, data]);

      setForm({
        patientId: '',
        title: '',
        type: 'PDF'
      });

      setSelectedFile(null);

      setShowModal(false);

    } catch (err) {

      console.error(err);

    }
  };

  /* DELETE */
  const handleDelete = async (id) => {

    if (!window.confirm('Delete document?')) return;

    try {

      await fetch(
        `${API_URL}/documents/${id}`,
        {
          method: 'DELETE',

          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setDocuments(prev =>
        prev.filter(doc => doc.id !== id)
      );

    } catch (err) {

      console.error(err);

    }
  };

  /* VIEW */
  const handleView = (doc) => {

    if (!doc.fileUrl) {
      return alert('No file found');
    }

    window.open(
      `http://localhost:3000/${doc.fileUrl}`,
      '_blank'
    );

  };

  return (
    <div
      style={{
        padding: '30px',
        background: '#0d1117',
        minHeight: '100vh',
        color: '#fff'
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}
      >

        <div>

          <h1
            style={{
              margin: 0,
              fontSize: '32px'
            }}
          >
            Documents
          </h1>

          <p
            style={{
              color: '#8b949e'
            }}
          >
            Manage patient documents
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
          style={uploadBtn}
        >
          + Upload
        </button>

      </div>

      {/* TABLE */}
      <div style={tableContainer}>

        <table style={tableStyle}>

          <thead>

            <tr>

              <th style={thStyle}>Title</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Patient</th>
              <th style={thStyle}>Actions</th>

            </tr>

          </thead>

          <tbody>

            {documents.map(doc => (

              <tr key={doc.id}>

                <td style={tdStyle}>
                  {doc.title}
                </td>

                <td style={tdStyle}>
                  {doc.fileType}
                </td>

                <td style={tdStyle}>
                  {doc.patientId}
                </td>

                <td style={tdStyle}>

                  <div
                    style={{
                      display: 'flex',
                      gap: '10px'
                    }}
                  >

                    <button
                      onClick={() => handleView(doc)}
                      style={viewBtn}
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleDelete(doc.id)}
                      style={deleteBtn}
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {showModal && (

        <div style={modalOverlay}>

          <div style={modalBox}>

            <h2>Upload Document</h2>

            <input
              type="text"
              name="patientId"
              placeholder="Patient UUID"
              value={form.patientId}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="title"
              placeholder="Document Title"
              value={form.title}
              onChange={handleChange}
              style={inputStyle}
            />

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              style={inputStyle}
            >
              <option>PDF</option>
              <option>Image</option>
              <option>Report</option>
            </select>

            <input
              type="file"
              onChange={handleFileChange}
              style={inputStyle}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px'
              }}
            >

              <button
                onClick={() => setShowModal(false)}
                style={cancelBtn}
              >
                Cancel
              </button>

              <button
                onClick={handleUpload}
                style={uploadBtn}
              >
                Upload
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* STYLES */

const tableContainer = {
  background: '#161b22',
  borderRadius: '18px',
  overflow: 'hidden',
  border: '1px solid #30363d'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};

const thStyle = {
  textAlign: 'left',
  padding: '18px',
  color: '#8b949e',
  background: '#21262d'
};

const tdStyle = {
  padding: '18px',
  borderBottom: '1px solid #30363d'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '16px',
  background: '#0d1117',
  border: '1px solid #30363d',
  borderRadius: '10px',
  color: '#fff',
  boxSizing: 'border-box'
};

const uploadBtn = {
  background: '#238636',
  border: 'none',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: '10px',
  cursor: 'pointer'
};

const cancelBtn = {
  background: '#21262d',
  border: 'none',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: '10px',
  cursor: 'pointer'
};

const viewBtn = {
  background: '#1f6feb',
  border: 'none',
  color: '#fff',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer'
};

const deleteBtn = {
  background: '#da3633',
  border: 'none',
  color: '#fff',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer'
};

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const modalBox = {
  width: '420px',
  background: '#161b22',
  borderRadius: '20px',
  padding: '30px',
  border: '1px solid #30363d'
};
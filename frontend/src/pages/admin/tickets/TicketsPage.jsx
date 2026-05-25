import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TicketsPage() {

  const navigate = useNavigate();

  /* MODAL */
  const [showModal, setShowModal] = useState(false);

  /* TICKETS */
  const [tickets, setTickets] = useState([
    {
      id: 1,
      patient: 'John Smith',
      subject: 'Payment Issue',
      priority: 'High',
      status: 'Open'
    },
    {
      id: 2,
      patient: 'Alice Brown',
      subject: 'Appointment Reschedule',
      priority: 'Medium',
      status: 'Closed'
    }
  ]);

  /* FORM */
  const [form, setForm] = useState({
    patient: '',
    subject: '',
    priority: 'Low',
    status: 'Open'
  });

  /* HANDLE INPUT */
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* CREATE TICKET */
  const handleCreateTicket = () => {

    if (
      !form.patient ||
      !form.subject
    ) {
      alert('Please fill all fields');
      return;
    }

    const newTicket = {
      id: Date.now(),
      ...form
    };

    setTickets([
      newTicket,
      ...tickets
    ]);

    /* RESET */
    setForm({
      patient: '',
      subject: '',
      priority: 'Low',
      status: 'Open'
    });

    setShowModal(false);

    alert('Ticket Created Successfully');
  };

  /* DELETE */
  const handleDeleteTicket = (id) => {

    const confirmDelete = window.confirm(
      'Delete this ticket?'
    );

    if (!confirmDelete) return;

    setTickets(
      tickets.filter(
        ticket => ticket.id !== id
      )
    );
  };

  return (
    <div>

      {/* HEADER */}
      <div style={headerStyle}>

        <div>

          <h1 style={titleStyle}>
            Support Tickets
          </h1>

          <p style={subtitleStyle}>
            Manage all hospital support tickets
          </p>

        </div>

        <button
          style={addBtn}
          onClick={() => setShowModal(true)}
        >
          + New Ticket
        </button>

      </div>

      {/* EMPTY STATE */}
      {tickets.length === 0 ? (

        <div style={emptyState}>

          <h2 style={emptyTitle}>
            No Tickets Found
          </h2>

          <p style={emptyText}>
            Create your first support ticket
          </p>

        </div>

      ) : (

        /* TABLE */
        <div style={tableContainer}>

          <table style={tableStyle}>

            <thead>

              <tr>

                <th style={thStyle}>Patient</th>
                <th style={thStyle}>Subject</th>
                <th style={thStyle}>Priority</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>

              </tr>

            </thead>

            <tbody>

              {tickets.map(ticket => (

                <tr key={ticket.id}>

                  <td style={tdStyle}>
                    {ticket.patient}
                  </td>

                  <td style={tdStyle}>
                    {ticket.subject}
                  </td>

                  <td style={tdStyle}>

                    <span
                      style={{
                        ...badgeStyle,

                        background:
                          ticket.priority === 'High'
                            ? '#3a1515'
                            : ticket.priority === 'Medium'
                            ? '#3b2f12'
                            : '#16351f',

                        color:
                          ticket.priority === 'High'
                            ? '#ff7b72'
                            : ticket.priority === 'Medium'
                            ? '#d29922'
                            : '#3fb950'
                      }}
                    >
                      {ticket.priority}
                    </span>

                  </td>

                  <td style={tdStyle}>

                    <span
                      style={{
                        ...badgeStyle,

                        background:
                          ticket.status === 'Closed'
                            ? '#16351f'
                            : '#3b2f12',

                        color:
                          ticket.status === 'Closed'
                            ? '#3fb950'
                            : '#d29922'
                      }}
                    >
                      {ticket.status}
                    </span>

                  </td>

                  <td style={tdStyle}>

                    <div style={actionGroup}>

                      <button
                        style={viewBtn}
                        onClick={() => {

                          console.log(
                            `/admin/tickets/${ticket.id}`
                          );

                          navigate(
                            `/admin/tickets/${ticket.id}`
                          );
                        }}
                      >
                        View
                      </button>

                      <button
                        style={deleteBtn}
                        onClick={() =>
                          handleDeleteTicket(ticket.id)
                        }
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

      )}

      {/* MODAL */}
      {showModal && (

        <div style={modalOverlay}>

          <div style={modalBox}>

            <h2 style={modalTitle}>
              Create Ticket
            </h2>

            <input
              type="text"
              name="patient"
              placeholder="Patient Name"
              value={form.patient}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="subject"
              placeholder="Ticket Subject"
              value={form.subject}
              onChange={handleChange}
              style={inputStyle}
            />

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              style={inputStyle}
            >

              <option>Low</option>
              <option>Medium</option>
              <option>High</option>

            </select>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={inputStyle}
            >

              <option>Open</option>
              <option>Closed</option>

            </select>

            <div style={modalActions}>

              <button
                style={cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                style={saveBtn}
                onClick={handleCreateTicket}
              >
                Create Ticket
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* STYLES */

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
  flexWrap: 'wrap',
  gap: '20px'
};

const titleStyle = {
  color: '#fff',
  margin: 0
};

const subtitleStyle = {
  color: '#8b949e',
  marginTop: '8px'
};

const addBtn = {
  background: '#1f6feb',
  border: 'none',
  color: '#fff',
  padding: '12px 18px',
  borderRadius: '12px',
  cursor: 'pointer',
  fontWeight: '600'
};

const tableContainer = {
  background: '#161B22',
  border: '1px solid #30363d',
  borderRadius: '18px',
  overflowX: 'auto'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: '700px'
};

const thStyle = {
  textAlign: 'left',
  padding: '18px',
  color: '#8b949e',
  borderBottom: '1px solid #30363d',
  fontSize: '14px'
};

const tdStyle = {
  padding: '18px',
  color: '#fff',
  borderBottom: '1px solid #222'
};

const badgeStyle = {
  padding: '6px 12px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: '600'
};

const actionGroup = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap'
};

const viewBtn = {
  background: '#1f6feb',
  border: 'none',
  color: '#fff',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600'
};

const deleteBtn = {
  background: '#da3633',
  border: 'none',
  color: '#fff',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600'
};

const emptyState = {
  background: '#161B22',
  border: '1px solid #30363d',
  borderRadius: '20px',
  padding: '60px 20px',
  textAlign: 'center'
};

const emptyTitle = {
  color: '#fff',
  marginBottom: '10px'
};

const emptyText = {
  color: '#8b949e'
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
  justifyContent: 'center',
  zIndex: 1000
};

const modalBox = {
  width: '400px',
  maxWidth: '95%',
  background: '#161B22',
  border: '1px solid #30363d',
  borderRadius: '20px',
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
};

const modalTitle = {
  color: '#fff',
  margin: 0
};

const inputStyle = {
  background: '#0D1117',
  border: '1px solid #30363d',
  color: '#fff',
  padding: '12px',
  borderRadius: '10px',
  outline: 'none'
};

const modalActions = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  marginTop: '10px'
};

const cancelBtn = {
  background: '#21262d',
  border: 'none',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: '10px',
  cursor: 'pointer'
};

const saveBtn = {
  background: '#238636',
  border: 'none',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: '600'
};
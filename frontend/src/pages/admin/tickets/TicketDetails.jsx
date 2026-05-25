import { useParams, useNavigate } from 'react-router-dom';

export default function TicketDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={container}>

      <button
        style={backBtn}
        onClick={() => navigate('/admin/tickets')}
      >
        ← Back
      </button>

      <div style={card}>

        <h1 style={title}>
          Ticket #{id}
        </h1>

        <p style={text}>
          Patient: John Smith
        </p>

        <p style={text}>
          Subject: Payment Issue
        </p>

        <p style={text}>
          Priority: High
        </p>

        <p style={text}>
          Status: Open
        </p>

      </div>

    </div>
  );
}

const container = {
  padding: '20px'
};

const backBtn = {
  background: '#21262d',
  border: 'none',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  marginBottom: '20px'
};

const card = {
  background: '#161B22',
  border: '1px solid #30363d',
  borderRadius: '16px',
  padding: '25px'
};

const title = {
  color: '#fff',
  marginBottom: '20px'
};

const text = {
  color: '#c9d1d9',
  marginBottom: '10px'
};
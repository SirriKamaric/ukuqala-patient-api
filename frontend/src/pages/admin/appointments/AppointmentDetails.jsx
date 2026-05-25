export default function AppointmentDetails() {

  return (
    <div>

      <h1 style={titleStyle}>
        Appointment Details
      </h1>

      <div style={cardStyle}>

        <p style={textStyle}>
          Patient: John Smith
        </p>

        <p style={textStyle}>
          Doctor: Dr Sarah Johnson
        </p>

        <p style={textStyle}>
          Date: 2026-06-01
        </p>

        <p style={textStyle}>
          Time: 10:00 AM
        </p>

        <p style={textStyle}>
          Status: Completed
        </p>

      </div>

    </div>
  );
}

/* STYLES */

const titleStyle = {
  color: '#fff',
  marginBottom: '20px'
};

const cardStyle = {
  background: '#161B22',
  border: '1px solid #30363d',
  borderRadius: '18px',
  padding: '24px'
};

const textStyle = {
  color: '#fff',
  marginBottom: '12px'
};
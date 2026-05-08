const VitalsHistory = ({ vitals }) => {
  if (vitals.length === 0) {
    return <p className="empty-vitals">No vitals recorded yet.</p>;
  }

  return (
    <table className="vitals-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>HR (bpm)</th>
          <th>BP (mmHg)</th>
          <th>Temp (°C)</th>
        </tr>
      </thead>
      <tbody>
        {vitals.map((v, index) => (
          <tr key={index}>
            <td>{new Date(v.recorded_at).toLocaleString()}</td>
            <td>{v.heart_rate}</td>
            <td>{v.blood_pressure}</td>
            <td>{v.temperature}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VitalsHistory;
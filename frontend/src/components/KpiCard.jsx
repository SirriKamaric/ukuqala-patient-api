export const KpiCard = ({ title, value, color }) => (
  <div className={`stat-card ${color}-border`}>
    <p className="stat-label">{title}</p>
    <p className="stat-number">{value}</p>
  </div>
);
export const KpiCard = ({
  title,
  value,
  icon,
  status,
  color = 'blue',
}) => {
  return (
    <div className={`kpi-card ${color}`}>
      <div className="kpi-card-top">
        <div className="kpi-icon-wrapper">
          <span className="kpi-icon">{icon}</span>
        </div>

        {status && (
          <span className="kpi-status">
            {status}
          </span>
        )}
      </div>

      <div className="kpi-card-body">
        <p className="kpi-title">
          {title}
        </p>

        <h2 className="kpi-value">
          {value}
        </h2>
      </div>
    </div>
  );
};
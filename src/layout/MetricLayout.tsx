import "../styles/MetricLayout.css";

interface MetricLayoutProps {
  title: string;
  timeOptionInputs?: React.ReactElement;
  invalidYearFormat?: boolean;
  buttonGroup: React.ReactElement;
  metricCard: React.ReactElement;
  graph: React.ReactElement;
}

const MetricLayout: React.FC<MetricLayoutProps> = ({
  title,
  timeOptionInputs,
  invalidYearFormat,
  buttonGroup,
  metricCard,
  graph,
}) => {
  return (
    <div className="metric-layout">
      <h3 className="metric-title">{title}</h3>
      <div className="time-period-buttons">
        <div>{buttonGroup}</div>
        <div>{timeOptionInputs}</div>
        <div className={invalidYearFormat ? "invalid-year" : ""}>
          {invalidYearFormat ? "Please enter valid year(YYYY)" : ""}
        </div>
      </div>
      <div className="metric-card">{metricCard}</div>
      <div className="graph">{graph}</div>
    </div>
  );
};

export default MetricLayout;

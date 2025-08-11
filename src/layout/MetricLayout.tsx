import "../styles/MetricLayout.css";

interface MetricLayoutProps {
  title: string;
  buttonGroup: React.ReactElement;
  metricCard: React.ReactElement;
  graph: React.ReactElement;
  timeOptionInputs?: React.ReactElement;
  invalidYearFormat?: boolean;
  noDataAlert?: boolean;
}

const MetricLayout: React.FC<MetricLayoutProps> = ({
  title,
  timeOptionInputs,
  invalidYearFormat,
  noDataAlert,
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
        <div className={noDataAlert ? "no-data-alert" : ""}>
          {noDataAlert ? "Data does not exist for the provided year" : ""}
        </div>
      </div>
      <div className="metric-card">{metricCard}</div>
      <div className="graph">{graph}</div>
    </div>
  );
};

export default MetricLayout;

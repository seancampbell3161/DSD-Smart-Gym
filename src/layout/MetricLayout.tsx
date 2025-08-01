import "../styles/MetricLayout.css";

interface MetricLayoutProps {
  title: string;
  buttonGroup: React.ReactElement;
  metricCard: React.ReactElement;
  graph: React.ReactElement;

}

const MetricLayout: React.FC<MetricLayoutProps> = ({title, buttonGroup, metricCard, graph}) => {
  return (
    <div className="metric-layout"> 
    <h3 className="metric-title">{title}</h3>
    <div className="time-period-buttons">{buttonGroup}</div>
    <div className="metric-card">{metricCard}</div>
    <div className="graph">{graph}</div>
    </div>
  );
};

export default MetricLayout;
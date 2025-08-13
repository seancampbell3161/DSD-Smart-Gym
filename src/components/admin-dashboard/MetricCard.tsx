import type { MetricCardProps } from "../../types/MetricCard.interface";
import "../../styles/MetricCard.css";

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  timeInterval,
  data,
}) => {
  return (
    <div className="membership-growth-metric-card">
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>{timeInterval}</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => {
            return (
              <tr>
                <td>{entry.x}</td>
                <td>{entry.y}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MetricCard;

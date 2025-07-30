import PeakHoursMap from "./PeakHoursMap";
import "../../styles/PeakHours.css";

const PeakHours: React.FC = () => {
  return (
    <div className="peak-hours-container">
      <h2 id="peak-hours-title">Peak Hours</h2>
      <PeakHoursMap />
    </div>
  );
};
export default PeakHours;

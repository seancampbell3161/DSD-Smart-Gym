import { useState } from "react";
import PeakHoursMap from "./PeakHoursMap";
import TimePeriodButtons from "./TimePeriodButtons";
import type { TimeOptions } from "../../types/Analytics.interface";
import "../../styles/PeakHours.css";

const PeakHours: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<TimeOptions>({
    button: "Monthly",
    tableHeader: "Month",
  });

  return (
    <div className="peak-hours-container">
      <h2 id="peak-hours-title">Peak Hours</h2>
      <div className="time-period-buttons">
        <TimePeriodButtons
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
        />
      </div>
      <PeakHoursMap />
    </div>
  );
};
export default PeakHours;

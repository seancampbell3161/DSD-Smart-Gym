import { useState } from "react";
import PeakHoursMap from "./PeakHoursMap";
import "../../styles/PeakHours.css";
import YearlyRange from "./YearlyRange";

const PeakHours: React.FC = () => {
  const [invalidYearFormat, setInvalidYearFormat] = useState<boolean>(false);

  const pattern: RegExp = /^\d{4}$/;

  return (
    <div className="peak-hours-container">
      <h2 id="peak-hours-title">Peak Hours</h2>
      <div className="yearly-range-container">
        <YearlyRange
          pattern={pattern}
          setInvalidYearFormat={setInvalidYearFormat}
        />
        <div className={invalidYearFormat ? "invalid-year" : ""}>
          {invalidYearFormat ? "Please enter valid year(YYYY)" : ""}
        </div>
      </div>
      <PeakHoursMap />
    </div>
  );
};
export default PeakHours;

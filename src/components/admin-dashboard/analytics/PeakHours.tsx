import { useEffect, useState } from "react";
import PeakHoursMap from "./PeakHoursMap";
import TimePeriodButtons from "./TimePeriodButtons";
import { format } from "date-fns";
import type {
  PeakHoursData,
  TimeOptions,
} from "../../../types/Analytics.interface";
import "../../../styles/PeakHours.css";
import ApiHandler from "../../../utils/ApiHandler";

const PeakHours: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<TimeOptions>({
    button: "Monthly",
    tableHeader: "Month",
  });
  const [data, setData] = useState<PeakHoursData[]>([]);

  const compilePeakHours = async () => {
    const endpoint =
      "/adminAnalytics/peak-hours/" +
      (timePeriod.button === "Yearly" ? "yearly" : "monthly");

    try {
      const { peakHours } = await ApiHandler.get(endpoint);
      setData(peakHours);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    compilePeakHours();
  }, [timePeriod]);

  return (
    <div className="peak-hours-container">
      <h2 id="peak-hours-title">
        {timePeriod.button === "Yearly"
          ? String(new Date().getFullYear())
          : String(format(new Date(), "MMMM"))}{" "}
        Peak Hours
      </h2>
      <div className="time-period-buttons">
        <TimePeriodButtons
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
        />
      </div>
      <PeakHoursMap data={data} />
    </div>
  );
};
export default PeakHours;

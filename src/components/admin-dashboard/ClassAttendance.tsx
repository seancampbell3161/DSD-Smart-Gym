import { useEffect, useState } from "react";
import type { TimeOptions } from "../../types/Analytics.interface.ts";
import type { ClassDataProps } from "../../types/ClassAttendance.interface.ts";
import TimePeriodButtons from "./TimePeriodButtons";
import ClassAttendanceMetricCard from "./ClassAttendanceMetricCard.tsx";
import MetricLayout from "../../layout/MetricLayout.tsx";
import ClassAttwnsanceChart from "./ClassAttendanceChart.tsx";
import YearlyRange from "./YearlyRange.tsx";
import SingleYearSelector from "./SingleYearSelector.tsx";

const ClassAttendance: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<TimeOptions>({
    button: "Monthly",
    tableHeader: "Month",
  });
  const [countData, setCountData] = useState<ClassDataProps[]>([]);
  const [invalidYearFormat, setInvalidYearFormat] = useState<boolean>(false);

  const pattern: RegExp = /^\d{4}$/;

  const countMembersByYear = () => {
    const data = [
      {
        timePoint: "2003",
        boxing: 30,
        cycling: 50,
        yoga: 20,
        HIIT: 46,
      },
      {
        timePoint: "2000",
        boxing: 50,
        cycling: 30,
        yoga: 10,
        HIIT: 35,
      },
      {
        timePoint: "2004",
        boxing: 40,
        cycling: 32,
        yoga: 20,
        HIIT: 36,
      },
    ];

    setCountData(data);
  };

  const countMembersByMonth = () => {
    const data = [
      {
        timePoint: "Feb",
        boxing: 30,
        cycling: 50,
        yoga: 20,
        HIIT: 46,
      },
      {
        timePoint: "Mar",
        boxing: 50,
        cycling: 30,
        yoga: 10,
        HIIT: 35,
      },
      {
        timePoint: "Apr",
        boxing: 40,
        cycling: 32,
        yoga: 20,
        HIIT: 36,
      },
    ];

    setCountData(data);
  };

  useEffect(() => {
    switch (timePeriod.button) {
      case "Yearly":
        countMembersByYear();
        break;
      case "Monthly":
        countMembersByMonth();
        break;
    }
  }, [timePeriod]);

  return (
    <>
      <MetricLayout
        title={"Class Attendance"}
        timeOptionInputs={
          timePeriod.button === "Yearly" ? (
            <YearlyRange
              pattern={pattern}
              setInvalidYearFormat={setInvalidYearFormat}
            />
          ) : (
            <SingleYearSelector pattern={pattern} setInvalidYearFormat={setInvalidYearFormat}/>
          )
        }
        invalidYearFormat={invalidYearFormat}        
        buttonGroup={
          <TimePeriodButtons
            timePeriod={timePeriod}
            setTimePeriod={setTimePeriod}
          />
        }
        metricCard={
          <ClassAttendanceMetricCard
            title={"Class Attendance"}
            data={countData}
          />
        }
        graph={<ClassAttwnsanceChart data={countData} />}
      />
    </>
  );
};
export default ClassAttendance;

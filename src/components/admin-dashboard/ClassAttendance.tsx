import { useEffect, useState } from "react";
import type { TimeOptions } from "../../types/Analytics.interface.ts";
import type {
  ComparisonCountData,
  TwoSelectedYears,
} from "../../types/Analytics.interface.ts";
import TimePeriodButtons from "./TimePeriodButtons";
import MetricLayout from "../../layout/MetricLayout.tsx";
import MultiLineLineChart from "./MultiLineLineChart.tsx";
import YearlyRange from "./YearlyRange.tsx";
import SingleYearSelector from "./SingleYearSelector.tsx";
import ComparisonTable from "./ComparisonTable.tsx";
import ApiHandler from "../../utils/ApiHandler.ts";

const ClassAttendance: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<TimeOptions>({
    button: "Monthly",
    tableHeader: "Month",
  });
  const [comparisonCountData, setComparisonCountData] = useState<
    ComparisonCountData[]
  >([]);
  const [selectedYears, setSelectedYears] = useState<TwoSelectedYears>({
    yearOne: "",
    yearTwo: "",
  });
  const [invalidYearFormat, setInvalidYearFormat] = useState<boolean>(false);

  const pattern: RegExp = /^\d{4}$/;

  const countMembersByYear = async () => {
    try {
      const { yearOne, yearTwo } = selectedYears;
      const paramString =
        yearOne && yearTwo ? `?startYear=${yearOne}&endYear=${yearTwo}` : "";
      const endpoint = "/adminAnalytics/getYearlyClassAttendance" + paramString;

      const data = await ApiHandler.get(endpoint);
      if (Array.isArray(data)) {
        const formattedData = data.map((entry) => {
          const formattedEntry: ComparisonCountData = { timePoint: entry.year };
          for (const activity of entry.items) {
            formattedEntry[activity.classType] = activity.count;
          }
          return formattedEntry;
        });
        setComparisonCountData(formattedData);
      } else {
        const formattedData: ComparisonCountData = { timePoint: data.year };
        for (const activity of data.items) {
          formattedData[activity.classType] = activity.count;
        }
        setComparisonCountData([formattedData]);
      }
    } catch (error) {
      console.error(error);
    }
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

    setComparisonCountData(data);
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
  }, [timePeriod, selectedYears]);

  return (
    <>
      <MetricLayout
        title={"Class Attendance"}
        timeOptionInputs={
          timePeriod.button === "Yearly" ? (
            <YearlyRange
              pattern={pattern}
              setInvalidYearFormat={setInvalidYearFormat}
              setSelectedYears={setSelectedYears}
            />
          ) : (
            <SingleYearSelector
              pattern={pattern}
              setInvalidYearFormat={setInvalidYearFormat}
            />
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
          <ComparisonTable
            title={"Number of Attendees"}
            data={comparisonCountData}
          />
        }
        graph={<MultiLineLineChart data={comparisonCountData} />}
      />
    </>
  );
};
export default ClassAttendance;

import { useEffect, useState } from "react";
import type { TimeOptions } from "../../types/Analytics.interface.ts";
import type {
  ComparisonCountData,
  TwoSelectedYears,
  OneSelectedYear,
} from "../../types/Analytics.interface.ts";
import TimePeriodButtons from "./TimePeriodButtons";
import MetricLayout from "../../layout/MetricLayout.tsx";
import MultiLineLineChart from "./MultiLineLineChart.tsx";
import YearlyRange from "./YearlyRange.tsx";
import SingleYearSelector from "./SingleYearSelector.tsx";
import ComparisonTable from "./ComparisonTable.tsx";
import ApiHandler from "../../utils/ApiHandler.ts";

interface InputEntry {
  year: string;
  month: string;
  classes: {
    classType: string;
    count: number;
  }[];
}

const ClassAttendance: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<TimeOptions>({
    button: "Monthly",
    tableHeader: "Month",
  });
  const [yearlyComparisonCountData, setYearlyComparisonCountData] = useState<
    ComparisonCountData[]
  >([]);
  const [monthlyComparisonCountData, setMonthlyComparisonCountData] = useState<
    ComparisonCountData[]
  >([]);
  const [selectedYears, setSelectedYears] = useState<TwoSelectedYears>({
    yearOne: "",
    yearTwo: "",
  });
  const [selectedSingleYear, setSelectedSingleYear] =
    useState<OneSelectedYear>("");

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
        setYearlyComparisonCountData(formattedData);
      } else {
        const formattedData: ComparisonCountData = { timePoint: data.year };
        for (const activity of data.items) {
          formattedData[activity.classType] = activity.count;
        }
        setYearlyComparisonCountData([formattedData]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const countMembersByMonth = async () => {
    try {
      const paramsString = selectedSingleYear
        ? `?startYear=${selectedSingleYear}&endYear=${selectedSingleYear}`
        : "";
      const endpoint =
        "/adminAnalytics/getMonthlyClassAttendance" + paramsString;

      const data = await ApiHandler.get(endpoint);
      const formattedData = data.map((entry: InputEntry) => {
        const formattedEntry: ComparisonCountData = { timePoint: entry.month };
        for (const activity of entry.classes) {
          formattedEntry[activity.classType] = activity.count;
        }
        return formattedEntry;
      });

      setMonthlyComparisonCountData(formattedData);
    } catch (error) {
      console.error(error);
    }
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
  }, [timePeriod, selectedYears, selectedSingleYear]);

  return (
    <>
      {timePeriod.button === "Yearly" ? (
        <MetricLayout
          title={"Class Attendance"}
          timeOptionInputs={
            <YearlyRange
              pattern={pattern}
              setInvalidYearFormat={setInvalidYearFormat}
              setSelectedYears={setSelectedYears}
            />
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
              data={yearlyComparisonCountData}
            />
          }
          graph={<MultiLineLineChart data={yearlyComparisonCountData} />}
        />
      ) : (
        <MetricLayout
          title={"Class Attendance"}
          timeOptionInputs={
            <SingleYearSelector
              pattern={pattern}
              setInvalidYearFormat={setInvalidYearFormat}
              setSingleSelectedYear={setSelectedSingleYear}
            />
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
              title={`Number of ${
                selectedSingleYear
                  ? selectedSingleYear
                  : new Date().getFullYear()
              } Attendees`}
              data={monthlyComparisonCountData}
            />
          }
          graph={<MultiLineLineChart data={monthlyComparisonCountData} />}
        />
      )}
    </>
  );
};
export default ClassAttendance;

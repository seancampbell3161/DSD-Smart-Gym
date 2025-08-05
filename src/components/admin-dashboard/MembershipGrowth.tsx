import { useEffect, useState } from "react";
import type {
  TimeOptions,
  coordinateProps,
} from "../../types/Analytics.interface.ts";
import TimePeriodButtons from "./TimePeriodButtons";
import MetricCard from "./MetricCard";
import SingleLineChart from "./SingleLineChart";
import MetricLayout from "../../layout/MetricLayout.tsx";
import YearlyRange from "./YearlyRange.tsx";
import YearlyComparison from "./YearComparison.tsx";
import MultiLineAreaChart from "./MultiLineAreaChart.tsx";

interface ComparisonCountData {
  timePoint: string;
  [key: string]: number | undefined | string;
}

const MembershipGrowth: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<TimeOptions>({
    button: "Monthly",
    tableHeader: "Month",
  });
  const [countData, setCountData] = useState<coordinateProps[]>([]);
  const [comparisonCountData, setComparisonCountData] = useState<
    ComparisonCountData[]
  >([]);
  const [invalidYearFormat, setInvalidYearFormat] = useState<boolean>(false);

  const pattern: RegExp = /^\d{4}$/;

  // interface ApiResponse {
  //   _id: string;
  //   name: string;
  //   email: string;
  //   role: string;
  //   gym_id: string;
  // }

  // const fetchAllMembers = async (): Promise<ApiResponse> => {
  //     const response = await fetch('');
  //     const data = await response.json();
  // }

  const countMembersByYear = (/* members: ApiResponse[] */) => {
    const data = [
      { x: "2003", y: 59 },
      { x: "1990", y: 41 },
      { x: "1997", y: 38 },
      { x: "1999", y: 66 },
      { x: "1996", y: 96 },
      { x: "2011", y: 72 },
      { x: "1996", y: 38 },
      { x: "1995", y: 72 },
      { x: "2004", y: 31 },
      { x: "2005", y: 2 },
      { x: "1999", y: 41 },
      { x: "1990", y: 66 },
      { x: "2005", y: 51 },
      { x: "2008", y: 51 },
      { x: "1989", y: 23 },
      { x: "2007", y: 27 },
      { x: "1993", y: 70 },
      { x: "1997", y: 58 },
      { x: "1993", y: 100 },
      { x: "2000", y: 48 },
    ];
    setCountData(data);
  };

  const countMembersByMonth = () => {
    // x = month, y = memberCount
    const data = [
      { timePoint: "Jan", "2024": 12, "2025": 19 },
      { timePoint: "Feb", "2024": 8, "2025": 22 },
      { timePoint: "Mar", "2024": 15, "2025": 18 },
      { timePoint: "Apr", "2024": 10, "2025": 14 },
      { timePoint: "May", "2024": 17, "2025": 21 },
      { timePoint: "Jun", "2024": 14, "2025": 16 },
      { timePoint: "Jul", "2024": 11, "2025": 20 },
      { timePoint: "Aug", "2024": 9, "2025": 17 },
      { timePoint: "Sep", "2024": 13, "2025": 23 },
      { timePoint: "Oct", "2024": 16, "2025": 15 },
      { timePoint: "Nov", "2024": 7, "2025": 10 },
      { timePoint: "Dec", "2024": 20, "2025": 12 },
    ];
    setComparisonCountData(data);
  };

  useEffect(() => {
    // TODO: Get all members & wrap in higher order function
    // const members = fetchAllMembers();
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
      {timePeriod.button === "Yearly" ? (
        <MetricLayout
          title={"Membership Growth"}
          buttonGroup={
            <TimePeriodButtons
              timePeriod={timePeriod}
              setTimePeriod={setTimePeriod}
            />
          }
          invalidYearFormat={invalidYearFormat}
          timeOptionInputs={
            <YearlyRange
              pattern={pattern}
              setInvalidYearFormat={setInvalidYearFormat}
            />
          }
          graph={<SingleLineChart data={countData} />}
          metricCard={
            <MetricCard
              title={"Membership Growth"}
              timeInterval={timePeriod.tableHeader}
              data={countData}
            />
          }
        />
      ) : (
        <MetricLayout
          title={"Membership Growth"}
          buttonGroup={
            <TimePeriodButtons
              timePeriod={timePeriod}
              setTimePeriod={setTimePeriod}
            />
          }
          invalidYearFormat={invalidYearFormat}
          timeOptionInputs={
            <YearlyComparison
              pattern={pattern}
              setInvalidYearFormat={setInvalidYearFormat}
            />
          }
          graph={
            <MultiLineAreaChart
              data={comparisonCountData}
              key1={"2024"}
              key2={"2025"}
            />
          }
          metricCard={
            <MetricCard
              title={"Membership Growth"}
              timeInterval={timePeriod.tableHeader}
              data={countData}
            />
          }
        />
      )}
    </>
  );
};
export default MembershipGrowth;

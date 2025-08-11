import { useEffect, useState } from "react";
import type {
  TimeOptions,
  coordinateProps,
  ComparisonCountData,
  TwoSelectedYears,
} from "../../types/Analytics.interface.ts";
import TimePeriodButtons from "./TimePeriodButtons";
import MetricCard from "./MetricCard";
import SingleLineChart from "./SingleLineChart";
import MetricLayout from "../../layout/MetricLayout.tsx";
import YearlyRange from "./YearlyRange.tsx";
import YearComparison from "./YearComparison.tsx";
import MultiLineAreaChart from "./MultiLineAreaChart.tsx";
import ComparisonTable from "./ComparisonTable.tsx";
import ApiHandler from "../../utils/ApiHandler.ts";

const MembershipGrowth: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<TimeOptions>({
    button: "Monthly",
    tableHeader: "Month",
  });
  const [selectedYears, setSelectedYears] = useState<TwoSelectedYears>({
    yearOne: "",
    yearTwo: "",
  });
  const [selectedComparisonYears, setSelectedComparisonYears] =
    useState<TwoSelectedYears>({ yearOne: "", yearTwo: "" });
  const [countData, setCountData] = useState<coordinateProps[]>([]);
  const [comparisonCountData, setComparisonCountData] = useState<
    ComparisonCountData[]
  >([]);
  const [invalidYearFormat, setInvalidYearFormat] = useState<boolean>(false);

  const metricTitle: string = "Membership Growth";
  const tableTitle: string = "Total Members";
  const pattern: RegExp = /^\d{4}$/;

  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const countMembersByYear = async () => {
    try {
      const { yearOne, yearTwo } = selectedYears;
      const paramString =
        yearOne && yearTwo ? `?startYear=${yearOne}&endYear=${yearTwo}` : "";
      const endpoint =
        "/adminAnalytics/getYearlyMembershipGrowth" + paramString;

      const data = await ApiHandler.get(endpoint);
      const formattedData = data.map(
        (entry: { count: number; year: string }) => ({
          x: entry.year,
          y: entry.count,
        })
      );
      setCountData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const countMembersByMonth = async () => {
    try {
      const { yearOne, yearTwo } = selectedComparisonYears;
      const paramString =
        yearOne && yearTwo ? `?startYear=${yearOne}&endYear=${yearTwo}` : "";
      const endpoint =
        "/adminAnalytics/getMonthlyMembershipGrowth" + paramString;

      const response = await ApiHandler.get(endpoint);

      if (Array.isArray(response)) {
        const annualData: Record<string, Record<string, number>> = {};
        response.forEach((yearDataSet) => {
          const { data, year } = yearDataSet;
          annualData[year] = data.reduce(
            (
              monthlyCount: Record<string, number>,
              monthlyData: { month: string; count: number }
            ) => {
              return {
                ...monthlyCount,
                [monthlyData.month]: monthlyData.count,
              };
            },
            {}
          );
        });
        const formattedData: ComparisonCountData[] = [];

        months.forEach((month) => {
          const dataSet: ComparisonCountData = { timePoint: month };
          for (const set in annualData) {
            const year = annualData[set];
            if (year[month]) {
              dataSet[set] = year[month];
            }
          }
          if (Object.keys(dataSet).length > 1) formattedData.push(dataSet);
        });

        setComparisonCountData(formattedData);
      } else {
        const { data, year } = response;

        const formattedData = data.map(
          (entry: { count: number; month: string }) => {
            const formattedEntry: {
              timePoint: string;
              [year: string]: number | string;
            } = { timePoint: entry.month };
            formattedEntry[year] = entry.count;
            return formattedEntry;
          }
        );
        setComparisonCountData(formattedData);
      }
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
  }, [timePeriod, selectedYears, selectedComparisonYears]);

  return (
    <>
      {timePeriod.button === "Yearly" ? (
        <MetricLayout
          title={metricTitle}
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
              setSelectedYears={setSelectedYears}
            />
          }
          graph={<SingleLineChart data={countData} />}
          metricCard={
            <MetricCard
              title={tableTitle}
              timeInterval={timePeriod.tableHeader}
              data={countData}
            />
          }
        />
      ) : (
        <MetricLayout
          title={metricTitle}
          buttonGroup={
            <TimePeriodButtons
              timePeriod={timePeriod}
              setTimePeriod={setTimePeriod}
            />
          }
          invalidYearFormat={invalidYearFormat}
          timeOptionInputs={
            <YearComparison
              pattern={pattern}
              setInvalidYearFormat={setInvalidYearFormat}
              setSelectedYears={setSelectedComparisonYears}
            />
          }
          graph={
            <MultiLineAreaChart
              data={comparisonCountData}
              key1={selectedComparisonYears.yearOne || ""}
              key2={
                selectedComparisonYears.yearTwo || "" + new Date().getFullYear()
              }
            />
          }
          metricCard={
            <ComparisonTable title={tableTitle} data={comparisonCountData} />
          }
        />
      )}
    </>
  );
};
export default MembershipGrowth;

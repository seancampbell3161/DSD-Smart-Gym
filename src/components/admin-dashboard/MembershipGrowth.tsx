import { useEffect, useState } from "react";
import type { TimeOptions, coordinateProps } from "../../types/Analytics.interface.ts";
import TimePeriodButtons from "./TimePeriodButtons";
import MetricCard from "./MetricCard";
import SingleLineChart from "./SingleLineChart";
import MetricLayout from "../../layout/MetricLayout.tsx";


const MembershipGrowth: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<TimeOptions>({button: "Monthly", tableHeader: "Month"});
  const [countData, setCountData] = useState<coordinateProps[]>([]);


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
    // x = year, y = memberCount
    const data = [
      {"x":"2003","y":59},
      {"x":"1990","y":41},
      {"x":"1997","y":38},
      {"x":"1999","y":66},
      {"x":"1996","y":96},
      {"x":"2011","y":72},
      {"x":"1996","y":38},
      {"x":"1995","y":72},
      {"x":"2004","y":31},
      {"x":"2005","y":2},
      {"x":"1999","y":41},
      {"x":"1990","y":66},
      {"x":"2005","y":51},
      {"x":"2008","y":51},
      {"x":"1989","y":23},
      {"x":"2007","y":27},
      {"x":"1993","y":70},
      {"x":"1997","y":58},
      {"x":"1993","y":100},
      {"x":"2000","y":48}
    ]
    // setCountData() members.map((member) => {"x": 2005, "y": 10})
    setCountData(data)
  }

  const countMembersByMonth = () => {
    // x = month, y = memberCount
    const data = [
      {"x":"Jan","y":59},
      {"x":"Feb","y":41},
      {"x":"Mar","y":38},
      {"x":"Apr","y":66},
      {"x":"May","y":96},
      {"x":"Jun","y":72},
      {"x":"Jul","y":38},
      {"x":"Aug","y":72},
      {"x":"Sep","y":31},
      {"x":"Oct","y":2},
      {"x":"Nov","y":41},
      {"x":"Dec","y":66},
    ]

    setCountData(data);
  }

  const countMembersByWeek = () => {
    
  }  

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
    case "Weekly":
      countMembersByWeek();
      break;
    }
  }, [timePeriod])

  return (
    <>
      <MetricLayout
        title={"Membership Growth"}
        buttonGroup={<TimePeriodButtons timePeriod={timePeriod} setTimePeriod={setTimePeriod} />}
        metricCard={<MetricCard title={"Membership Growth"} timeInterval={timePeriod.tableHeader} data={countData} />}
        graph={<SingleLineChart data={countData} />}
      />
      {/* <TimePeriodButtons
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
      />
      <MetricCard title={"Membership Growth"} timeInterval={timePeriod.tableHeader} data={countData}/>
      <SingleLineChart data={countData} /> */}
    </>
  );
};
export default MembershipGrowth;

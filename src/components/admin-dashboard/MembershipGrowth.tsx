import { useState } from "react";
import type { TimeOptions } from "../../types/TimeOptions";
import TimePeriodButtons from "./TimePeriodButtons";
import MetricCard from "./MetricCard";

const MembershipGrowth: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<TimeOptions>("monthly");

  return (
    <>
      <TimePeriodButtons
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
      />
      <MetricCard />
    </>
  );
};
export default MembershipGrowth;

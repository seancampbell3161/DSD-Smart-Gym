import ClassAttendance from "./ClassAttendance";
import MembershipGrowth from "./MembershipGrowth";
import PeakHours from "./PeakHours";

const Analytics: React.FC = () => {
  // TODO: Membership growth 
    // line graph: y-axis: people registered vs people cancelled, x-axis: time point
    // Yearly
      // Add a slider w/ rechart to scroll through all years
  // TODO: Peak Hours
    // Heatmap: y-axis: day, x-axis: time point, cell: amount of people checked in
    // For each time point
      // get all members who checked in w/in each business hour
    // Yearly
      // Add a slider w/ rechart to scroll through all years
  // TODO: Class attendance
    // line graph: y-axis: amount, x-axis: time point, line: class
    // Yearly
      // Add a slider w/ rechart to scroll through all years

  return (
    <div className="analytics-container">
      <MembershipGrowth />
      <ClassAttendance />
      <PeakHours />
    </div>
  )
}

export default Analytics;
import MembershipGrowth from "./MembershipGrowth";

const Analytics: React.FC = () => {
  // TODO: Each Metric file
    // uses metric.css
    // contains, filter, table, and graph
  // TODO: Membership growth 
    // line graph: y-axis: amount, x-axis: time point
    // For each year, get all members registered
      // Add a slider w/ rechart to scroll through all years
    // For each month of selected year, get all members
    // For each week of selected month, get all members
  // TODO: Peak Hours
    // line graph: y-axis: amount, x-axis: every business hour
    // For each time point
      // get all members who checked in w/in each business hour
    // may need a slider
  // TODO: Class attendance
    // bar graph: y-axis: amount, x-axis: class
    // don't need to track by day becuase they can get the info from classes page

  return (
    <>
      <MembershipGrowth />
    </>
  )
}

export default Analytics;
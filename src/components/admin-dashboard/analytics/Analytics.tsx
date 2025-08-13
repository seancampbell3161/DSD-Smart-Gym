import ClassAttendance from "./ClassAttendance";
import MembershipGrowth from "./MembershipGrowth";
import PeakHours from "./PeakHours";

const Analytics: React.FC = () => {
  return (
    <div className="analytics-container">
      <MembershipGrowth />
      <ClassAttendance />
      <PeakHours />
    </div>
  )
}

export default Analytics;
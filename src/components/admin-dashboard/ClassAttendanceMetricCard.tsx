import type { ClassAttendanceMetricCardProps } from "../../types/ClassAttendance.interface";

const ClassAttendanceMetricCard: React.FC<ClassAttendanceMetricCardProps> = ({
  title,
  data,
}) => {
  return (
    <>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Boxing</th>
            <th>Cycling</th>
            <th>Yoga</th>
            <th>HIIT</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => {
            return (
              <tr>
                <td>{entry.timePoint}</td>
                <td>{entry.boxing}</td>
                <td>{entry.cycling}</td>
                <td>{entry.yoga}</td>
                <td>{entry.HIIT}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ClassAttendanceMetricCard;

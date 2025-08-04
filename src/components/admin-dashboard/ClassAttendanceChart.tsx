import {
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import type { ClassDataProps } from "../../types/ClassAttendance.interface.ts";

const ClassAttendanceChart: React.FC<{ data: ClassDataProps[] }> = ({
  data,
}) => {
  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timePoint" />
        <YAxis yAxisId="left" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="boxing"
          stroke="#0ab304ff"
          activeDot={{ r: 7 }}
          strokeWidth={5}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="cycling"
          stroke="#8884d8"
          activeDot={{ r: 7 }}
          strokeWidth={5}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="yoga"
          stroke="#ca82c4ff"
          activeDot={{ r: 7 }}
          strokeWidth={5}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="HIIT"
          stroke="#caa582ff"
          activeDot={{ r: 7 }}
          strokeWidth={5}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ClassAttendanceChart;

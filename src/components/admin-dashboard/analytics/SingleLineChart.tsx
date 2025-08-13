import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { coordinateProps } from "../../../types/Analytics.interface";

const SingleLineChart: React.FC<{ data: coordinateProps[] }> = ({ data }) => {
  return (
    <AreaChart width={900} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <Area dataKey="y" stroke="#bcfd4c" fill="#bcfd4c" />
      <XAxis dataKey="x" />
      <YAxis />
    </AreaChart>
  );
};

export default SingleLineChart;

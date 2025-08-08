import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ComparisonCountData {
  timePoint: string;
  [key: string]: number | undefined | string;
}

const MultiLineAreaChart: React.FC<{
  data: ComparisonCountData[];
  key1: string;
  key2: string;
}> = ({ data, key1, key2 }) => {
  return (
    <AreaChart width={900} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timePoint" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area dataKey={key2} stroke="#76b901ff" fill="#bcfd4c" />
      {key1 === "" ? (
        ""
      ) : (
        <Area dataKey={key1} stroke="#020202ff" fill="#02020228" />
      )}
    </AreaChart>
  );
};

export default MultiLineAreaChart;

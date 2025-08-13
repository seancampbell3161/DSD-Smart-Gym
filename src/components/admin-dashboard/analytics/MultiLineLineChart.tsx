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
import type { ComparisonCountData } from "../../../types/Analytics.interface.ts";
import { useEffect, useState } from "react";

const MultiLineLineChart: React.FC<{ data: ComparisonCountData[] }> = ({
  data,
}) => {
  const [dataKeys, setDataKeys] = useState<string[]>([""]);
  const strokeColors: string[] = [
    "#0ab304ff",
    "#8884d8",
    "#ca82c4ff",
    "#caa582ff",
    "#be4f4dff",
    "#2b6abdff",
    "#ba4791ff",
    "#ff6f6f",
    "#3e8487ff",
  ]

  const colorInventory: {[color: string ]: number} = {
    "#0ab304ff": 1,
    "#8884d8": 1,
    "#ca82c4ff": 1,
    "#caa582ff": 1,
    "#be4f4dff": 1,
    "#2b6abdff": 1,
    "#ba4791ff": 1,
    "#ff6f6f": 1,
    "#3e8487ff": 1,
  }

  const getKeys = (data: ComparisonCountData[]) => {
    const keys = new Set<string>();
    data.forEach((obj: ComparisonCountData) => {
      for (const key in obj) {
        if (key !== "timePoint" && !keys.has(key)) {
          keys.add(key);
        }
      }
    });
    setDataKeys([...keys]);
  }

  const getColor = (arr: string[]) : string => {
      const getColorIdx = () : number => {
        return Math.floor(Math.random() * arr.length);
      }

      let colorIdx = getColorIdx();
      
      while(colorInventory[strokeColors[colorIdx]] === 0) {
        colorIdx = getColorIdx();
      }
      
      const color = strokeColors[colorIdx];
      colorInventory[color]--;
      return color
  }

  useEffect(() => {
    getKeys(data);
  }, [data])


  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timePoint" />
        <YAxis yAxisId="left" />
        <Tooltip />
        <Legend />
        { dataKeys.map((key) => {
          return (
            <Line
              yAxisId="left"
              type="monotone"
              dataKey={key}
              stroke={getColor(dataKeys)}
              activeDot={{ r: 7 }}
              strokeWidth={5}
            />
          )
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MultiLineLineChart;

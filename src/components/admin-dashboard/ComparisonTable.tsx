import { useEffect, useState } from "react";
import type {
  ComparisonCountData,
  ComparisonTableProps,
} from "../../types/Analytics.interface";

const ComparisonTable: React.FC<ComparisonTableProps> = ({ title, data }) => {
  const [headers, setHeaders] = useState<string[]>([""]);

  const getKeys = (data: ComparisonCountData[]) => {
    const keys = new Set<string>();
    data.forEach((obj: ComparisonCountData) => {
      for (const key in obj) {
        if (key !== "timePoint" && !keys.has(key)) {
          keys.add(key);
        }
      }
    });

    setHeaders([...Array.from(keys)]);
  };

  useEffect(() => {
    getKeys(data);
  }, [data]);

  return (
    <div className="comparison-table">
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th key="no-label"></th>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => {
            return (
              <tr>
                <td>{entry.timePoint}</td>
                {headers.map((header) => (
                  <td key={header}>{entry[header]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;

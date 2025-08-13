import { useEffect, useState, useRef } from "react";
import type { PeakHoursData } from "../../../types/Analytics.interface";

interface GridCells {
  [key: string]: {
    hours: {
      dayHour: string;
      count: number;
    }[];
  };
}

const PeakHoursMap: React.FC<{ data: PeakHoursData[] }> = ({ data }) => {
  const [gridCells, setGridCells] = useState<GridCells>({});
  const minMaxCount = useRef<number[]>([]);

  const businessHours: string[] = [
    "5am",
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
  ];

  const DAY_INDEXES: { [key: number]: string } = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };

  const xAxisLabels: string[] = businessHours;
  const yAxisLabels: string[] = Object.values(DAY_INDEXES);

  const formatData = () => {
    minMaxCount.current = [];

    return yAxisLabels.reduce((days, dayLabel) => {
      const dayAndHour = xAxisLabels.map((hourLabel) => {
        const match = data.find((entry) => {
          const { dayOfWeek, hour } = entry;

          if (dayOfWeek !== dayLabel) return false;

          const timeLabel = (() => {
            if (hour === 0) {
              return "12am";
            } else if (hour < 12) {
              return `${hour}am`;
            } else if (hour === 12) {
              return "12pm";
            } else {
              const convertedTime = hour - 12;
              return `${convertedTime}pm`;
            }
          })();

          return timeLabel === hourLabel;
        });

        const count = match?.count ?? 0;

        minMaxCount.current.push(count);

        return {
          dayHour: `${dayLabel} ${hourLabel}`,
          count: count,
        };
      });

      return {
        ...days,
        [dayLabel]: {
          hours: dayAndHour,
        },
      };
    }, {});
  };

  useEffect(() => {
    setGridCells(formatData());
  }, [data]);

  const generateBackgroundColor = (count: number) => {
    return `hsl(90deg 100% ${count > 0 ? 95 - count * 5 : 95}%)`;
  };

  function generateLegend(data: number[]) {
    const deduped = [...new Set(data)];
    const minValue = Math.min(...deduped);
    const maxValue = Math.max(...deduped);
    const minColor = generateBackgroundColor(minValue);
    const maxColor = generateBackgroundColor(maxValue);

    return (
      <>
        <div className="legend-title">Hourly Check-ins</div>
        <div
          className="cell"
          style={{
            background: `linear-gradient(90deg, ${minColor} 0%, ${maxColor} 100%)`,
          }}
        />
        <div className="labels">
          <span className="label">Min: {minValue}</span>
          <span className="label">Max: {maxValue}</span>
        </div>
      </>
    );
  }

  return (
    <div className="heatmap-container">
      <div className={`heatmap horizontal`}>
        {Object.keys(gridCells).map((day: string) => (
          <div key={day} className="cells map-row">
            <span className="label">{day}</span>
            {gridCells[day].hours.map(({ dayHour, count }) => (
              <div
                key={dayHour}
                className="cell"
                style={{ backgroundColor: generateBackgroundColor(count) }}
              >
                <div>{count > 0 ? count : ""}</div>
                <div className="tooltip" role="tooltip">
                  <span>{count === 0 || count === undefined ? 0 : count}</span>
                  <span>{dayHour}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="map-row x-axis">
          {xAxisLabels.map((label, index) => (
            <span key={label} className="label">
              {index % 2 === 0 ? label : null}
            </span>
          ))}
        </div>
      </div>
      <div className="legend">{generateLegend(minMaxCount.current)}</div>
    </div>
  );
};
export default PeakHoursMap;

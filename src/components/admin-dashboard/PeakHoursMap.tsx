import { useEffect, useState, useRef } from "react";
import { format } from "date-fns/format";

type Days = {
  [key: string]: string[];
};

interface GridCells {
  [key: string]: {
    hours: {
      dayHour: string;
      count: number;
    }[];
  };
}

const PeakHoursMap: React.FC = () => {
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

  const formatDayAndHour = (data: string[]) => {
    return data.reduce((dates: Days, dateString: string) => {
      const date = new Date(dateString);
      const day = DAY_INDEXES[date.getDay()];
      const hour = format(date, "haaa");
      (dates[day] = dates[day] || []).push(hour);
      return dates;
    }, {});
  };

  useEffect(() => {
    // fetch all checkins w/in the week
    const dateTimeArray: string[] = [
      "2021-03-27 00:15",
      "2021-03-27 03:45",
      "2021-03-27 07:30",
      "2021-03-27 09:00",
      "2021-03-27 11:20",
      "2021-03-27 12:30",
      "2021-03-27 14:50",
      "2021-03-27 17:10",
      "2021-03-27 20:25",
      "2021-03-27 23:55",
      "2021-03-26 20:55",
      "2021-03-26 20:50",
      "2021-03-26 20:50",
      "2021-03-26 20:50",
      "2021-03-26 20:50",
      "2021-03-26 20:50",
    ];

    const formattedData = formatDayAndHour(dateTimeArray);

    const createGridCells = () => {
      return yAxisLabels.reduce((days, dayLabel: string) => {
        const dayAndHour = xAxisLabels.reduce(
          (hours: { dayHour: string }[], hourLabel: string) => {
            const count = formattedData[dayLabel]?.reduce(
              (total: number, hour: string) => {
                return hour === hourLabel ? total + 1 : total;
              },
              0
            );

            if (count) {
              minMaxCount.current = [...minMaxCount.current, count];
            }

            console.log(count);

            return [
              ...hours,
              {
                dayHour: `${dayLabel} ${hourLabel}`,
                count,
              },
            ];
          },
          []
        );

        return {
          ...days,
          [dayLabel]: {
            hours: dayAndHour,
          },
        };
      }, {});
    };

    setGridCells(createGridCells());
  }, []);

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

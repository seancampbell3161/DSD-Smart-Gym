export type TimeOptions =
  | { button: "Yearly"; tableHeader: "Year" }
  | { button: "Monthly"; tableHeader: "Month" };

export interface coordinateProps {
  x: string;
  y: number;
}

export interface InvalidYearFormatProps {
  pattern: RegExp;
  setInvalidYearFormat: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ComparisonCountData {
  timePoint: string;
  [key: string]: number | undefined | string;
}

export interface ComparisonTableProps {
  title: string;
  data: ComparisonCountData[];
}

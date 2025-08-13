export type TimeOptions =
  | { button: "Yearly"; tableHeader: "Year" }
  | { button: "Monthly"; tableHeader: "Month" };

export interface coordinateProps {
  x: string;
  y: number;
}

export interface ComparisonCountData {
  timePoint: string;
  [key: string]: number | undefined | string;
}

export interface ComparisonTableProps {
  title: string;
  data: ComparisonCountData[];
}

export interface InvalidYearFormatProps {
  pattern: RegExp;
  setInvalidYearFormat: React.Dispatch<React.SetStateAction<boolean>>;
}

export type OneSelectedYear = string;

export type OneYearInputProps = {
  setSingleSelectedYear: React.Dispatch<React.SetStateAction<OneSelectedYear>>;
} & InvalidYearFormatProps;

export interface TwoSelectedYears {
  yearOne: string;
  yearTwo: string;
}

export type TwoYearInputProps = {
  setSelectedYears: React.Dispatch<React.SetStateAction<TwoSelectedYears>>;
} & InvalidYearFormatProps;

export interface PeakHoursData {
  dayOfWeek: string;
  hour: number;
  count:number;
}
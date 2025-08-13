export interface ClassDataProps {
  timePoint: string;
  boxing: number;
  cycling: number;
  yoga: number;
  HIIT: number;
}

export interface ClassAttendanceMetricCardProps {
  title: string;
  data: ClassDataProps[];
}

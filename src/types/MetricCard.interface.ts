import type { coordinateProps } from "./Analytics.interface.ts";

export interface MetricCardProps {
  title: string;
  timeInterval: string;
  data: coordinateProps[];
}
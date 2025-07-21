import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import type { coordinateProps } from '../../types/Analytics.interface';

const SingleLineChart: React.FC<{data: coordinateProps[]}> = ({data}) => {
  return (
  <LineChart width={600} height={500} data={data}>
    <CartesianGrid />
    <Line dataKey="y" />
    <XAxis dataKey="x" />
    <YAxis />
  </LineChart>
  )
};

export default SingleLineChart
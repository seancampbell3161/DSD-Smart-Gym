import{ LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import type { ClassDataProps } from '../../types/ClassAttendance.interface.ts';


const ClassAttendanceChart: React.FC<{data: ClassDataProps[]}> = ({data}) => {
  return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={800}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timePoint" />
          <YAxis yAxisId="left" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="boxing" stroke="#82ca9d" activeDot={{ r: 7 }} />
          <Line yAxisId="left" type="monotone" dataKey="cycling" stroke="#8884d8" activeDot={{ r: 7 }} />
          <Line yAxisId="left" type="monotone" dataKey="yoga" stroke="#ca82c4ff" activeDot={{ r: 7 }} />
          <Line yAxisId="left" type="monotone" dataKey="HIIT" stroke="#caa582ff" activeDot={{ r: 7 }} />
        </LineChart>
      </ResponsiveContainer>
  )
};

export default ClassAttendanceChart;
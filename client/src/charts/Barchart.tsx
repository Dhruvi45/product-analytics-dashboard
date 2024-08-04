import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { processData } from '../utils/common';

const BarChartComponent = ({ onClick,data }:any) => {
  const chartData = processData(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart layout="vertical" width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" onClick={onClick} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
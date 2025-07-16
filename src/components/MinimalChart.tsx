'use client';

import { PieChart, Pie } from 'recharts';

const data = [
  { name: 'A', value: 100 },
  { name: 'B', value: 200 },
];

export default function MinimalChart() {
  return (
    <div style={{ width: 400, height: 400, border: '2px solid blue' }}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          cx={200}
          cy={200}
          outerRadius={60}
          fill="#8884d8"
        />
      </PieChart>
    </div>
  );
}
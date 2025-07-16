'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const sampleData = [
  { name: '現金', value: 400 },
  { name: 'クレカ', value: 300 },
  { name: '電子マネー', value: 300 },
];

export default function TestChart() {
  console.log('TestChart rendering with data:', sampleData);
  
  // データの検証
  const validData = sampleData.filter(item => 
    typeof item.value === 'number' && 
    !isNaN(item.value) && 
    item.value > 0
  );
  
  console.log('Valid data:', validData);
  
  if (validData.length === 0) {
    return (
      <div style={{ width: '100%', height: 400, border: '1px solid red' }}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          データが無効です
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ width: '100%', height: 400, border: '1px solid red' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={validData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {validData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
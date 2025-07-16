'use client';

import { useEffect, useState } from 'react';

interface SimpleChartProps {
  data: Array<{ name: string; value: number }>;
  title: string;
}

export default function SimpleChart({ data, title }: SimpleChartProps) {
  const [Chart, setChart] = useState<any>(null);

  useEffect(() => {
    const loadChart = async () => {
      try {
        const recharts = await import('recharts');
        setChart(recharts);
      } catch (error) {
        console.error('Failed to load recharts:', error);
      }
    };
    
    loadChart();
  }, []);

  if (!Chart) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">グラフライブラリを読み込み中...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">{title}データがありません</p>
      </div>
    );
  }

  const { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } = Chart;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(1)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `¥${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
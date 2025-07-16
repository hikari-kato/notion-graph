'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CategoryData } from '@/types/expense';
import { useState, useEffect } from 'react';

interface CategoryTrendChartProps {
  data: CategoryData[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe', '#00c49f'];

export default function CategoryTrendChart({ data }: CategoryTrendChartProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">グラフを読み込み中...</p>
      </div>
    );
  }
  
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">カテゴリ別データがありません</p>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return `¥${value.toLocaleString()}`;
  };

  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    return `${year}/${month}`;
  };

  // データから全てのカテゴリを抽出
  const categories = Array.from(
    new Set(
      data.flatMap(item => 
        Object.keys(item).filter(key => key !== 'month')
      )
    )
  );

  return (
    <div className="w-full h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tickFormatter={formatMonth}
          />
          <YAxis 
            tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [formatCurrency(value), name]}
            labelFormatter={formatMonth}
          />
          <Legend />
          {categories.map((category, index) => (
            <Bar 
              key={category} 
              dataKey={category} 
              stackId="a" 
              fill={COLORS[index % COLORS.length]} 
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
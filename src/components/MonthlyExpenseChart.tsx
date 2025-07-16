'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MonthlyData } from '@/types/expense';
import { useState, useEffect } from 'react';

interface MonthlyExpenseChartProps {
  data: MonthlyData[];
}

export default function MonthlyExpenseChart({ data }: MonthlyExpenseChartProps) {
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
        <p className="text-gray-500">月別支出データがありません</p>
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

  return (
    <div className="w-full h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
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
            formatter={(value) => [`¥${value.toLocaleString()}`, '支出額']}
            labelFormatter={formatMonth}
          />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
import { ExpenseData, ChartData, MonthlyData, CategoryData } from '@/types/expense';

export function aggregateByPaymentMethod(expenses: ExpenseData[]): ChartData[] {
  const paymentMethodTotals: { [key: string]: number } = {};

  expenses.forEach(expense => {
    if (expense.paymentMethod) {
      paymentMethodTotals[expense.paymentMethod] = 
        (paymentMethodTotals[expense.paymentMethod] || 0) + expense.amount;
    }
  });

  return Object.entries(paymentMethodTotals).map(([name, value]) => ({
    name,
    value,
  }));
}

export function aggregateByMonth(expenses: ExpenseData[]): MonthlyData[] {
  const monthlyTotals: { [key: string]: number } = {};

  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + expense.amount;
  });

  return Object.entries(monthlyTotals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, total]) => ({
      month,
      total,
    }));
}

export function aggregateByCategory(expenses: ExpenseData[]): CategoryData[] {
  const categoryByMonth: { [month: string]: { [category: string]: number } } = {};

  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!categoryByMonth[monthKey]) {
      categoryByMonth[monthKey] = {};
    }
    
    if (expense.category) {
      categoryByMonth[monthKey][expense.category] = 
        (categoryByMonth[monthKey][expense.category] || 0) + expense.amount;
    }
  });

  return Object.entries(categoryByMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, categories]) => ({
      month,
      ...categories,
    }));
}
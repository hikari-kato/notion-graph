export interface ExpenseData {
  id: string;
  date: string;
  amount: number;
  category: string;
  paymentMethod: string;
  memo?: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface MonthlyData {
  month: string;
  total: number;
}

export interface CategoryData {
  month: string;
  [category: string]: number | string;
}
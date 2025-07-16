import { NextResponse } from 'next/server';
import { getExpenseData } from '@/lib/notion';

export async function GET() {
  try {
    const expenses = await getExpenseData();
    return NextResponse.json(expenses);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expense data' },
      { status: 500 }
    );
  }
}
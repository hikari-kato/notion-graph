import { Client } from '@notionhq/client';
import { ExpenseData } from '@/types/expense';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getExpenseData(): Promise<ExpenseData[]> {
  if (!process.env.NOTION_DATABASE_ID) {
    throw new Error('NOTION_DATABASE_ID is not set');
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    const expenses: ExpenseData[] = response.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        id: page.id,
        date: properties.日付?.date?.start || '',
        amount: properties.金額?.number || 0,
        category: properties.カテゴリ?.rich_text?.[0]?.text?.content || '',
        paymentMethod: properties.支払方法?.rich_text?.[0]?.text?.content || '',
        memo: properties.メモ?.rich_text?.[0]?.text?.content || '',
      };
    });

    return expenses.filter(expense => expense.date && expense.amount > 0);
  } catch (error) {
    console.error('Error fetching expense data:', error);
    throw error;
  }
}
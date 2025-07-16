'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ExpenseData } from '@/types/expense';
import { aggregateByPaymentMethod, aggregateByMonth, aggregateByCategory } from '@/lib/data-utils';

const ChartJsChart = dynamic(() => import('@/components/ChartJsChart'), {
  ssr: false,
  loading: () => <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded-lg"><p>グラフを読み込み中...</p></div>
});

const MonthlyBarChart = dynamic(() => import('@/components/MonthlyBarChart'), {
  ssr: false,
  loading: () => <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded-lg"><p>グラフを読み込み中...</p></div>
});

const CategoryStackedChart = dynamic(() => import('@/components/CategoryStackedChart'), {
  ssr: false,
  loading: () => <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded-lg"><p>グラフを読み込み中...</p></div>
});

export default function Home() {
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/expenses');
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }
        const data = await response.json();
        setExpenses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="container mx-auto px-2 py-4 sm:px-4">
        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '30px', fontWeight: 'bold' }}>Notion支出管理</div>
          <div style={{ fontSize: '30px', fontWeight: 'bold' }}>グラフビューワー</div>
        </div>
        <div className="text-center">
          <p>データを読み込み中...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-2 py-4 sm:px-4">
        <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '30px', fontWeight: 'bold' }}>Notion支出管理</div>
          <div style={{ fontSize: '30px', fontWeight: 'bold' }}>グラフビューワー</div>
        </div>
        <div className="text-center text-red-600">
          <p>エラー: {error}</p>
          <p className="text-sm mt-2">環境設定を確認してください</p>
        </div>
      </main>
    );
  }

  const paymentMethodData = aggregateByPaymentMethod(expenses);
  const monthlyData = aggregateByMonth(expenses);
  const categoryData = aggregateByCategory(expenses);

  return (
    <main className="container mx-auto px-2 py-4 sm:px-4">
      <div style={{ textAlign: 'center', marginTop: '16px', marginBottom: '16px' }}>
        <div style={{ fontSize: '30px', fontWeight: 'bold' }}>Notion支出管理</div>
        <div style={{ fontSize: '30px', fontWeight: 'bold' }}>グラフビューワー</div>
      </div>
      
      {/* 支出概要 */}
      <div style={{
        background: 'linear-gradient(to right, #dbeafe, #f3e8ff)',
        borderRadius: '16px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        marginBottom: '24px',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#374151',
          marginBottom: '24px',
          textAlign: 'center'
        }}>📊 支出概要</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px'
        }}>
          <div style={{
            textAlign: 'center',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '2px solid #dbeafe'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '8px' }}>
              <span style={{
                fontSize: '48px',
                fontWeight: '900',
                color: '#2563eb',
                lineHeight: '1'
              }}>{expenses.length}</span>
              <span style={{
                fontSize: '14px',
                color: '#6b7280',
                marginLeft: '4px'
              }}>件</span>
            </div>
            <p style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#374151'
            }}>支出記録</p>
          </div>
          <div style={{
            textAlign: 'center',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '2px solid #dcfce7'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '8px' }}>
              <span style={{
                fontSize: '36px',
                fontWeight: '900',
                color: '#16a34a',
                lineHeight: '1'
              }}>
                ¥{paymentMethodData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
              </span>
              <span style={{
                fontSize: '12px',
                color: '#6b7280',
                marginLeft: '4px'
              }}>円</span>
            </div>
            <p style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#374151'
            }}>総支出額</p>
          </div>
          <div style={{
            textAlign: 'center',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '2px solid #e9d5ff'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '8px' }}>
              <span style={{
                fontSize: '48px',
                fontWeight: '900',
                color: '#9333ea',
                lineHeight: '1'
              }}>{paymentMethodData.length}</span>
              <span style={{
                fontSize: '14px',
                color: '#6b7280',
                marginLeft: '4px'
              }}>種類</span>
            </div>
            <p style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#374151'
            }}>支払方法</p>
          </div>
          <div style={{
            textAlign: 'center',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '2px solid #fed7aa'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '8px' }}>
              <span style={{
                fontSize: '48px',
                fontWeight: '900',
                color: '#ea580c',
                lineHeight: '1'
              }}>{categoryData.length > 0 ? Object.keys(categoryData[0]).filter(key => key !== 'month').length : 0}</span>
              <span style={{
                fontSize: '14px',
                color: '#6b7280',
                marginLeft: '4px'
              }}>種類</span>
            </div>
            <p style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#374151'
            }}>カテゴリ</p>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
        marginBottom: '48px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '2px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '18px',
            padding: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '2px solid #f3f4f6'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px'
              }}>
                <span style={{ fontSize: '24px' }}>💳</span>
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#374151',
                margin: '0'
              }}>支払方法の内訳</h2>
            </div>
            <div style={{ padding: '16px 0' }}>
              <ChartJsChart data={paymentMethodData} />
            </div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: '20px',
          padding: '2px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '18px',
            padding: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '2px solid #f3f4f6'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px'
              }}>
                <span style={{ fontSize: '24px' }}>📊</span>
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#374151',
                margin: '0'
              }}>月ごとの合計支出</h2>
            </div>
            <div style={{ padding: '16px 0' }}>
              <MonthlyBarChart data={monthlyData} />
            </div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          borderRadius: '20px',
          padding: '2px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '18px',
            padding: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '2px solid #f3f4f6'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px'
              }}>
                <span style={{ fontSize: '24px' }}>📈</span>
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#374151',
                margin: '0'
              }}>カテゴリ別の支出傾向</h2>
            </div>
            <div style={{ padding: '16px 0' }}>
              <CategoryStackedChart data={categoryData} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
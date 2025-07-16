import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Notion支出管理グラフビューワー',
  description: 'Notionの支出管理データベースを可視化するWebアプリケーション',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Notion支出管理グラフビューワー',
    description: 'Notionの支出管理データベースを可視化するWebアプリケーション',
    images: [
      {
        url: '/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Notion支出管理グラフビューワー',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notion支出管理グラフビューワー',
    description: 'Notionの支出管理データベースを可視化するWebアプリケーション',
    images: ['/og_image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
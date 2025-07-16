# Notion支出管理グラフビューワー

個人のNotionユーザーが、自身の支出管理データベースを元に、支払方法やカテゴリ別の内訳、月ごとの合計支出を視覚的に把握できるWebアプリケーションです。

## 🌐 デモサイト

**[https://notion-graph-nine.vercel.app/](https://notion-graph-nine.vercel.app/)**

## 🚀 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_database_id_here
```

### 3. Notionデータベースの設定

対象のNotionデータベースは以下の構成にしてください：

| カラム名 | 型 | 説明 |
|----------|-----|------|
| 日付 | Date | 支出が発生した日付 |
| 金額 | Number | 支出金額（円） |
| カテゴリ | Select | 食費、交通費、交際費などの分類 |
| 支払方法 | Select | 現金、クレジット、電子マネーなど |
| メモ | Text | 支出の詳細（任意） |

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

## 📊 表示されるグラフ

1. **支払方法の内訳グラフ**（円グラフ）
2. **月ごとの合計支出グラフ**（棒グラフ）
3. **カテゴリ別の支出傾向グラフ**（積み上げ棒グラフ）

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 15 with App Router
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **グラフライブラリ**: Recharts
- **Notion API**: @notionhq/client

## 📱 レスポンシブ対応

スマートフォンからデスクトップまで、様々な画面サイズに対応しています。

## 🚀 デプロイ

### Vercelにデプロイ

1. Vercelにプロジェクトをデプロイ
2. 環境変数を設定
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`

## トラブルシューティング

### データが表示されない場合

1. 環境変数が正しく設定されているか確認
2. NotionのAPI キーとデータベースIDが正しいか確認
3. Notionデータベースの権限が適切に設定されているか確認
4. データベースのカラム名が仕様通りになっているか確認
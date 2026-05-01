# デジタル名刺アプリ

## 概要

デジタル名刺を登録することができるアプリです

## 機能

- デジタル名刺を作成することができる
- IDを入力するとIDに紐づいたデジタル名刺を閲覧することができる
- 毎朝6時にユーザーデータが削除される

## 使用技術

- React（TypeScript）
- Supabase（Database）
- Vite
- Chakra UI v3
- Jest（テスト）
- GitHub Actions（CI/CD）

## セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/Seripro/kadai4.git
cd kadai4
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

#### 3-1. .envの作成

.envファイルをプロジェクト直下に作成する

#### 3-2. Supabase URL, Supabase ANON keyの設定

以下のように.env内にSupabaseプロジェクトのURLとANONkeyを設定する（XXXを自分のものに書き換える）

```env
VITE_SUPABASE_URL=XXX
VITE_SUPABASE_ANON_KEY=XXX
REACT_APP_SUPABASE_URL=XXX
REACT_APP_SUPABASE_ANON_KEY=XXX
```

#### 3-3. Supabaseテーブルの準備

このアプリでは以下の3つのテーブルを使用します

**users テーブル**

| カラム名    | 説明                    | 型      |
| ----------- | ----------------------- | ------- |
| user_id     | 主キー                  | varchar |
| name        | ユーザー名              | varchar |
| description | 自己紹介                | varchar |
| github_id   | GitHub ID（オプション） | varchar |
| qiita_id    | Qiita ID（オプション）  | varchar |
| x_id        | X ID（オプション）      | varchar |

**user_skill テーブル**

| カラム名 | 説明                      | 型      |
| -------- | ------------------------- | ------- |
| id       | 主キー                    | int     |
| user_id  | users テーブルの外部キー  | varchar |
| skill_id | skills テーブルの外部キー | int     |

**skills テーブル**

| カラム名 | 説明     | 型      |
| -------- | -------- | ------- |
| id       | 主キー   | int     |
| name     | スキル名 | varchar |

### 4. CI/CDのセットアップ

#### 4-1. GitHub上でリポジトリのSettings → Secrets and variables → Actionsに移動

#### 4-2. 環境変数を設定

以下の4つの変数を設定します

- FIREBASE_PROJECT_ID
- FIREBASE_TOKEN
- REACT_APP_SUPABASE_URL
- REACT_APP_SUPABASE_ANON_KEY
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

## 起動方法

```bash
npm run dev
```

このプロジェクトはFirebase Hostingでホストされており、以下のURLでアクセスできます<br/>
https://business-card-e33ca.web.app/

## その他コマンド一覧

```bash
# ビルド
npm run build
```

```bash
# デプロイ
npx firebase deploy
```

```bash
# テスト
npm run test
```

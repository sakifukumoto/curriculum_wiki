# 課題0-4：SQL基礎

## この課題のゴール

データベースの基本操作を習得する。Spring Boot開発ではSQLの知識が必須です。

## 目安時間

8〜12時間

## 使用ツール

[DB Fiddle](https://www.db-fiddle.com/)（ブラウザで動くSQL練習環境。インストール不要）

## 課題

以下のテーブルを作成し、クエリを書いてください。

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  age INT,
  department VARCHAR(50)
);

CREATE TABLE tasks (
  id INT PRIMARY KEY,
  user_id INT,
  title VARCHAR(100),
  status VARCHAR(20),
  created_at DATE
);
```

### 書くべきクエリ（全6問）

1. 全ユーザーを取得する
2. 年齢が25歳以上のユーザーを取得する
3. 部署ごとのユーザー数を取得する
4. ステータスが `done` のタスクを取得する
5. ユーザー名とそのユーザーのタスクタイトルを一覧で取得する（JOIN）
6. ユーザーごとのタスク数を取得する（GROUP BY）

## 成果物

`submissions/[自分の名前]/ph0/sql-practice.sql` に書いて提出。

## OK基準

- [ ] 6問全てのクエリが正しく動作する
- [ ] JOINの仕組みを説明できる
- [ ] GROUP BYとHAVINGの違いを説明できる

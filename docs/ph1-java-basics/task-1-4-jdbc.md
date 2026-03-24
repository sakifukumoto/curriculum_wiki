# 課題1-4：JDBC・トランザクション

## この課題のゴール

JavaからDBを操作する基本を習得する。JPAが「何をやってくれているか」を理解する。

## 目安時間

15〜20時間

## 事前準備

```sql
CREATE DATABASE library_db;
USE library_db;

CREATE TABLE books (
  id VARCHAR(10) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  author VARCHAR(50) NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 仕様

JDBCを使って `BookRepository` クラスを実装してください。

| メソッド | 説明 |
|---------|------|
| `findAll()` | 全件取得 |
| `findById(String id)` | ID検索。Optionalを返す |
| `save(Book book)` | 登録 |
| `updateAvailability(String id, boolean isAvailable)` | 貸出ステータス更新 |
| `deleteById(String id)` | 削除 |
| `checkout(String bookId)` | トランザクション：在庫確認→ステータス更新 |

### トランザクションの実装

```java
try {
    connection.setAutoCommit(false);
    // 処理
    connection.commit();
} catch (Exception e) {
    connection.rollback();
    throw e;
} finally {
    connection.setAutoCommit(true);
}
```

## OK基準

- [ ] CRUD処理が全て動作する
- [ ] `checkout` でトランザクションが正しく使われている
- [ ] プレースホルダ（`?`）を使いSQLインジェクション対策ができている
- [ ] try-with-resourcesでリソースが閉じられている
- [ ] PR本文に「トランザクションがなぜ必要かの説明」が書かれている

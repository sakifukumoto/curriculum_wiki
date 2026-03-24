# 課題1-4：JDBC・トランザクション

## 目安時間

15〜20時間

---

## Step 1：まず動かす（写経）

### DBとテーブルを作成する

MySQLに接続して以下を実行してください。

```sql
CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

CREATE TABLE IF NOT EXISTS books (
    id VARCHAR(10) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(50) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- テストデータを挿入
INSERT INTO books (id, title, author) VALUES
    ('B001', 'Clean Code', 'Robert C. Martin'),
    ('B002', 'リーダブルコード', 'Dustin Boswell'),
    ('B003', 'Effective Java', 'Joshua Bloch');
```

### JDBCドライバを追加する

**pom.xml の場合：**

```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>8.3.0</version>
</dependency>
```

### JDBCで接続して全件取得する

```java
import java.sql.*;

public class JdbcExample {
    public static void main(String[] args) throws SQLException {
        String url = "jdbc:mysql://localhost:3306/library_db";
        String user = "root";
        String password = ""; // 自分のMySQLパスワードを設定

        // try-with-resources：自動的にcloseされる
        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM books")) {

            while (rs.next()) {
                String id = rs.getString("id");
                String title = rs.getString("title");
                boolean isAvailable = rs.getBoolean("is_available");
                System.out.println(id + " / " + title + " / " + (isAvailable ? "貸出可" : "貸出中"));
            }
        }
    }
}
```

コンソールに3件のデータが表示されれば成功です。

---

## Step 2：理解する

**Q1.** `try-with-resources` を使わずに書くとどうなりますか？どんな問題が起きますか？

**Q2.** `Statement` と `PreparedStatement` の違いは何ですか？なぜ `PreparedStatement` を使うべきなのですか？（「SQLインジェクション」で検索してみてください）

**Q3.** トランザクションとは何ですか？「銀行の振込」を例に説明してみてください。

**Q4.** `connection.setAutoCommit(false)` をすると何が変わりますか？

---

## Step 3：自分で実装する

JDBCを使って `BookRepository` クラスを実装してください。

```java
public class BookRepository {
    private final Connection connection;

    public BookRepository(Connection connection) {
        this.connection = connection;
    }

    // 全件取得
    public List<Book> findAll() { ... }

    // ID検索（見つからない場合はOptional.empty()）
    public Optional<Book> findById(String id) { ... }

    // 登録（PreparedStatementを使うこと）
    public void save(Book book) { ... }

    // 貸出ステータス更新
    public void updateAvailability(String id, boolean isAvailable) { ... }

    // 削除
    public void deleteById(String id) { ... }

    // トランザクション：貸出処理
    // 1. 貸出可能かチェック（SELECT）
    // 2. ステータスをfalseに更新（UPDATE）
    // ※この2つを1つのトランザクションで行う
    public void checkout(String id) throws BookAlreadyCheckedOutException { ... }
}
```

### トランザクションの実装パターン

```java
public void checkout(String id) throws BookAlreadyCheckedOutException {
    try {
        connection.setAutoCommit(false); // トランザクション開始

        // 1. 現在の状態を確認
        // ...（自分で実装）

        // 2. ステータスを更新
        // ...（自分で実装）

        connection.commit(); // コミット（確定）
    } catch (Exception e) {
        connection.rollback(); // ロールバック（なかったことに）
        throw e;
    } finally {
        connection.setAutoCommit(true); // 元に戻す
    }
}
```

---

## 参考

- [JDBCの基本（Oracle公式）](https://docs.oracle.com/javase/tutorial/jdbc/basics/)
- [PreparedStatementの使い方](https://www.sejuku.net/blog/58428)
- [トランザクションとは（図解）](https://qiita.com/matsuda_hiroyuki/items/78fe5c62e4ca3ee3bde5)

---

## OK基準

- [ ] Step 2の回答がPR本文に書かれている（全4問）
- [ ] 5つのメソッドが全て動作する
- [ ] `PreparedStatement` を使っている（`Statement` を使っていない）
- [ ] `checkout` でトランザクションが実装されている
- [ ] try-with-resourcesでリソースが適切に閉じられている
- [ ] PR本文に「トランザクションがなぜ必要かの説明」が書かれている

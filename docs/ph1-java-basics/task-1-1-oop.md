# 課題1-1：クラス・OOP基礎

## この課題のゴール

OOPの3大要素（カプセル化・継承・ポリモーフィズム）を実装を通じて理解する。

## 目安時間

15〜20時間

## 仕様

「図書館管理システム」の一部をJavaで実装してください。

### Bookクラス（基底クラス）

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `id` | `String` | 図書ID |
| `title` | `String` | タイトル |
| `author` | `String` | 著者名 |
| `isAvailable` | `boolean` | 貸出可能かどうか |

| メソッド | 説明 |
|---------|------|
| `getInfo()` | 図書情報を文字列で返す |
| `checkout()` | 貸出処理（isAvailableをfalseに） |
| `returnBook()` | 返却処理（isAvailableをtrueに） |

### EBookクラス（Bookを継承）

- `fileSize`（MB単位）フィールドを追加
- `getInfo()` をオーバーライドしてファイルサイズも表示
- `checkout()` は常に可能（電子書籍は複数人が同時に借りられる）

### Borrowable interface

```java
public interface Borrowable {
    void checkout();
    void returnBook();
    boolean isAvailable();
}
```

### Libraryクラス

| メソッド | 説明 |
|---------|------|
| `addBook(Book book)` | 図書を追加 |
| `findById(String id)` | IDで検索。Optional を返す |
| `getAvailableBooks()` | 貸出可能な図書リストを返す |
| `printAllBooks()` | 全図書の情報を表示 |

## 成果物

`submissions/[自分の名前]/ph1/task-1-1/` に実装を配置してPR提出。

## OK基準

- [ ] `Borrowable` interfaceが実装されている
- [ ] `EBook` が `Book` を適切に継承している
- [ ] `findById` が `Optional` を返している
- [ ] `getAvailableBooks` でStream APIを使っている
- [ ] PR本文に「interfaceと継承の使い分けについての考え」が書かれている

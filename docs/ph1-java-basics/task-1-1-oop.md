# 課題1-1：クラス・OOP基礎

## 前提条件

**この課題に進む前に、[事前学習チェック](task-1-0-pre-check.md) が完了していること。**

事前学習チェックがApprovedされていない状態でこの課題に取り組んでも、詰まるだけです。

---

## この課題のゴール

OOPの3大要素（カプセル化・継承・ポリモーフィズム）を実装を通じて理解する。

「OOPの概念を知っている」から「OOPを使って設計できる」に変わることが目標です。

## 目安時間

15〜20時間

## 先に読む教材

| 教材 | 範囲 |
|------|------|
| スッキリわかるJava入門 | 10〜15章（クラス・継承・ポリモーフィズム） |
| 補足 | [Java OOPをわかりやすく解説（Qiita）](https://qiita.com/search?q=java+oop+%E5%88%9D%E5%BF%83%E8%80%85) |

---

## 仕様

「図書館管理システム」の一部をJavaで実装してください。

### Bookクラス（基底クラス）

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `id` | `String` | 図書ID（例：`B001`） |
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

Bookクラスにこのinterfaceを実装させること。

### Libraryクラス

| メソッド | 説明 |
|---------|------|
| `addBook(Book book)` | 図書を追加 |
| `findById(String id)` | IDで検索。`Optional` を返す |
| `getAvailableBooks()` | 貸出可能な図書リストを返す |
| `printAllBooks()` | 全図書の情報を表示 |

### 動作確認用コード（mainメソッド）

```java
public static void main(String[] args) {
    Book b1 = new Book("B001", "Clean Code", "Robert C. Martin");
    Book b2 = new Book("B002", "リーダブルコード", "Dustin Boswell");
    EBook e1 = new EBook("E001", "Effective Java", "Joshua Bloch", 3.5);

    Library lib = new Library();
    lib.addBook(b1);
    lib.addBook(b2);
    lib.addBook(e1);

    lib.printAllBooks();

    b1.checkout();
    System.out.println("--- 貸出可能な図書 ---");
    lib.getAvailableBooks().forEach(b -> System.out.println(b.getTitle()));
    // b1は含まれない、e1は含まれる（電子書籍は常に貸出可能）
}
```

---

## 詰まったときのヒント

### 「interfaceって何？どう使うの？」

```java
// interfaceは「このメソッドを必ず実装してください」という約束事
public interface Printable {
    void print(); // 実装はしない。宣言だけ
}

// implementsで約束を守る
public class Document implements Printable {
    @Override
    public void print() {
        System.out.println("ドキュメントを印刷します");
    }
}
```

### 「継承って何？」

```java
// 親クラス
public class Animal {
    String name;
    void speak() {
        System.out.println("...");
    }
}

// 子クラス（Animalを継承）
public class Dog extends Animal {
    @Override
    void speak() {
        System.out.println("ワン！"); // 親のメソッドを上書き（オーバーライド）
    }
}
```

### 「Optionalって何？」

```java
// Optional = "値があるかもしれないし、ないかもしれない"箱
Optional<Book> result = findById("B001");

// 値があるか確認してから取り出す
if (result.isPresent()) {
    System.out.println(result.get().getTitle());
}

// またはorElse（ない場合のデフォルト値を指定）
Book book = result.orElse(null);
```

---

## 成果物

`submissions/[自分の名前]/ph1/task-1-1/` に実装を配置してPR提出。

## OK基準

- [ ] Borrowable interfaceが実装されている
- [ ] EBookがBookを適切に継承している
- [ ] getInfo() がオーバーライドされ、EBookはファイルサイズも表示される
- [ ] findById が Optional を返している
- [ ] getAvailableBooks でStream APIを使っている（`stream().filter()...`）
- [ ] mainメソッドで動作確認ができている
- [ ] PR本文に「interfaceと継承の使い分けについての考え」が書かれている

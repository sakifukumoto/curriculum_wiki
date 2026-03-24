# 課題1-1：クラス・継承・interface

## 目安時間

15〜25時間

---

## Step 1：まず動かす（写経）

以下のコードを**タイプして**IntelliJで動かしてください。コピペ禁止です。  
動かすことが目的なので、意味がわからなくてもOKです。

```java
// Animal.java
public class Animal {
    private String name;

    public Animal(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void speak() {
        System.out.println(name + "が鳴いています");
    }
}
```

```java
// Dog.java
public class Dog extends Animal {

    public Dog(String name) {
        super(name);
    }

    @Override
    public void speak() {
        System.out.println(getName() + "：ワンワン！");
    }

    public void fetch() {
        System.out.println(getName() + "がボールを取ってきた！");
    }
}
```

```java
// Speakable.java
public interface Speakable {
    void speak();
    default String getDescription() {
        return "これはSpeakableを実装したクラスです";
    }
}
```

```java
// Main.java
public class Main {
    public static void main(String[] args) {
        Animal a = new Animal("動物");
        Dog d = new Dog("ポチ");

        a.speak();
        d.speak();
        d.fetch();

        // ポリモーフィズム：Animal型の変数にDogを入れられる
        Animal animal = new Dog("シロ");
        animal.speak(); // DogのspeakメソッドがYはれる

        // interfaceを型として使う
        Speakable s = new Dog("クロ");
        s.speak();
        System.out.println(s.getDescription());
    }
}
```

Animal に Speakable を implements させて、コンパイルエラーを解消してください。

---

## Step 2：理解する

動かしたら、以下の問いに答えてください。  
答えはPR本文の「Step 2 回答」欄に書いてください。

**Q1.** `extends` と `implements` の違いを一言で説明してください。

**Q2.** `@Override` アノテーションを外しても動きますか？なぜつけるのですか？

**Q3.** `Animal animal = new Dog("シロ")` のように書けるのはなぜですか？  
（ヒント：「ポリモーフィズム」で検索してみてください）

**Q4.** `d.fetch()` は呼べますが、`animal.fetch()` はコンパイルエラーになります。なぜですか？

**Q5.** interfaceに `default` メソッドがあるのはなぜだと思いますか？

---

## Step 3：自分で実装する

以下の仕様で「図書館管理システム」を実装してください。  
Step 1・2で学んだことを使います。詰まったら [参考リンク](#参考) を見てください。

### Bookクラス

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `id` | `String` | 図書ID（例：`B001`） |
| `title` | `String` | タイトル |
| `author` | `String` | 著者名 |
| `isAvailable` | `boolean` | 貸出可能かどうか（初期値：`true`） |

| メソッド | 説明 |
|---------|------|
| `getInfo()` | `"[B001] Clean Code / Robert C. Martin"` 形式の文字列を返す |
| `checkout()` | `isAvailable` を `false` にする。既に貸出中なら何もしない |
| `returnBook()` | `isAvailable` を `true` にする |

### EBookクラス（Bookを継承）

- `fileSize`（double型・MB単位）フィールドを追加
- `getInfo()` をオーバーライドして `"[E001] Effective Java / Joshua Bloch (3.5MB)"` 形式で返す
- `checkout()` をオーバーライド：電子書籍は何人でも同時に借りられるので、常に借りられる

### Borrowable interface

```java
public interface Borrowable {
    void checkout();
    void returnBook();
    boolean isAvailable();
}
```

Book に実装させてください。

### Libraryクラス

| メソッド | 戻り値 | 説明 |
|---------|--------|------|
| `addBook(Book book)` | void | 図書を追加する |
| `findById(String id)` | `Optional<Book>` | IDで検索する |
| `getAvailableBooks()` | `List<Book>` | 貸出可能な図書の一覧を返す（Stream APIを使うこと） |
| `printAllBooks()` | void | 全図書の情報を1行ずつ表示する |

### 動作確認

```java
Library lib = new Library();
lib.addBook(new Book("B001", "Clean Code", "Robert C. Martin"));
lib.addBook(new Book("B002", "リーダブルコード", "Dustin Boswell"));
lib.addBook(new EBook("E001", "Effective Java", "Joshua Bloch", 3.5));

lib.printAllBooks();

lib.findById("B001").ifPresent(Book::checkout);

System.out.println("--- 貸出可能 ---");
lib.getAvailableBooks().forEach(b -> System.out.println(b.getInfo()));
// B002とE001が表示される（E001は電子書籍なので常に借りられる）
```

---

## 参考

- [Javaの継承（サルでもわかるGit入門の著者による解説）](https://www.sejuku.net/blog/22699)
- [JavaのInterface入門](https://www.sejuku.net/blog/22763)
- [Optional の使い方](https://qiita.com/tasogarei/items/a5b9e78b2a38e52b55fb)

---

## 成果物

`submissions/[自分の名前]/ph1/task-1-1/` に全クラスを配置してPR提出。

## OK基準

- [ ] Step 2の回答がPR本文に書かれている（全5問）
- [ ] Borrowable interfaceが実装されている
- [ ] EBookがBookを適切に継承し、getInfo()・checkout()がオーバーライドされている
- [ ] findByIdがOptionalを返している
- [ ] getAvailableBooksでStream APIを使っている
- [ ] 動作確認のコードが正しく動く
- [ ] PR本文に「interfaceと継承、どう使い分けるか」の考えが書かれている

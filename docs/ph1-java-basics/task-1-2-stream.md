# 課題1-2：例外処理・Stream API

## 目安時間

15〜20時間

---

## Step 1：まず動かす（写経）

以下をタイプして動かしてください。

### 例外処理

```java
public class ExceptionExample {
    public static void main(String[] args) {
        // 基本の例外処理
        try {
            int result = divide(10, 0);
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("エラー: " + e.getMessage());
        } finally {
            System.out.println("finallyは必ず実行される");
        }

        // カスタム例外
        try {
            String name = findName(-1);
            System.out.println(name);
        } catch (IllegalArgumentException e) {
            System.out.println("カスタム例外: " + e.getMessage());
        }
    }

    static int divide(int a, int b) {
        return a / b;
    }

    static String findName(int id) {
        if (id < 0) {
            throw new IllegalArgumentException("IDは0以上である必要があります: " + id);
        }
        return "田中";
    }
}
```

### Stream API

```java
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // filter：条件に合うものだけ抽出
        List<Integer> evens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());
        System.out.println("偶数: " + evens); // [2, 4, 6, 8, 10]

        // map：変換する
        List<String> strings = numbers.stream()
            .map(n -> "数値" + n)
            .collect(Collectors.toList());
        System.out.println("変換: " + strings);

        // reduce：集約する
        int sum = numbers.stream()
            .reduce(0, Integer::sum);
        System.out.println("合計: " + sum); // 55

        // filter + map + collect の組み合わせ
        List<Integer> result = numbers.stream()
            .filter(n -> n % 2 == 0)  // 偶数だけ
            .map(n -> n * n)           // 2乗にする
            .collect(Collectors.toList());
        System.out.println("偶数の2乗: " + result); // [4, 16, 36, 64, 100]
    }
}
```

---

## Step 2：理解する

PR本文の「Step 2 回答」に答えてください。

**Q1.** `try-catch-finally` の `finally` はいつ実行されますか？「catchが実行されなかった場合」も含めて答えてください。

**Q2.** `throw new IllegalArgumentException("...")` のように自分でthrowするのはどんな場面ですか？

**Q3.** Stream APIを使わずにforループで「偶数の2乗リスト」を書くとどうなりますか？実際に書いて比べてみてください。

**Q4.** `filter` → `map` → `collect` の順番は変えられますか？なぜこの順番なのですか？

---

## Step 3：自分で実装する

課題1-1のLibraryクラスを拡張してください。

### カスタム例外を追加する

```java
// 図書が見つからない場合
public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(String id) {
        super("図書が見つかりません: " + id);
    }
}

// 既に貸出中の場合
public class BookAlreadyCheckedOutException extends RuntimeException {
    // 自分で実装する（BookNotFoundExceptionを参考に）
}
```

### Libraryクラスにメソッドを追加する

| メソッド | 説明 |
|---------|------|
| `findByIdOrThrow(String id)` | IDで検索。見つからなければ `BookNotFoundException` をthrow |
| `checkoutById(String id)` | IDで貸出。見つからない→例外、貸出中→例外 |
| `searchByAuthor(String author)` | 著者名で部分一致検索（Stream + filterを使うこと） |
| `getTopNByTitle(int n)` | タイトルのアルファベット順で上位N件（Stream + sorted + limitを使うこと） |
| `countByAvailability()` | `{"available": 2, "checkedOut": 1}` 形式の `Map` を返す |

### 動作確認

```java
// 正常系
lib.checkoutById("B001");

// 異常系（例外が出ることを確認する）
try {
    lib.findByIdOrThrow("INVALID");
} catch (BookNotFoundException e) {
    System.out.println(e.getMessage()); // 図書が見つかりません: INVALID
}

try {
    lib.checkoutById("B001"); // 既に貸出中
} catch (BookAlreadyCheckedOutException e) {
    System.out.println(e.getMessage());
}

// Stream系メソッド
System.out.println(lib.searchByAuthor("Robert")); // Clean Codeが含まれるリスト
System.out.println(lib.getTopNByTitle(2));
System.out.println(lib.countByAvailability());
```

---

## 参考

- [Java例外処理の基本](https://www.sejuku.net/blog/23067)
- [Stream APIチートシート](https://qiita.com/oohira/items/bd3fe1de3e0d15eb5cd4)

---

## OK基準

- [ ] Step 2の回答がPR本文に書かれている（全4問）
- [ ] 2つのカスタム例外クラスが実装されている
- [ ] 5つのメソッドが全て動作する
- [ ] Stream APIを使うべき箇所でforループを使っていない
- [ ] PR本文に「checkedExceptionとuncheckedExceptionの違い」が書かれている

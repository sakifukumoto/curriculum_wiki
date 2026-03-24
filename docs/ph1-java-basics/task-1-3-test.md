# 課題1-3：JUnit5テスト

## 目安時間

10〜15時間

---

## Step 1：まず動かす（写経）

### build.gradleまたはpom.xmlにJUnit5を追加する

**Maven（pom.xml）の場合：**

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
</dependency>
```

### 最初のテストを書く

`src/test/java` の中に `CalculatorTest.java` を作成してください。

```java
// Calculator.java（src/main/java に作成）
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public int divide(int a, int b) {
        if (b == 0) throw new ArithmeticException("0で割ることはできません");
        return a / b;
    }
}
```

```java
// CalculatorTest.java（src/test/java に作成）
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    Calculator calc = new Calculator();

    @Test
    void 足し算が正しく計算される() {
        // Arrange（準備）
        int a = 3;
        int b = 4;

        // Act（実行）
        int result = calc.add(a, b);

        // Assert（確認）
        assertEquals(7, result);
    }

    @Test
    void 0で割ると例外が発生する() {
        assertThrows(ArithmeticException.class, () -> {
            calc.divide(10, 0);
        });
    }

    @Test
    void 割り算が正しく計算される() {
        assertEquals(5, calc.divide(10, 2));
    }
}
```

テストを実行：クラス名の左の ▶ をクリック → 全てグリーンになることを確認。

---

## Step 2：理解する

**Q1.** テストメソッド名を日本語にしているのはなぜだと思いますか？

**Q2.** `assertEquals(7, result)` の第1引数と第2引数、どちらが「期待値」でどちらが「実際の値」ですか？順番が逆だとどうなりますか？

**Q3.** Arrange・Act・Assertの3段階に分ける目的は何ですか？

**Q4.** テストが「グリーン（成功）」の状態で、Calculatorの `add` メソッドを `return a - b;` に変えるとどうなりますか？実際に試してみてください。

---

## Step 3：自分で実装する

課題1-2で実装した `Library` クラスのテストを書いてください。

### テストすべきケース

#### `findByIdOrThrow`

| ケース | 期待する結果 |
|--------|------------|
| 存在するIDを渡す | 対応するBookオブジェクトが返る |
| 存在しないIDを渡す | `BookNotFoundException` がthrowされる |

#### `checkoutById`

| ケース | 期待する結果 |
|--------|------------|
| 貸出可能なIDを渡す | そのBookの `isAvailable` が `false` になる |
| 存在しないIDを渡す | `BookNotFoundException` がthrowされる |
| 既に貸出中のIDを渡す | `BookAlreadyCheckedOutException` がthrowされる |

#### `getAvailableBooks`

| ケース | 期待する結果 |
|--------|------------|
| 全図書が貸出可能 | 全図書が返る |
| 一部が貸出中 | 貸出可能なものだけ返る |
| 全図書が貸出中 | 空のリストが返る |

#### `searchByAuthor`

| ケース | 期待する結果 |
|--------|------------|
| 存在する著者名（部分一致） | 一致する図書リストが返る |
| 存在しない著者名 | 空のリストが返る |

---

## 参考

- [JUnit5 公式ドキュメント](https://junit.org/junit5/docs/current/user-guide/)
- [JUnit5の使い方（日本語）](https://qiita.com/KinjiKawaguchi/items/2a56e76bfbda32e1b9f6)

---

## OK基準

- [ ] Step 2の回答がPR本文に書かれている（全4問）
- [ ] 上記の全ケースのテストが書かれている
- [ ] 全テストがグリーン（成功）
- [ ] テストメソッド名が日本語で意図がわかる
- [ ] Arrange / Act / Assert の構造になっている
- [ ] PR本文に「テストを書いてみて気づいたこと」が書かれている

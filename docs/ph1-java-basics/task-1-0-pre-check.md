# 事前学習チェック（課題1-1の前に必ず完了すること）

## この課題の目的

課題1-1以降は「仕様のみ」の課題です。実装方法は自分で調べます。  
**その前に、Javaの基本文法が頭に入っているかを確認します。**

---

## Step 1：推奨教材を読む

以下の範囲を読んでから次に進んでください。

**スッキリわかるJava入門 を使っている場合**

| 章 | 内容 | 目安時間 |
|----|------|---------|
| 1〜3章 | Javaとは・変数・型 | 3時間 |
| 4〜6章 | 条件分岐・繰り返し・配列 | 4時間 |
| 7〜9章 | メソッド・オーバーロード | 3時間 |

**合計：約10時間のインプット**

---

## Step 2：写経課題（手を動かす）

以下のコードを**自分でタイプして**IntelliJで動かしてください。  
コピー&ペーストは禁止です。タイプすることで文法が身につきます。

### 課題A：変数と条件分岐

```java
public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 30; i++) {
            if (i % 15 == 0) {
                System.out.println("FizzBuzz");
            } else if (i % 3 == 0) {
                System.out.println("Fizz");
            } else if (i % 5 == 0) {
                System.out.println("Buzz");
            } else {
                System.out.println(i);
            }
        }
    }
}
```

動かしたら、以下の変更を自分でやってみてください。
- 30ではなく50まで表示するように変える
- "Fizz"を"Java"、"Buzz"を"Boot"に変えてみる

### 課題B：メソッドとString操作

```java
public class StringPractice {
    public static void main(String[] args) {
        System.out.println(reverse("Hello"));       // olleH
        System.out.println(countVowels("Hello"));   // 2
        System.out.println(isPalindrome("racecar")); // true
        System.out.println(isPalindrome("hello"));   // false
    }

    // 文字列を逆順にするメソッド
    static String reverse(String str) {
        // 自分で実装する
        return "";
    }

    // 母音（a,e,i,o,u）の数を数えるメソッド
    static int countVowels(String str) {
        // 自分で実装する
        return 0;
    }

    // 回文かどうか判定するメソッド
    static boolean isPalindrome(String str) {
        // 自分で実装する
        return false;
    }
}
```

### 課題C：配列とループ

```java
import java.util.ArrayList;
import java.util.List;

public class ListPractice {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            numbers.add(i);
        }

        // 1〜10の合計を表示する
        int sum = 0;
        for (int n : numbers) {
            sum += n;
        }
        System.out.println("合計: " + sum); // 合計: 55

        // 偶数だけを表示する
        for (int n : numbers) {
            if (n % 2 == 0) {
                System.out.print(n + " "); // 2 4 6 8 10
            }
        }
    }
}
```

---

## Step 3：自己チェック

以下の質問に**自分の言葉で**答えられるか確認してください。  
答えられない項目は教材を読み直してください。

| チェック項目 | 答えられる？ |
|------------|------------|
| `int`と`Integer`の違いは何ですか？ | ☐ |
| `==`と`.equals()`の違いは何ですか？ | ☐ |
| `for`ループと`while`ループをどう使い分けますか？ | ☐ |
| `String`と`StringBuilder`の違いは何ですか？ | ☐ |
| `null`とは何ですか？なぜ危険なのですか？ | ☐ |
| メソッドに`static`をつける・つけない場合の違いは？ | ☐ |
| `ArrayList`と`Array（配列）`の違いは？ | ☐ |

---

## 提出

Step 2の課題B（StringPractice.java）と課題C（ListPractice.java）を
`submissions/[自分の名前]/ph1/task-1-0/` に置いてPRを提出してください。

## OK基準

- [ ] 課題BのStringPracticeが正しく動作する（3つのメソッドが全て実装されている）
- [ ] 課題CのListPracticeが正しく動作する
- [ ] Step 3の自己チェック全項目に答えられる（PR本文に回答を書く）
- [ ] PR本文の「迷った点」に、理解が難しかった点が書かれている

> ✅ このOK基準を全て満たしたら、課題1-1に進んでください。

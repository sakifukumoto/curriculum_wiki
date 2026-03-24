# 事前確認：Javaを書く準備

## IntelliJで最初のJavaプログラムを動かす

課題1-1に進む前に、IntelliJでJavaが動く状態を確認します。  
**所要時間：30分〜1時間**

---

## Step 1：IntelliJでプロジェクトを作成する

1. IntelliJ IDEAを起動
2. 「New Project」をクリック
3. 以下の設定で作成する

| 項目 | 設定値 |
|------|--------|
| Language | Java |
| Build system | IntelliJ |
| JDK | 21 |
| Project name | java-practice |

4. 「Create」をクリック

---

## Step 2：最初のコードを動かす

`src` フォルダの中に `Main.java` を作成し、以下をタイプして（コピペ不可）実行してください。

```java
public class Main {
    public static void main(String[] args) {
        // 変数
        String name = "田中";
        int age = 25;

        // 条件分岐
        if (age >= 20) {
            System.out.println(name + "さんは成人です");
        } else {
            System.out.println(name + "さんは未成年です");
        }

        // ループ
        for (int i = 1; i <= 5; i++) {
            System.out.println(i + "回目のループ");
        }
    }
}
```

実行方法：`main` メソッドの左の ▶ ボタンをクリック

コンソールに出力が表示されれば成功です。

---

## Step 3：自分で少し変えてみる

以下を試してください。詰まったら調べてOKです。

1. `name` と `age` を自分の名前・年齢に変える
2. ループを10回に変える
3. ループの中で偶数のときだけ「偶数！」と表示する

---

## これだけできればOK

- [ ] IntelliJでプロジェクトを作成できた
- [ ] コードを実行して出力が確認できた
- [ ] Step 3の変更ができた

完了したら課題1-1に進んでください。

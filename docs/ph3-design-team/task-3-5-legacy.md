# 課題3-5：レガシーコード読解・リファクタリング

## この課題の目的

現場に入ると必ず直面する「自分が書いていないコード」と戦う力を鍛える。
コメントがない、変数名が謎、なぜこうなっているか不明、というコードを読んで理解し、安全に改善する。

---

## 目安時間

15〜20時間

---

## ルール

- **テストを先に書いてからリファクタリングすること。** テストなしのリファクタリングは禁止
- リファクタリング前後でテストが全て通ることを確認すること
- 「動けば何でもいい」ではなく「次に読む人が理解できるコード」を目指す

---

## お題：謎のOrderProcessorクラス

以下は「動いてはいるが誰も触りたくない」現場でよく見るコードです。
このコードを読んで、以下の3つをやってください。

```java
public class OrderProcessor {

    private static final int A = 1;
    private static final int B = 2;
    private static final int C = 3;

    public Map<String, Object> proc(String uid, List<String> items, int f, String coupon) {
        Map<String, Object> r = new HashMap<>();
        if (uid == null || uid.isEmpty()) {
            r.put("s", false);
            r.put("msg", "err1");
            return r;
        }
        List<String> processed = new ArrayList<>();
        int total = 0;
        for (int i = 0; i < items.size(); i++) {
            String item = items.get(i);
            // 処理
            if (item != null && !item.isEmpty()) {
                processed.add(item);
                // 価格計算
                if (f == A) {
                    total += 100;
                } else if (f == B) {
                    total += 200;
                } else if (f == C) {
                    total += 500;
                } else {
                    total += 300;
                }
            }
        }
        // クーポン
        if (coupon != null) {
            if (coupon.equals("SALE10")) {
                total = (int)(total * 0.9);
            } else if (coupon.equals("SALE20")) {
                total = (int)(total * 0.8);
            } else if (coupon.equals("SALE50")) {
                total = (int)(total * 0.5);
            }
        }
        // 送料
        if (total < 3000) {
            if (f == A) {
                total += 500;
            } else if (f == B || f == C) {
                total += 800;
            }
        }
        r.put("s", true);
        r.put("items", processed);
        r.put("total", total);
        r.put("uid", uid);
        return r;
    }
}
```

---

## Step 1：コードを読んで説明する（PR本文に書く）

コードを変更せずに読んで、以下を説明してください。

**Q1.** このメソッドは何をするメソッドですか？（3〜5行で）

**Q2.** 定数 `A` `B` `C` は何を意味していると思いますか？

**Q3.** このコードの問題点を全て列挙してください。
（命名・設計・保守性・テスタビリティなどの観点から）

**Q4.** もし「クーポン `SALE30` を追加してください」と言われたら、
このコードのどこをどう変えますか？変えやすいですか？

---

## Step 2：テストを書く

リファクタリングの前に、まず現在の動作を保証するテストを書いてください。
**テストがないリファクタリングは危険です。現場でも同じです。**

テストすべきケース：
- ユーザーIDがnullの場合
- 通常注文（クーポンなし・3000円以上）
- クーポン適用（SALE10・SALE20・SALE50）
- 送料が発生するケース（3000円未満）
- 送料の計算がfの値によって変わるケース

---

## Step 3：リファクタリングする

Step 2のテストが全て通ることを確認しながら、以下の観点でリファクタリングしてください。

**やること：**
- 意味のある名前をつける（メソッド名・変数名・定数名）
- 1メソッドが1つのことだけをするように分割する
- マジックナンバーを排除する
- 「クーポンを追加する」変更が容易な構造にする

**やらないこと（スコープ外）：**
- 機能の追加
- DBや外部APIの追加
- フレームワークの変更

---

## Step 4：「変更に強いか」を確認する

リファクタリング後に以下の変更を実際に加えてください。
**追加が容易であれば、設計が改善された証拠です。**

1. クーポン `SALE30`（30%引き）を追加する
2. 会員種別 `PREMIUM`（プレミアム会員）を追加して、基本価格を700円にする

---

## OK基準

- [ ] Step 1の回答がPR本文に書かれている（全4問）
- [ ] Step 2のテストが書かれており、全て通る
- [ ] Step 3のリファクタリング後もStep 2のテストが全て通る
- [ ] 変数名・メソッド名が意図を表している（A・B・Cが使われていない）
- [ ] Step 4の2つの変更が容易に追加できた
- [ ] PR本文に「リファクタリング前後の比較と、なぜその設計にしたか」が書かれている

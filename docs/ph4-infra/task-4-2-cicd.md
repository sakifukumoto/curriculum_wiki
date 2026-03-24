# 課題4-2：CI（落ちたら直せる）

## この課題のゴール

**「CIパイプラインを一から構築できる」ではなく「CIが落ちたら原因を特定して直せる」レベルを目指します。**

現場ではCIが既に構築されています。
あなたがやることは「PRを出す → CIが自動でテストを実行 → 落ちたら直す」です。

---

## 目安時間

8〜12時間

---

## Step 1：まず動かす

### 用意されたCIを動かす

以下のファイルを `.github/workflows/ci.yml` として配置してください。
**自分でゼロから書く必要はありません。**

```yaml
name: CI

on:
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_DATABASE: task_db
          MYSQL_ROOT_PASSWORD: password
        ports:
          - 3306:3306
        options: --health-cmd="mysqladmin ping" --health-interval=10s --health-retries=5

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-java@v4
        with:
          java-version: "21"
          distribution: "temurin"

      - name: Run tests
        env:
          SPRING_DATASOURCE_URL: jdbc:mysql://localhost:3306/task_db
          SPRING_DATASOURCE_USERNAME: root
          SPRING_DATASOURCE_PASSWORD: password
        run: ./mvnw test
```

PRを出して、GitHub ActionsのタブでCIが動くことを確認してください。

---

## Step 2：理解する

**Q1.** CIとCDの違いを説明してください。

**Q2.** `on: pull_request: branches: [ main ]` は何をトリガーにCIが動きますか？

**Q3.** `services` ブロックでMySQLを起動しているのはなぜですか？

---

## Step 3：CIが落ちたら直す練習

以下の状況を意図的に再現して、CIが落ちたときの対処を練習してください。

### ケース1：テストが失敗する

既存のテストを1つ意図的に壊してください。

```java
// 例：期待値を意図的に間違える
@Test
void タスクが取得できる() {
    // assertEqualsの期待値を間違えてCIを落とす
    assertEquals("間違ったタイトル", task.getTitle()); // ← 意図的にNG
}
```

1. PRを出す
2. CIが落ちることを確認する
3. GitHub Actionsのログでどのテストが失敗したか確認する
4. 修正してpushし、CIがグリーンになることを確認する

### ケース2：コンパイルエラー

意図的にコンパイルエラーを入れてCIを落とし、ログを読んで原因を特定してください。

```java
// 存在しないメソッドを呼ぶ
taskService.nonExistentMethod(); // ← コンパイルエラー
```

> **このStep 3が最重要です。**
> 現場でCIが落ちたとき、ログを読んで5分以内に原因を特定できることが求められます。

---

## CIログの読み方

GitHubのActionsタブ → 失敗したジョブをクリック → ログを展開

**見るべき場所：**

```
[ERROR] Tests run: 3, Failures: 1, Errors: 0    ← 何件失敗したか
[ERROR] TaskServiceTest.タスクが取得できる        ← どのテストが失敗したか
expected: <正しいタイトル> but was: <間違ったタイトル>  ← 何が違うか
  at TaskServiceTest.java:42                    ← どのファイルの何行目か
```

---

## OK基準

- [ ] Step 2の回答がPR本文に書かれている（全3問）
- [ ] CIが動いてテストが自動実行される
- [ ] ケース1：テスト失敗のログを読んで原因を特定・修正できた
- [ ] ケース2：コンパイルエラーのログを読んで原因を特定・修正できた
- [ ] PR本文に「CIが落ちたとき最初に何を確認するか」が書かれている
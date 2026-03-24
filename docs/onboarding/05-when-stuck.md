# 困ったときの対処法

## 基本の手順

詰まったときは、**この順番で**対処してください。

```
1. エラーメッセージを全部読む       （5分）
2. エラーメッセージをGoogleで検索   （15分）
3. 公式ドキュメントを確認する       （10分）
4. 講師に質問する                  （30分経っても解決しない場合）
```

**30分調べてもわからない場合は迷わず質問してください。**  
1人で何時間もはまっても学習効果は低いです。

---

## Step 1：エラーメッセージを読む

エラーが出たら、まず以下を確認します。

```
NullPointerException: Cannot invoke "String.length()" because "str" is null
  at com.example.MyClass.process(MyClass.java:42)
```

| 確認すること | 上の例 |
|------------|--------|
| 何のエラーか | `NullPointerException`（nullのオブジェクトを使おうとした） |
| どのファイルの何行目か | `MyClass.java` の42行目 |
| なぜ起きたか | `str` がnullなのに `.length()` を呼んだ |

> 詳しくは [エラーの読み方ガイド](../ph0-foundation/how-to-debug.md) を参照

---

## Step 2：Googleで検索する

エラーメッセージをそのままコピーして検索します。

**良い検索クエリの例：**
```
NullPointerException Cannot invoke String.length because str is null Spring Boot
```

**信頼できる情報源：**

| サイト | 特徴 |
|--------|------|
| [Stack Overflow](https://stackoverflow.com/) | 同じエラーの解決策が見つかることが多い |
| [Spring Boot公式ドキュメント](https://docs.spring.io/spring-boot/) | 正確。英語だが翻訳しながら読む |
| [Oracle Java公式](https://docs.oracle.com/javase/jp/21/docs/api/) | Javaの標準ライブラリの詳細 |
| Qiita / Zenn | 日本語の解説記事が多い |

**あまり信頼しないほうがいいもの：**
- 古い記事（2020年以前のSpring Boot記事は仕様が変わっている可能性がある）
- 「コードをそのままコピーしてください」という記事（理解せずにコピーしない）

---

## Step 3：講師に質問する

**良い質問の書き方：**

以下の3点をセットで伝えてください。

```markdown
## 状況
（何をしようとしているか）
例：タスク一覧取得APIを実装していて、テストを実行しています。

## エラー内容
（エラーメッセージ全文をコピペ）
例：
java.lang.NullPointerException: Cannot invoke "com.example.TaskRepository.findAll()"
because "this.taskRepository" is null
  at com.example.TaskServiceTest.test(TaskServiceTest.java:25)

## 試したこと
（調べたこと・試したこと）
例：
- @MockBeanと@Mockの違いを調べた
- @InjectMocksを追加してみたが変わらなかった
```

**「エラーが出ました」だけの質問はしないこと。**  
情報が少ないと講師も原因を特定できません。

---

## よくあるエラーと解決法

### Java

| エラー | 原因 | 解決法 |
|--------|------|--------|
| `NullPointerException` | nullのオブジェクトのメソッドを呼んだ | nullチェックを追加。Optionalを使う |
| `ClassNotFoundException` | クラスのパスが間違っている | importを確認する |
| `StackOverflowError` | 再帰が無限ループになっている | 終了条件を確認する |

### Spring Boot

| エラー | 原因 | 解決法 |
|--------|------|--------|
| `Port 8080 was already in use` | 別のアプリが8080を使っている | 他のSpring Bootアプリを止める |
| `No qualifying bean of type` | DIできるBeanが見つからない | @Serviceなどのアノテーションを確認 |
| `Table not found` | テーブルが存在しない | DDLを実行したか確認 |
| `could not initialize proxy - no Session` | N+1問題のLazyロード失敗 | `@Transactional`またはFetch Joinで解決 |

### Git

| 状況 | 解決法 |
|------|--------|
| コンフリクトが起きた | 講師に連絡する（Ph.3まで） |
| 間違えてmainにpushした | `git reset --soft HEAD~1` で取り消す |
| ブランチを間違えた | `git stash` → 正しいブランチに切り替え → `git stash pop` |

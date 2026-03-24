# エラーの読み方・調べ方ガイド

## 大原則

**エラーメッセージは「答え」です。怖がらずに読みましょう。**

## エラーが出たらやること（この順番で）

### 1. エラーメッセージを全部読む

```
NullPointerException: Cannot invoke "String.length()" because "str" is null
  at com.example.MyClass.process(MyClass.java:42)
```

- **何のエラーか**：`NullPointerException`
- **どこで起きたか**：`MyClass.java` の42行目
- **なぜ起きたか**：`str` がnullなのに `.length()` を呼んだ

### 2. エラーメッセージをそのままGoogleで検索

### 3. 信頼できるサイトを見る

| サイト | 特徴 |
|--------|------|
| [Stack Overflow](https://stackoverflow.com/) | 同じエラーの解決策が多い |
| [公式ドキュメント](https://docs.spring.io/) | 正確 |
| Qiita / Zenn | 日本語解説が多い |

### 4. 30分調べてもわからなければ講師に質問

質問するときは以下をセットで：
- 何をしようとしているか
- どんなエラーが出ているか（全文）
- 何を試したか

## よくあるエラー

| エラー | よくある原因 |
|--------|------------|
| `NullPointerException` | nullのメソッドを呼んでいる |
| `Port 8080 was already in use` | 別のアプリが同じポートを使っている |
| `Table not found` | テーブルが存在しないorスペルミス |

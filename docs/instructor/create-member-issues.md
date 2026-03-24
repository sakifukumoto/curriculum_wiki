# create-member-issues.js の使い方

新メンバーの課題issueを一括作成し、親issueの子として紐付けるスクリプトです。

## 事前準備

リポジトリルートの `.env` ファイルに GitHub トークンを設定してください。

```
GITHUB_TOKEN=ghp_...
```

または環境変数として設定することもできます。

```bash
export GITHUB_TOKEN=ghp_...
```

## 実行方法

```bash
node docs/instructor/create-member-issues.js [GitHubアカウント名] [親issueの番号]
```

### 例

```bash
node docs/instructor/create-member-issues.js yamada-taro 34
```

## 注意事項

- **GitHubアカウント名を指定してください。** 日本語名は使用できません。
- 指定したアカウント名が全ての子issueにアサインされます。親issueのアサイン者は自動連動しません。
- 実行前に親issue（指定した番号のissue）が作成済みであることを確認してください。

## 作成されるissue

フェーズ0〜5の全32課題のissueが作成されます。

| フェーズ | 課題数 |
|---------|--------|
| Ph.0 基礎 | 4 |
| Ph.1 Java基礎 | 6 |
| Ph.2 Spring Boot | 7 |
| Ph.3 設計・チーム開発 | 6 |
| Ph.4 インフラ | 3 |
| Ph.5 個人プロジェクト | 6 |

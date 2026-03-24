---
name: "📋 新メンバー登録"
about: 新しいメンバーが参加したときに作成する。子issueは自動生成されます。
title: "【メンバー】[名前を入力]"
labels: []
assignees: ''
---

## メンバー情報

| 項目 | 内容 |
|------|------|
| 名前 | <!-- フルネームを入力 --> |
| GitHub アカウント | <!-- @アカウント名 --> |
| 開始日 | <!-- YYYY-MM-DD --> |

## 課題issueの自動生成

このissueを作成後、以下の手順で全32課題のissueを自動生成してください。

```bash
# curriculum_wiki をcloneしていない場合
git clone https://github.com/sakifukumoto/curriculum_wiki.git
cd curriculum_wiki

# スクリプトを実行（[名前] と [issue番号] を置き換える）
node docs/instructor/create-member-issues.js [名前] [このissueの番号]

# 例：山田太郎さん、このissueが #34 の場合
node docs/instructor/create-member-issues.js yamada-taro 34
```

スクリプトが実行されると、32個の課題issueが自動作成されこのissueの子として紐付けられます。

## 進捗

子issueのチェックボックスはissueがCloseされると自動で✅になります。

---
> 💡 スクリプトを実行する前に `.env` ファイルに `GITHUB_TOKEN=ghp_...` を設定してください。

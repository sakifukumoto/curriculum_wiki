# 課題0-3：Git基本操作

## この課題のゴール

Gitを使ったコード管理の基本を身につける。この課題から全ての提出はGitを通じて行います。

## 目安時間

5〜8時間

## 基本的な流れ

```
ブランチを切る → コードを書く → add → commit → push → PRを出す
```

## 課題手順

1. 自分用のブランチを切る

```bash
git checkout -b feature/[自分の名前]/ph0-task-0-3
# 例: git checkout -b feature/yamada/ph0-task-0-3
```

2. `submissions/[自分の名前]/ph0/hello.txt` を作成し、以下を書く
   - 名前
   - なぜエンジニアを目指したか（3行以上）
   - このカリキュラムで達成したいこと

3. commitしてpushする

```bash
git add .
git commit -m "feat: 自己紹介ファイルを追加"
git push origin feature/[自分の名前]/ph0-task-0-3
```

4. GitHubでPRを作成する（PRテンプレートに沿って記入）

## OK基準

- [ ] ブランチ名が `feature/[名前]/ph0-task-0-3` になっている
- [ ] コミットメッセージが `feat:` から始まっている
- [ ] `submissions/[自分の名前]/` 配下にファイルが作成されている
- [ ] PRの本文3項目が記入されている
- [ ] mainブランチに直接pushしていない

## 参考

- [サルでもわかるGit入門](https://backlog.com/ja/git-tutorial/)

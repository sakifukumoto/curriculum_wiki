# 課題3-4：Git Flow・コードレビュー模擬

## この課題のゴール

現場で使われるGit Flowを体験し、コードレビューの作法を身につける。

## 目安時間

10〜15時間

## Git Flowとは

```
main    ────────────────────────────── 本番リリース済み
          ↑ merge              ↑ merge
develop ────────────────────────────── 開発統合ブランチ
          ↑ merge  ↑ merge  ↑ merge
feature ──────    ──────   ──────────  機能開発ブランチ
```

## 課題

### Part 1：featureブランチで機能追加

課題2-2のタスク管理APIに「タスクへのコメント機能」を追加してください。

- POST `/api/tasks/{taskId}/comments` ：コメント投稿
- GET `/api/tasks/{taskId}/comments` ：コメント一覧取得

#### 作業手順

```bash
# developブランチを最新に
git checkout develop
git pull origin develop

# featureブランチを切る
git checkout -b feature/[名前]/add-comment-api

# 実装・commit（機能単位でcommitを分ける）
git commit -m "feat: コメントエンティティとRepositoryを追加"
git commit -m "feat: コメント投稿APIを追加"
git commit -m "feat: コメント一覧取得APIを追加"
git commit -m "test: コメントAPIのテストを追加"

# developへPR
git push origin feature/[名前]/add-comment-api
```

### Part 2：PRテンプレートを丁寧に記入

PRテンプレートの全項目を具体的に書くこと。「迷った点がない」は疑わしいので正直に書いてください。

## OK基準

- [ ] featureブランチからのPRが作成されている
- [ ] コミットが機能単位で分割されている
- [ ] PRテンプレートの全項目が記入されている
- [ ] 「迷った点」に具体的な内容が書かれている
- [ ] レビューコメントへの返信が「修正しました」だけでない

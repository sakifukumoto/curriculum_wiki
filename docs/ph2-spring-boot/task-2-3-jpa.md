# 課題2-3：JPA・N+1問題

## この課題のゴール

N+1問題を理解し、発生させずに実装できるようになる。

## 目安時間

15〜20時間

## N+1問題とは

ユーザー一覧（1回のSQL）を取得した後、各ユーザーのタスク（N回のSQL）を取得してしまう問題。

```
// 悪い例：ユーザーが100人いたら101回SQLが発行される
List<User> users = userRepository.findAll(); // 1回
for (User user : users) {
    List<Task> tasks = taskRepository.findByUserId(user.getId()); // 100回
}
```

## 仕様

課題2-2のタスク管理APIにユーザー機能を追加してください。

### 追加するエンドポイント

- `GET /api/users` ：ユーザー一覧（各ユーザーのタスク件数を含む）
- `GET /api/users/{id}/tasks` ：特定ユーザーのタスク一覧

### 実装上の制約

- `GET /api/users` は**N+1問題を発生させずに**実装すること
- JPAの `@EntityGraph` または `JOIN FETCH` を使うこと

## OK基準

- [ ] エンドポイントが動作する
- [ ] `GET /api/users` でN+1問題が発生していない（SQLログで確認）
- [ ] `@OneToMany` / `@ManyToOne` のリレーションが正しく設定されている
- [ ] PR本文に「N+1問題の説明と、採用した解決策の理由」が書かれている

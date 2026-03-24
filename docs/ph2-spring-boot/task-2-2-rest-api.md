# 課題2-2：REST API設計・実装（タスク管理API）

## この課題のゴール

Spring BootでCRUD REST APIを一人で設計・実装できるようになる。

## 目安時間

20〜30時間

## 仕様

タスク管理APIを実装してください。

### エンドポイント一覧

| メソッド | パス | 説明 |
|--------|------|------|
| GET | `/api/tasks` | タスク一覧取得 |
| GET | `/api/tasks/{id}` | タスク詳細取得 |
| POST | `/api/tasks` | タスク作成 |
| PUT | `/api/tasks/{id}` | タスク更新 |
| DELETE | `/api/tasks/{id}` | タスク削除 |

### タスクのデータ構造

| フィールド | 型 | 制約 |
|-----------|-----|------|
| `id` | Long | 自動採番 |
| `title` | String | 必須・100文字以内 |
| `description` | String | 任意 |
| `status` | Enum | `TODO` / `IN_PROGRESS` / `DONE` |
| `createdAt` | LocalDateTime | 自動設定 |
| `updatedAt` | LocalDateTime | 自動更新 |

### エラーレスポンス形式

```json
{
  "status": 404,
  "message": "タスクが見つかりません: id=99",
  "timestamp": "2024-01-15T10:30:00"
}
```

### レイヤー構成

```
Controller → Service → Repository（Spring Data JPA）
```

## 成果物（PRに含めること）

- 実装コード
- テーブル定義（DDL）
- 動作確認スクリーンショット（curl or Postman）
- PR本文：設計で迷った点・採用した理由

## OK基準

- [ ] 5つのエンドポイントが全て動作する
- [ ] 存在しないIDへのGETが404を返す
- [ ] `@ControllerAdvice` で例外が一元管理されている
- [ ] Controllerにビジネスロジックを書いていない
- [ ] Controllerに直接SQLを書いていない
- [ ] PR本文に設計の意図が書かれている

# 課題2-6：Thymeleaf + Bootstrap（最低限の画面）

## この課題の位置づけ

このカリキュラムのゴールは**バックエンドエンジニア**です。
フロントエンドを本格的に学ぶ必要はありません。

ただし以下の理由で「最低限の画面が作れる」状態は必要です。

- 模擬プロジェクト（Ph.5）でデモできるものを作るため
- 現場でも「管理画面くらいは作れる」を求められることがある

**このカリキュラムでフロントに使う時間はここだけです。**

---

## CSSの方針（重要）

| 項目 | 方針 |
|------|------|
| 使うもの | **Bootstrap 5（CDN 1行のみ）** |
| やること | Bootstrapのクラスを当てるだけ |
| やらないこと | カスタムCSSファイルを書く・デザインにこだわる |
| 時間の上限 | **1画面あたり30分以内** |

> ⚠️ **CSSに時間をかけすぎないこと。**
> バックエンドエンジニアとして評価されるのはAPIの設計・品質・テストです。
> 見た目は「崩れていなければOK」のレベルで十分です。

---

## 目安時間

10〜15時間

---

## Step 1：まず動かす

### 依存関係を追加する

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

### BootstrapをHTMLに追加する

全テンプレートの `<head>` に以下の1行を追加するだけです。
CSSファイルを自分で書く必要はありません。

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>タスク管理</title>
    <!-- Bootstrap 5：この1行だけ追加する -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="container mt-4">
    <h1>Hello, Thymeleaf!</h1>
</body>
</html>
```

### よく使うBootstrapクラス（これだけ覚えれば十分）

| クラス | 効果 |
|--------|------|
| `container` | 中央寄せ・余白設定 |
| `mt-4` / `mb-4` | 上下の余白（margin） |
| `table table-bordered` | テーブルに枠線 |
| `btn btn-primary` | 青いボタン |
| `btn btn-danger` | 赤いボタン（削除用） |
| `form-control` | フォーム入力欄のスタイル |
| `form-label` | ラベルのスタイル |
| `alert alert-danger` | エラーメッセージの赤いボックス |

---

## Step 2：理解する

**Q1.** `@RestController` と `@Controller` の違いは何ですか？

**Q2.** `model.addAttribute("tasks", taskService.findAll())` の第1引数は
HTMLのどこで使いますか？

**Q3.** `redirect:/tasks` と `return "task-list"` の違いは何ですか？
いつどちらを使いますか？

---

## Step 3：自分で実装する

課題2-2で作ったタスク管理APIに、以下の3画面を追加してください。

### 作る画面

| 画面 | URL | 説明 |
|------|-----|------|
| タスク一覧 | `GET /tasks` | タスクの一覧をテーブルで表示 |
| タスク作成フォーム | `GET /tasks/new` | タスクを作成するフォーム |
| タスク作成処理 | `POST /tasks` | フォームの送信先。完了後は一覧にリダイレクト |

> ⚠️ 既存のREST APIのエンドポイント（`/api/tasks`）は残したまま追加してください。

### 完成イメージ（タスク一覧画面）

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>タスク一覧</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="container mt-4">
    <h1>タスク一覧</h1>
    <a href="/tasks/new" class="btn btn-primary mb-3">新規作成</a>

    <table class="table table-bordered">
        <thead class="table-light">
            <tr>
                <th>ID</th>
                <th>タイトル</th>
                <th>ステータス</th>
                <th>作成日時</th>
            </tr>
        </thead>
        <tbody>
            <tr th:each="task : ${tasks}">
                <td th:text="${task.id}"></td>
                <td th:text="${task.title}"></td>
                <td th:text="${task.status}"></td>
                <td th:text="${task.createdAt}"></td>
            </tr>
        </tbody>
    </table>
</body>
</html>
```

### 完成イメージ（タスク作成フォーム）

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>タスク作成</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="container mt-4">
    <h1>タスク作成</h1>

    <form th:action="@{/tasks}" th:object="${taskForm}" method="post">
        <div class="mb-3">
            <label class="form-label">タイトル</label>
            <input type="text" th:field="*{title}" class="form-control">
            <div class="text-danger" th:if="${#fields.hasErrors('title')}"
                 th:errors="*{title}"></div>
        </div>
        <div class="mb-3">
            <label class="form-label">説明</label>
            <textarea th:field="*{description}" class="form-control"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">作成</button>
        <a href="/tasks" class="btn btn-secondary">キャンセル</a>
    </form>
</body>
</html>
```

### Controllerの実装パターン

```java
@Controller
@RequestMapping("/tasks")
public class TaskViewController {

    private final TaskService taskService;

    public TaskViewController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public String list(Model model) {
        model.addAttribute("tasks", taskService.findAll());
        return "task-list"; // templates/task-list.html を返す
    }

    @GetMapping("/new")
    public String newForm(Model model) {
        model.addAttribute("taskForm", new TaskRequest());
        return "task-form";
    }

    @PostMapping
    public String create(@Valid @ModelAttribute("taskForm") TaskRequest request,
                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "task-form"; // エラーがあればフォームに戻る
        }
        taskService.create(request);
        return "redirect:/tasks"; // 作成後は一覧にリダイレクト
    }
}
```

---

## 「やりすぎ」の判断基準

以下に当てはまったら深追いしているサインです。止めてください。

- [ ] `<style>` タグまたは `.css` ファイルを自分で書いている
- [ ] 色・フォント・アニメーションを調整している
- [ ] 1画面のHTML調整に30分以上かけている
- [ ] レスポンシブ対応（スマホ表示）を気にしている

---

## OK基準

- [ ] Step 2の回答がPR本文に書かれている（全3問）
- [ ] 3画面が全て動作する（一覧表示・フォーム表示・作成処理）
- [ ] フォームのバリデーションエラーが画面に表示される
- [ ] 既存の `/api/tasks` REST APIが壊れていない
- [ ] BootstrapのCDNを使って見た目が崩れていない
- [ ] カスタムCSSファイルを作っていない
- [ ] PR本文に「`@Controller` と `@RestController` を使い分けた理由」が書かれている

---

## 参考

- [Thymeleaf公式ドキュメント（日本語）](https://www.thymeleaf.org/doc/tutorials/3.1/usingthymeleaf_ja.html)
- [Bootstrap 5 公式ドキュメント](https://getbootstrap.jp/)
- よく使うBootstrapコンポーネント：[Table](https://getbootstrap.jp/docs/5.3/content/tables/) / [Forms](https://getbootstrap.jp/docs/5.3/forms/overview/) / [Buttons](https://getbootstrap.jp/docs/5.3/components/buttons/)
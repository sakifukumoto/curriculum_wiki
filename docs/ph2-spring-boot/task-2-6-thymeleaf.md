# 課題2-6：Thymeleaf（画面の作り方）

## この課題の位置づけ

このカリキュラムのゴールは**バックエンドエンジニア**です。
フロントエンドを本格的に学ぶ必要はありません。

ただし以下の理由で「最低限の画面が作れる」状態は必要です。

- 模擬プロジェクト（Ph.5）で動くものをデモするため
- 現場でも「管理画面くらいは作れる」を求められることがある
- APIの動作確認にブラウザが使えると便利

**このカリキュラムでフロントに使う時間はここだけです。** 深追いしないこと。

---

## 目安時間

10〜15時間

---

## ThymeleafとReactの違い

| | Thymeleaf | React/Vue |
|-|-----------|-----------|
| 動く場所 | サーバー側（Spring Bootが画面を生成） | ブラウザ側 |
| 向いている用途 | 管理画面・シンプルな画面 | 複雑なUI・SPA |
| 学習コスト | 低い（HTMLの延長） | 高い（JS/TS・状態管理等） |
| Spring Bootとの相性 | ◎（公式サポート） | ○（APIサーバーとして使う） |

バックエンドエンジニアが「動く画面を作る」には Thymeleaf が最適です。

---

## Step 1：まず動かす

### 依存関係を追加する

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

### Controllerを作る

```java
@Controller  // ← @RestControllerではなく@Controllerを使う
public class HelloController {

    @GetMapping("/hello")
    public String hello(Model model) {
        model.addAttribute("message", "こんにちは、Spring Boot！");
        model.addAttribute("name", "山田太郎");
        return "hello"; // → src/main/resources/templates/hello.html を返す
    }
}
```

### HTMLテンプレートを作る

`src/main/resources/templates/hello.html` を作成してください。

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Hello</title>
</head>
<body>
    <h1 th:text="${message}">ここにメッセージが入る</h1>
    <p>こんにちは、<span th:text="${name}">名前</span>さん！</p>
</body>
</html>
```

ブラウザで `http://localhost:8080/hello` を開き、表示を確認してください。

---

## Step 2：理解する

**Q1.** `@RestController` と `@Controller` の違いは何ですか？

**Q2.** `model.addAttribute("message", "...")` の第1引数はHTMLのどこで使いますか？

**Q3.** ThymeleafのHTMLを直接ブラウザで開くとどう表示されますか？なぜ実用的なのですか？

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
        return "task-list";
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
            return "task-form";
        }
        taskService.create(request);
        return "redirect:/tasks";
    }
}
```

---

## 重要：これ以上深追いしないこと

一覧・フォーム・リダイレクトの3パターンだけ覚えれば十分です。
Ph.5の模擬プロジェクトで必要になった機能はそのとき調べてください。

---

## OK基準

- [ ] Step 2の回答がPR本文に書かれている（全3問）
- [ ] 3画面が全て動作する（一覧表示・フォーム表示・作成処理）
- [ ] フォームのバリデーションエラーが画面に表示される
- [ ] 既存の `/api/tasks` REST APIが壊れていない
- [ ] PR本文に「`@Controller` と `@RestController` を使い分けた理由」が書かれている

---

## 参考

- [Thymeleaf公式ドキュメント](https://www.thymeleaf.org/doc/tutorials/3.1/usingthymeleaf_ja.html)
- [Spring Boot + Thymeleaf入門（Qiita）](https://qiita.com/search?q=spring+boot+thymeleaf)
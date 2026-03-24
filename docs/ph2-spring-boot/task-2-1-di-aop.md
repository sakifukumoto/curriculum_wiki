# 課題2-1：DI・Bean・AOP

## この課題のゴール

Spring Bootの核心であるDI（依存性の注入）とAOPを理解する。

## 目安時間

10〜15時間

## DI（依存性の注入）とは

```java
// DIなし（悪い例）
public class TaskService {
    private TaskRepository repo = new TaskRepository(); // 直接生成
}

// DIあり（良い例）
@Service
public class TaskService {
    private final TaskRepository repo;

    public TaskService(TaskRepository repo) { // Springが注入してくれる
        this.repo = repo;
    }
}
```

## 仕様

以下の構成でHello Worldアプリを作成してください。

1. `GET /api/hello` にアクセスすると `{"message": "Hello, World!"}` を返すAPI
2. `GreetingService` インターフェースと `JapaneseGreetingService` / `EnglishGreetingService` の2実装を作る
3. `@Profile` アノテーションで環境によって切り替えられるようにする
4. AOPでAPIのリクエスト開始・終了をログ出力する `LoggingAspect` を実装する

## OK基準

- [ ] `@Service` `@Repository` `@Controller` の使い分けができている
- [ ] コンストラクタインジェクションを使っている（`@Autowired` フィールド注入はNG）
- [ ] `LoggingAspect` がAPIリクエストのたびにログを出力する
- [ ] PR本文に「DIを使うことでどんな利点があるか」が書かれている

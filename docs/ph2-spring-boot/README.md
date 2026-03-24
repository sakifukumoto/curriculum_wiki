# Ph.2 Spring Boot基礎

## ゴール

- Spring BootでREST APIを一から設計・実装できる
- DIの仕組みを理解し、適切なレイヤー分離ができる
- JPA/Hibernateを使ったDB操作ができる（N+1問題を理解・対処できる）
- Spring Securityで基本的な認証ができる
- Thymeleafで最低限の画面（一覧・フォーム）が作れる

## 期間の目安

**3ヶ月**（週20時間 × 12週 = 240時間）

## 課題一覧

| 課題 | 内容 | レベル |
|------|------|--------|
| [課題2-1](task-2-1-di-aop.md) | DI・Bean・AOP | 🟡 Step1〜3形式 |
| [課題2-2](task-2-2-rest-api.md) | REST API設計・実装 | 🟡 Step1〜3形式 |
| [課題2-3](task-2-3-jpa.md) | JPA・N+1問題 | 🔴 設計から |
| [課題2-4](task-2-4-validation.md) | バリデーション・エラー処理 | 🟡 Step1〜3形式 |
| [課題2-5](task-2-5-security.md) | Spring Security基礎 | 🔴 設計から |
| [課題2-6](task-2-6-thymeleaf.md) | Thymeleaf（画面の作り方） | 🟡 Step1〜3形式 |

> ⚠️ **課題2-6はバックエンド専業向けの最小限フロント実装です。**
> 深追いせず、一覧・フォーム・リダイレクトの3パターンだけ習得してください。

## フェーズ通過基準

- DIとは何か、なぜ使うか
- Controller / Service / Repository の役割分担
- N+1問題とは何か、どう解決するか
- Spring Securityの認証フロー
- `@Controller` と `@RestController` の使い分け

## 推奨教材

- [Spring Boot公式ドキュメント](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- 書籍：「Spring Boot 2 プログラミング入門」
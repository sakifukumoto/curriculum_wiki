# 課題4-2：GitHub Actions CI/CD

## この課題のゴール

PRを出すと自動でテストが走り、mainにマージすると自動デプロイされる仕組みを作る。

## 目安時間

10〜15時間

## 仕様

### CI（継続的インテグレーション）

PRを作成・更新するたびに自動でテストが実行されるワークフローを作成する。

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
      - name: Run tests
        run: ./mvnw test
```

### CD（継続的デリバリー）

mainブランチへのマージ後にDockerイメージをビルドしてGitHub Container Registryにpushする。

## OK基準

- [ ] PRを出すとGitHub ActionsでCIが動作する
- [ ] テストが失敗するとPRにエラーが表示される
- [ ] mainマージ後にDockerイメージがGHCRにpushされる
- [ ] PR本文に「CIとCDの違いと、それぞれの目的」が書かれている

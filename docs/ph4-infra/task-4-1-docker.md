# 課題4-1：Docker（読める・使える）

## この課題のゴール

**「Dockerを一から書ける」ではなく「Dockerで動いている環境で開発できる」レベルを目指します。**

現場では既存のDockerfileとdocker-compose.ymlが用意されています。
あなたがやることは `docker compose up` で環境を立ち上げ、開発することです。

---

## 目安時間

10〜15時間

---

## Step 1：まず動かす

### Dockerをインストールする

[Docker Desktop](https://www.docker.com/products/docker-desktop/) をダウンロードしてインストールしてください。

```bash
# インストール確認
docker --version
docker compose version
```

### 用意されたDockerfileを動かす

以下のファイルを用意しました。**自分で書く必要はありません。**
そのまま動かして、何をしているか読んで理解することが目標です。

**Dockerfile**
```dockerfile
# ① ビルドステージ：Javaのビルド環境
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# ② 実行ステージ：軽量なJRE環境
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**docker-compose.yml**
```yaml
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/task_db
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: password
    depends_on:
      db:
        condition: service_healthy

  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: task_db
      MYSQL_ROOT_PASSWORD: password
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      retries: 5
```

```bash
# これだけで起動する
docker compose up

# バックグラウンドで起動
docker compose up -d

# 停止
docker compose down

# ログを見る
docker compose logs app
```

`http://localhost:8080` にアクセスしてAPIが動作することを確認してください。

---

## Step 2：理解する

**Q1.** Dockerfileの `FROM eclipse-temurin:21-jdk AS builder` と
`FROM eclipse-temurin:21-jre` の2段階に分ける理由は何ですか？
（ヒント：JDKとJREの違いで検索してみてください）

**Q2.** `docker-compose.yml` の `depends_on` は何のためにありますか？
これを削除するとどんな問題が起きますか？

**Q3.** `ports: "8080:8080"` の左側の8080と右側の8080はそれぞれ何を指していますか？

**Q4.** `docker compose down` と `docker compose down -v` の違いを調べて説明してください。

---

## Step 3：よく使うコマンドを覚える

以下のコマンドを実際に実行して、それぞれ何をするか確認してください。

```bash
# 起動中のコンテナを確認
docker compose ps

# アプリのログをリアルタイムで見る
docker compose logs -f app

# DBコンテナの中に入る（MySQLに直接接続）
docker compose exec db mysql -u root -ppassword task_db

# コンテナを再ビルドして起動（コードを変更した後）
docker compose up --build

# 全コンテナ・ネットワーク・ボリュームを削除（環境をリセットしたいとき）
docker compose down -v
```

> **現場でよく使うのはこの5コマンドです。** 他は覚えなくていいです。

---

## OK基準

- [ ] Step 2の回答がPR本文に書かれている（全4問）
- [ ] `docker compose up` でアプリが起動する
- [ ] `http://localhost:8080` でAPIが動作する
- [ ] Step 3の5コマンドを全て実行して動作を確認した
- [ ] PR本文に「DockerとDocker Composeの役割の違い」が書かれている

---

## 参考

- [Docker公式ドキュメント（日本語）](https://docs.docker.jp/)
- [Docker Compose入門（Qiita）](https://qiita.com/search?q=docker+compose+%E5%85%A5%E9%96%80)
# 課題4-1：Docker化

## この課題のゴール

Spring BootアプリをDockerコンテナで動かせるようになる。

## 目安時間

10〜15時間

## 仕様

課題2-2のタスク管理APIをDockerで動くようにしてください。

### 作成するファイル

#### Dockerfile

```dockerfile
# ビルドステージ
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# 実行ステージ
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### docker-compose.yml

アプリ（Spring Boot）とDB（MySQL）を `docker compose up` の1コマンドで起動できるようにする。

```yaml
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/task_db

  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: task_db
      MYSQL_ROOT_PASSWORD: password
```

## OK基準

- [ ] `docker compose up` でアプリが起動する
- [ ] APIが `localhost:8080` で動作する
- [ ] マルチステージビルドで最終イメージを軽量化している
- [ ] PR本文に「DockerとDocker Composeの役割の違い」が書かれている

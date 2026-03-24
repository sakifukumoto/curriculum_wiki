# 課題2-7：デバッグ課題（Spring Boot編）

## この課題の目的

Spring Bootのよくある落とし穴を「実際に踏んで直す」経験を積む。
現場で「なぜ動かないか」を調査するときの思考プロセスを身につける。

---

## 目安時間

10〜15時間

---

## ルール

- エラーが出たらまずログを全部読むこと
- 「とりあえず動いた」で終わりにしない。**なぜ動くようになったかを説明できること**
- PR本文に「何のエラーが出て、何が原因で、どう直したか」を必ず書くこと

---

## バグ1：N+1問題（パフォーマンス劣化）

以下のコードはユーザー一覧を取得するAPIです。
ユーザーが100人いる場合、SQLが何回発行されるか確認してください。

```java
@GetMapping("/api/users")
public List<UserResponse> getUsers() {
    List<User> users = userRepository.findAll();
    return users.stream()
        .map(user -> new UserResponse(
            user.getId(),
            user.getName(),
            user.getTasks().size() // ← ここに問題がある
        ))
        .collect(Collectors.toList());
}
```

**手順：**
1. `application.properties` に以下を追加してSQLログを有効にする
```properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```
2. APIを叩いてログに何本のSQLが出るか数える
3. N+1問題だと確認したら修正する

**PR本文に書くこと：**
1. 修正前に何本のSQLが発行されていたか
2. なぜN+1が起きていたか（仕組みの説明）
3. どう修正したか、修正後は何本になったか
4. `@EntityGraph` と `JOIN FETCH` のどちらを選んだか、その理由

---

## バグ2：バリデーションが効いていない

以下のコードは「titleが空のタスクは作れない」という要件があります。
しかし実際には空のtitleでもタスクが作れてしまいます。なぜかを調べて修正してください。

```java
// TaskRequest.java
public class TaskRequest {
    @NotBlank(message = "タイトルは必須です")
    private String title;
    private String description;
    // getter/setter
}

// TaskController.java
@PostMapping("/api/tasks")
public ResponseEntity<Task> createTask(@RequestBody TaskRequest request) {
    Task task = taskService.create(request);
    return ResponseEntity.status(201).body(task);
}
```

```bash
# これが成功してしまう（本来は400エラーになるべき）
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "", "description": "説明"}'
```

**PR本文に書くこと：**
1. バリデーションが効いていなかった原因（アノテーション1つ不足している）
2. 修正内容
3. バリデーションエラーが起きたときのレスポンスはどうなるか

---

## バグ3：Spring Securityで全エンドポイントが403になる

以下の設定を追加したところ、全てのAPIが403 Forbiddenを返すようになりました。
意図は「/api/auth/ 以下は認証不要、それ以外は認証必要」です。修正してください。

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );
        return http.build();
    }
}
```

```bash
# /api/auth/login は通るが...
curl -X POST http://localhost:8080/api/auth/login -d '{"email":"test@test.com","password":"pass"}'
# → 200 OK

# /api/tasks が403になってしまう
curl -H "Authorization: Bearer [token]" http://localhost:8080/api/tasks
# → 403 Forbidden  ← 本来は200になるべき
```

**ヒント：** JWTフィルターがFilterChainに追加されていません。

**PR本文に書くこと：**
1. 何が足りなかったか
2. JWTフィルターをどこに追加したか、なぜその位置か
3. `SessionCreationPolicy.STATELESS` とは何か、なぜJWT認証では必要か

---

## OK基準

- [ ] 3つのバグを全て修正した
- [ ] バグ1：SQLログで修正前後の本数を確認・記録した
- [ ] バグ2：バリデーションが効くようになり、空titleで400が返る
- [ ] バグ3：JWTトークンを使った認証が通るようになった
- [ ] 全てのバグについてPR本文に「原因・修正理由」が書かれている

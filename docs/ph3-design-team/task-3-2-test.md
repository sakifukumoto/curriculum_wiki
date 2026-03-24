# 課題3-2：テスト設計・Mockito

## この課題のゴール

ServiceクラスのテストをMockitoを使って書けるようになる。

## 目安時間

15〜20時間

## Mockitoとは

テスト対象が依存しているクラス（DBなど）を「偽物」に差し替えるライブラリ。

```java
@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository; // DBを呼ばずに済む偽物

    @InjectMocks
    private TaskService taskService; // 偽物のRepositoryが注入される

    @Test
    void タスクが存在する場合は取得できる() {
        // Arrange
        Task task = new Task(1L, "テストタスク", TaskStatus.TODO);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        // Act
        Task result = taskService.findById(1L);

        // Assert
        assertEquals("テストタスク", result.getTitle());
        verify(taskRepository, times(1)).findById(1L);
    }
}
```

## 仕様

課題2-2の `TaskService` に対して、以下のテストを書いてください。

| テスト対象メソッド | テストするケース |
|-----------------|---------------|
| `findById` | 存在するID・存在しないID |
| `create` | 正常作成・タイトルが空の場合 |
| `updateStatus` | 正常更新・存在しないIDの場合 |
| `delete` | 正常削除・存在しないIDの場合 |

## OK基準

- [ ] Mockitoで `TaskRepository` がモックされている
- [ ] DBへのアクセスなしにServiceのテストが通る
- [ ] `verify` で意図したメソッドが呼ばれているか確認している
- [ ] 全ケースのテストが通る
- [ ] PR本文に「モックを使うことの意味」が書かれている

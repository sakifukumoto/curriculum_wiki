# 課題1-3：JUnit5テスト

## この課題のゴール

テストコードを書く習慣をつける。「動く」ではなく「正しく動く」を証明できるようになる。

## 目安時間

10〜15時間

## 仕様

課題1-1・1-2で実装した `Library` クラスのテストを書いてください。

### テストすべきケース

#### `findByIdOrThrow`

| ケース | 期待する結果 |
|--------|------------|
| 存在するIDを渡す | 対応するBookが返る |
| 存在しないIDを渡す | `BookNotFoundException` がthrowされる |

#### `checkoutById`

| ケース | 期待する結果 |
|--------|------------|
| 貸出可能なIDを渡す | `isAvailable` が `false` になる |
| 存在しないIDを渡す | `BookNotFoundException` がthrowされる |
| 貸出中のIDを渡す | `BookAlreadyCheckedOutException` がthrowされる |

### テストの基本形（AAA構造）

```java
@Test
void 存在するIDで検索すると図書が返る() {
    // Arrange（準備）
    Library library = new Library();
    library.addBook(new Book("B001", "Clean Code", "Martin"));

    // Act（実行）
    Book result = library.findByIdOrThrow("B001");

    // Assert（確認）
    assertEquals("B001", result.getId());
}

@Test
void 存在しないIDで検索すると例外がthrowされる() {
    Library library = new Library();
    assertThrows(BookNotFoundException.class, () -> {
        library.findByIdOrThrow("INVALID");
    });
}
```

## OK基準

- [ ] 全ケースのテストが書かれている
- [ ] テストが全て通る（グリーン）
- [ ] テストメソッド名が日本語で意図がわかる
- [ ] Arrange / Act / Assert の構造になっている
- [ ] PR本文に「テストを書いてみて気づいたこと」が書かれている

# 課題1-2：例外処理・Stream API・Optional

## この課題のゴール

モダンなJavaの書き方（Stream API・Optional・例外設計）を習得する。

## 目安時間

15〜20時間

## 仕様

課題1-1の `Library` クラスを拡張してください。

### カスタム例外クラスの実装

```java
// 図書が見つからない場合
public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(String id) {
        super("図書が見つかりません: " + id);
    }
}

// 既に貸出中の場合
public class BookAlreadyCheckedOutException extends RuntimeException {
    // 自分で実装する
}
```

### Libraryクラスへのメソッド追加

| メソッド | 説明 |
|---------|------|
| `findByIdOrThrow(String id)` | 見つからなければ `BookNotFoundException` をthrow |
| `checkoutById(String id)` | 貸出処理。例外はthrow |
| `searchByAuthor(String author)` | 著者名で部分一致検索（Stream使用） |
| `getTopNByTitle(int n)` | タイトルのアルファベット順で上位N件 |
| `countByAvailability()` | 貸出可能数と貸出中数を `Map<String, Long>` で返す |

## OK基準

- [ ] カスタム例外が適切に定義・throwされている
- [ ] 5つのメソッドが全て動作する
- [ ] Stream APIを使うべき箇所でforループを使っていない
- [ ] PR本文に「checkedExceptionとuncheckedExceptionの違い」が書かれている

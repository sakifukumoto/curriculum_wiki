# 課題1-5：デバッグ課題（壊れたコードを直す）

## この課題の目的

**「正しいコードを書く」だけでなく「壊れたコードを直せる」力を鍛える。**

現場で時間を奪われるのは圧倒的に「なぜ動かないか」の調査です。
この課題では意図的にバグを仕込んだコードを渡すので、原因を特定して修正してください。

---

## 目安時間

8〜12時間

---

## ルール

- エラーメッセージを必ず読むこと。読まずに勘で直すのは禁止
- 原因を特定する前に修正しないこと（「とりあえず変えたら直った」はNG）
- PR本文に「原因・調査の過程・修正内容」を必ず書くこと

---

## バグ1：NullPointerException

以下のコードを動かすと `NullPointerException` が発生します。
**原因を特定し、修正してください。**

```java
public class UserService {
    private UserRepository userRepository;

    public String getUserName(int id) {
        User user = userRepository.findById(id);
        return user.getName().toUpperCase();
    }
}

public class UserRepository {
    public User findById(int id) {
        if (id == 1) {
            return new User(1, "田中");
        }
        return null; // 見つからない場合はnullを返す
    }
}

public class Main {
    public static void main(String[] args) {
        UserService service = new UserService();
        System.out.println(service.getUserName(1));  // OK
        System.out.println(service.getUserName(99)); // ← ここでクラッシュ
    }
}
```

**PR本文に書くこと：**
1. どこで何のエラーが出たか（エラーメッセージを引用）
2. なぜそのエラーが出たか
3. どう修正したか、その修正が正しい理由
4. この修正方法以外にどんな対処法があるか（Optional・nullチェック・例外throwなど）

---

## バグ2：論理エラー（テストが落ちる）

以下のコードはコンパイルは通りますが、テストが落ちます。
**どこが間違っているか特定してください。**

```java
public class CartService {
    private List<Item> items = new ArrayList<>();

    public void addItem(Item item) {
        items.add(item);
    }

    public int getTotalPrice() {
        int total = 0;
        for (int i = 0; i <= items.size(); i++) { // ← バグあり
            total += items.get(i).getPrice();
        }
        return total;
    }

    public void removeItem(String itemName) {
        for (Item item : items) {
            if (item.getName().equals(itemName)) {
                items.remove(item); // ← バグあり
                break;
            }
        }
    }
}
```

```java
@Test
void 合計金額が正しく計算される() {
    CartService cart = new CartService();
    cart.addItem(new Item("りんご", 100));
    cart.addItem(new Item("みかん", 80));
    assertEquals(180, cart.getTotalPrice());
}

@Test
void アイテムが削除できる() {
    CartService cart = new CartService();
    cart.addItem(new Item("りんご", 100));
    cart.addItem(new Item("みかん", 80));
    cart.removeItem("りんご");
    assertEquals(1, cart.size());
}
```

**PR本文に書くこと：**
1. バグが2箇所あります。それぞれどこで何が起きているか
2. なぜそのバグが発生するか（仕組みの説明）
3. 修正内容とその理由

---

## バグ3：トランザクションの落とし穴

以下のコードは「2つのDBへの書き込みをセットで行いたい」という意図で書かれていますが、
片方だけ保存されてしまうことがあります。**問題を説明し、修正してください。**

```java
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryRepository inventoryRepository;

    // 注文を受け付けて在庫を減らす
    public void placeOrder(Order order) {
        orderRepository.save(order);           // 注文を保存
        inventoryRepository.reduce(order.getProductId(), order.getQuantity()); // 在庫を減らす
    }
}
```

**PR本文に書くこと：**
1. どんな状況で「片方だけ保存される」問題が起きるか（具体的なシナリオ）
2. 修正方法（Spring Bootでのトランザクション管理）
3. `@Transactional` をつけるだけで解決するか？注意点はあるか？

---

## OK基準

- [ ] 3つのバグを全て修正した
- [ ] 各バグについてPR本文に「原因・調査過程・修正理由」が書かれている
- [ ] バグ1について「Optional以外の修正方法」も説明されている
- [ ] バグ2について2箇所のバグがそれぞれ説明されている
- [ ] バグ3について「片方だけ保存されるシナリオ」が具体的に説明されている

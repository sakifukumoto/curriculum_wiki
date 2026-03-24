# 環境セットアップ

**このページの手順を上から順番に実行してください。**  
詰まったらすぐ講師に聞いてOKです。このページだけは例外です。

## 必要なもの

| ツール | 用途 | 備考 |
|--------|------|------|
| Java 21 | Javaの実行環境 | 必須 |
| IntelliJ IDEA Community | コードエディタ | 必須・無料 |
| Git | バージョン管理 | 必須 |
| Docker Desktop | コンテナ実行環境 | Ph.4から使用 |
| MySQL | データベース | Ph.1から使用 |

---

## Step 1：Javaのインストール

### Macの場合

ターミナルを開いて以下を実行します。

> ターミナルの開き方：Cmd + Space を押して「ターミナル」と入力

```bash
# Homebrewがない場合はまずインストール
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Java 21をインストール
brew install openjdk@21

# インストール確認
java -version
# "openjdk version 21.x.x" と表示されればOK
```

### Windowsの場合

1. [Microsoft Build of OpenJDK](https://learn.microsoft.com/ja-jp/java/openjdk/download#openjdk-21) からJava 21をダウンロード
2. インストーラーを実行
3. コマンドプロンプトで `java -version` を実行して確認

---

## Step 2：IntelliJ IDEAのインストール

1. [IntelliJ IDEA ダウンロードページ](https://www.jetbrains.com/idea/download/) を開く
2. **Community Edition**（無料版）をダウンロード
3. インストーラーを実行して起動を確認

> ⚠️ Ultimate版（有料）ではなくCommunity版をダウンロードしてください

---

## Step 3：Gitのインストールと設定

### インストール確認

```bash
git --version
# "git version 2.x.x" と表示されればインストール済み
```

表示されない場合：
- Mac：`brew install git`
- Windows：[Git for Windows](https://gitforwindows.org/) からダウンロード

### 初期設定（必須）

```bash
# 自分の名前とメールアドレスを設定する
# ※GitHubアカウントと同じメールアドレスを使うこと
git config --global user.name "あなたの名前"
git config --global user.email "your-email@example.com"

# 設定確認
git config --list
```

---

## Step 4：GitHubアカウントの作成

1. [GitHub](https://github.com/) でアカウントを作成する
2. 講師に以下を伝える
   - GitHubアカウント名（例：`yamada-taro`）
3. 講師から `curriculum_wiki` リポジトリへのアクセス権が付与されるまで待つ

---

## Step 5：リポジトリのクローン

アクセス権が付与されたら以下を実行します。

```bash
# ホームディレクトリに移動
cd ~

# リポジトリをクローン
git clone https://github.com/sakifukumoto/curriculum_wiki.git

# クローンできたか確認
cd curriculum_wiki
ls
# docs/ README.md などが表示されればOK
```

---

## Step 6：MySQLのインストール

### Macの場合

```bash
brew install mysql

# 起動
brew services start mysql

# 接続確認
mysql -u root
# "mysql>" が表示されればOK
# 終了は exit
```

### Windowsの場合

1. [MySQL Community Downloads](https://dev.mysql.com/downloads/mysql/) からMySQL 8.0をダウンロード
2. インストーラーを実行（rootパスワードを設定する）

---

## セットアップ完了チェック

以下が全て確認できたらセットアップ完了です。

- [ ] `java -version` でJava 21が表示される
- [ ] IntelliJ IDEAが起動する
- [ ] `git --version` でバージョンが表示される
- [ ] `git config user.name` と `git config user.email` が設定されている
- [ ] GitHubアカウントを作成し、講師に伝えた
- [ ] `curriculum_wiki` をクローンできた
- [ ] MySQLに接続できた

完了したら講師に報告して、次のページ [GitHubの使い方](03-github-basics.md) に進んでください。

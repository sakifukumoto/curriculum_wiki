#!/usr/bin/env node
/**
 * 新メンバーの課題issueを一括作成し、親issueの子として紐付けるスクリプト
 *
 * 使い方:
 *   node docs/instructor/create-member-issues.js [メンバー名] [親issueの番号]
 *
 * 例:
 *   node docs/instructor/create-member-issues.js yamada-taro 34
 *
 * 事前準備:
 *   .env ファイルに GITHUB_TOKEN=ghp_... を設定する
 *   または環境変数 GITHUB_TOKEN を設定する
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// .env から TOKEN を読み込む（なければ環境変数）
function loadToken() {
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const [key, val] = line.split('=');
      if (key && key.trim() === 'GITHUB_TOKEN') return val.trim();
    }
  }
  return process.env.GITHUB_TOKEN;
}

const TOKEN = loadToken();
const OWNER = 'sakifukumoto';
const REPO = 'curriculum_wiki';

if (!TOKEN) {
  console.error('❌ GITHUB_TOKENが設定されていません。.env ファイルを確認してください。');
  process.exit(1);
}

const [,, memberName, parentIssueNumber] = process.argv;
if (!memberName || !parentIssueNumber) {
  console.error('使い方: node create-member-issues.js [メンバー名] [親issueの番号]');
  process.exit(1);
}

// ====== 全課題の定義 ======
const ISSUES = [
  // Ph.0
  { title: '[Ph.0] 課題0-1：開発環境セットアップ', labels: ['Ph.0-foundation'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph0-foundation/task-0-1-environment.md\n\n## 完了条件\n- [ ] java -version でJava 21が表示される\n- [ ] IntelliJが起動する\n- [ ] リポジトリをcloneできた` },
  { title: '[Ph.0] 課題0-2：Linux基本コマンド', labels: ['Ph.0-foundation'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph0-foundation/task-0-2-linux.md\n\n## 完了条件\n- [ ] ls/cd/mkdir/touch/rm/cp/mv の操作ができる\n- [ ] スクリーンショットをPRに添付済み` },
  { title: '[Ph.0] 課題0-3：Git基本操作 & 初PR', labels: ['Ph.0-foundation'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph0-foundation/task-0-3-git.md\n\n## 完了条件\n- [ ] ブランチ名が命名規則に沿っている\n- [ ] コミットメッセージが feat: から始まっている\n- [ ] PRテンプレートの3項目が全て記入されている` },
  { title: '[Ph.0] 課題0-4：SQL基礎', labels: ['Ph.0-foundation'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph0-foundation/task-0-4-sql.md\n\n## 完了条件\n- [ ] 6問全てのクエリが正しく動作する\n- [ ] JOINの仕組みを説明できる` },
  // Ph.1
  { title: '[Ph.1] 事前確認：最初のJavaプログラムを動かす', labels: ['Ph.1-java'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph1-java-basics/task-1-0-pre-check.md\n\n## 完了条件\n- [ ] IntelliJでプロジェクトを作成できた\n- [ ] コードを実行して出力が確認できた` },
  { title: '[Ph.1] 課題1-1：クラス・継承・interface', labels: ['Ph.1-java'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph1-java-basics/task-1-1-oop.md\n\n## 完了条件\n- [ ] Borrowable interfaceが実装されている\n- [ ] EBookがBookを適切に継承している\n- [ ] findByIdがOptionalを返している\n- [ ] getAvailableBooksでStream APIを使っている\n- [ ] Step 2の回答（5問）がPR本文にある` },
  { title: '[Ph.1] 課題1-2：例外処理・Stream API', labels: ['Ph.1-java'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph1-java-basics/task-1-2-stream.md\n\n## 完了条件\n- [ ] 2つのカスタム例外クラスが実装されている\n- [ ] 5つのメソッドが全て動作する\n- [ ] Stream APIを使っている` },
  { title: '[Ph.1] 課題1-3：JUnit5テスト', labels: ['Ph.1-java'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph1-java-basics/task-1-3-test.md\n\n## 完了条件\n- [ ] 全テストケースが書かれている\n- [ ] 全テストがグリーン\n- [ ] Arrange/Act/Assert構造になっている` },
  { title: '[Ph.1] 課題1-4：JDBC・トランザクション', labels: ['Ph.1-java'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph1-java-basics/task-1-4-jdbc.md\n\n## 完了条件\n- [ ] CRUD処理が全て動作する\n- [ ] checkoutでトランザクションが実装されている\n- [ ] PreparedStatementを使っている` },
  { title: '[Ph.1] 課題1-5：デバッグ課題', labels: ['Ph.1-java', 'debug'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph1-java-basics/task-1-5-debug.md\n\n## 完了条件\n- [ ] 3つのバグを全て修正した\n- [ ] 各バグの原因・修正理由がPR本文にある` },
  // Ph.2
  { title: '[Ph.2] 課題2-1：DI・Bean・AOP', labels: ['Ph.2-spring-boot'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph2-spring-boot/task-2-1-di-aop.md\n\n## 完了条件\n- [ ] コンストラクタインジェクションを使っている\n- [ ] LoggingAspectがログを出力する` },
  { title: '[Ph.2] 課題2-2：REST API設計・実装', labels: ['Ph.2-spring-boot'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph2-spring-boot/task-2-2-rest-api.md\n\n## 完了条件\n- [ ] 5つのエンドポイントが全て動作する\n- [ ] 存在しないIDへのGETが404を返す\n- [ ] @ControllerAdviceで例外が一元管理されている\n- [ ] Controllerにビジネスロジックを書いていない` },
  { title: '[Ph.2] 課題2-3：JPA・N+1問題', labels: ['Ph.2-spring-boot'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph2-spring-boot/task-2-3-jpa.md\n\n## 完了条件\n- [ ] SQLログで修正前後のクエリ本数を確認・記録している\n- [ ] @EntityGraph か JOIN FETCHで解決している` },
  { title: '[Ph.2] 課題2-4：バリデーション・エラー処理', labels: ['Ph.2-spring-boot'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph2-spring-boot/task-2-4-validation.md\n\n## 完了条件\n- [ ] バリデーションエラーが400で返る\n- [ ] エラーレスポンスにフィールドごとのメッセージが含まれる` },
  { title: '[Ph.2] 課題2-5：Spring Security基礎', labels: ['Ph.2-spring-boot'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph2-spring-boot/task-2-5-security.md\n\n## 完了条件\n- [ ] ログインAPIがJWTトークンを返す\n- [ ] トークンなしで401が返る\n- [ ] パスワードがBCryptでハッシュ化されている` },
  { title: '[Ph.2] 課題2-6：Thymeleaf（最低限の画面）', labels: ['Ph.2-spring-boot'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph2-spring-boot/task-2-6-thymeleaf.md\n\n## 完了条件\n- [ ] 3画面が全て動作する\n- [ ] カスタムCSSファイルを作っていない` },
  { title: '[Ph.2] 課題2-7：デバッグ課題（Spring Boot編）', labels: ['Ph.2-spring-boot', 'debug'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph2-spring-boot/task-2-7-debug.md\n\n## 完了条件\n- [ ] バグ1：N+1問題を修正した\n- [ ] バグ2：バリデーションが動作する\n- [ ] バグ3：JWT認証が通る` },
  // Ph.3
  { title: '[Ph.3] 課題3-1：DB設計・ER図作成', labels: ['Ph.3-design'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph3-design-team/task-3-1-db-design.md\n\n## 完了条件\n- [ ] 多対多が中間テーブルで表現されている\n- [ ] ER図がPRに含まれている\n- [ ] 設計で迷った点がPR本文にある` },
  { title: '[Ph.3] 課題3-2：テスト設計・Mockito', labels: ['Ph.3-design'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph3-design-team/task-3-2-test.md\n\n## 完了条件\n- [ ] MockitoでRepositoryがモックされている\n- [ ] DBアクセスなしにテストが通る` },
  { title: '[Ph.3] 課題3-3：SOLID原則・リファクタリング', labels: ['Ph.3-design'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph3-design-team/task-3-3-solid.md\n\n## 完了条件\n- [ ] 2つ以上のSOLID原則違反を指摘\n- [ ] 既存コードを変えずに新機能追加できる構造になっている` },
  { title: '[Ph.3] 課題3-4：Git Flow・コードレビュー', labels: ['Ph.3-design'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph3-design-team/task-3-4-git-flow.md\n\n## 完了条件\n- [ ] featureブランチからのPRが作成されている\n- [ ] コミットが機能単位で分割されている` },
  { title: '[Ph.3] 課題3-5：レガシーコード読解・リファクタリング', labels: ['Ph.3-design', 'legacy'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph3-design-team/task-3-5-legacy.md\n\n## 完了条件\n- [ ] テストを先に書いてからリファクタリングした\n- [ ] A・B・Cという定数名が残っていない\n- [ ] Step 4の変更が容易に追加できた` },
  { title: '[Ph.3] 課題3-6：相互コードレビュー', labels: ['Ph.3-design', 'peer-review'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph3-design-team/task-3-6-peer-review.md\n\n## 完了条件\n- [ ] 3つ以上のレビューコメントを書いた（理由つき）\n- [ ] 相手からのコメントに全て返信した` },
  // Ph.4
  { title: '[Ph.4] 課題4-1：Docker（読める・使える）', labels: ['Ph.4-infra'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph4-infra/task-4-1-docker.md\n\n## 完了条件\n- [ ] docker compose up でアプリが起動する\n- [ ] よく使う5コマンドを全て実行した` },
  { title: '[Ph.4] 課題4-2：CI（落ちたら直せる）', labels: ['Ph.4-infra'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph4-infra/task-4-2-cicd.md\n\n## 完了条件\n- [ ] CIが動いてテストが自動実行される\n- [ ] テスト失敗・コンパイルエラーを直せた` },
  { title: '[Ph.4] 課題4-3：AWS基礎知識', labels: ['Ph.4-infra'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph4-infra/task-4-3-aws.md\n\n## 完了条件\n- [ ] EC2/RDS/S3/ECS/ALBの役割を説明できる\n- [ ] Q4の現場の会話が理解できた` },
  // Ph.5
  { title: '[Ph.5] テーマ選定・要件定義', labels: ['Ph.5-project'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph5-project/how-to-requirements.md\n\n## 完了条件\n- [ ] 要件定義セッションを実施した\n- [ ] MustがApprovedされた` },
  { title: '[Ph.5] DB設計・API設計', labels: ['Ph.5-project'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph5-project/design-review-checklist.md\n\n## 完了条件\n- [ ] ER図がPRに含まれている\n- [ ] 設計レビューでApprovedされた` },
  { title: '[Ph.5] Sprint 1：Must機能（前半）実装', labels: ['Ph.5-project'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph5-project/sprint-guide.md\n\n## 完了条件\n- [ ] featureブランチ→PRのフローで実装した\n- [ ] デモができた\n- [ ] KPT振り返りを実施した` },
  { title: '[Ph.5] Sprint 2：Must機能（後半）+テスト実装', labels: ['Ph.5-project'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph5-project/sprint-guide.md\n\n## 完了条件\n- [ ] Must機能が全て実装されている\n- [ ] テストカバレッジ70%以上` },
  { title: '[Ph.5] デプロイ・結合テスト', labels: ['Ph.5-project'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph5-project/README.md\n\n## 完了条件\n- [ ] docker compose up でアプリが起動する\n- [ ] READMEに起動方法が書かれている` },
  { title: '[Ph.5] 最終発表・振り返り', labels: ['Ph.5-project'],
    body: `## 課題ページ\nhttps://github.com/${OWNER}/${REPO}/blob/main/docs/ph5-project/final-presentation.md\n\n## 完了条件\n- [ ] デモのリハーサルを1回実施した\n- [ ] KPTをまとめた\n- [ ] 最終発表を実施した` },
];

// ====== API呼び出しユーティリティ ======
function apiRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.github.com',
      path,
      method,
      headers: {
        'Authorization': 'token ' + TOKEN,
        'User-Agent': 'curriculum-setup-script',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(data && { 'Content-Length': Buffer.byteLength(data) })
      }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) }); }
        catch { resolve({ status: res.statusCode, data: body }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ====== メイン処理 ======
async function main() {
  console.log('🚀 ' + memberName + ' さんの課題issueを作成します...');

  const createdIssues = [];
  for (let i = 0; i < ISSUES.length; i++) {
    const issue = ISSUES[i];
    const title = '[' + memberName + '] ' + issue.title;
    const body = '**担当者：** ' + memberName + '\n\n' + issue.body;

    process.stdout.write('  作成中 [' + (i + 1) + '/' + ISSUES.length + '] ' + issue.title + '... ');
    const res = await apiRequest('POST', '/repos/' + OWNER + '/' + REPO + '/issues', {
      title, body, labels: issue.labels, assignees: [memberName]
    });

    if (res.status === 201) {
      createdIssues.push(res.data.number);
      console.log('✅ #' + res.data.number);
    } else {
      console.log('❌ エラー: ' + res.status);
    }
    await sleep(300); // レート制限対策
  }

  // 親issueに子issueを紐付け
  console.log('\n🔗 親issue #' + parentIssueNumber + ' に子issueを紐付け中...');
  for (const childNum of createdIssues) {
    // 子issueのnode_idを取得
    const issueRes = await apiRequest('GET', '/repos/' + OWNER + '/' + REPO + '/issues/' + childNum, null);
    const childNodeId = issueRes.data.node_id;

    const parentRes = await apiRequest('GET', '/repos/' + OWNER + '/' + REPO + '/issues/' + parentIssueNumber, null);
    const parentNodeId = parentRes.data.node_id;

    // Sub-issue APIで紐付け
    const subRes = await apiRequest('POST', '/repos/' + OWNER + '/' + REPO + '/issues/' + parentIssueNumber + '/sub_issues', {
      sub_issue_id: issueRes.data.id
    });
    process.stdout.write('  #' + childNum + ' → ');
    console.log(subRes.status === 201 || subRes.status === 200 ? '✅' : '❌ (' + subRes.status + ')');
    await sleep(200);
  }

  console.log('\n✨ 完了！' + createdIssues.length + '個の課題issueを作成しました。');
  console.log('👉 https://github.com/' + OWNER + '/' + REPO + '/issues/' + parentIssueNumber);
}

main().catch(console.error);

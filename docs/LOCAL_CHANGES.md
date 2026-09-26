# 本仓库对原项目源码的改动登记

本仓库基于 [dingshuxin353/daily-news-app](https://github.com/dingshuxin353/daily-news-app) 二次开发，原则上不改原项目源码。确需改动时逐项登记在这里，方便同步原作者更新（`git merge upstream/main`）时核对和解决冲突。

## 1. 中英对照的英文行（2026-09-25）

**目的**：双语每日新闻每条的 `summary` 以「中文……EN: English……」书写。原页面只给头条显示 `summary`，其余条目只显示 `brief`，英文段看不到；头条的英文段也会被 6 行截断。

**规则**：`summary` 中第一个「EN:」之后的文字视为英文段。没有「EN:」的条目，页面结构和显示完全不变（目前只有双语每日新闻使用）。

| 文件 | 改动 |
| --- | --- |
| `src/app.js` | 新增 `splitEnglish()`；`createArticle()` 把摘要（及英文行）包进 `div.story__body`（第 2 项起所有条目都包），头条摘要只显示「EN:」之前的中文 |
| `scripts/lib/build-html.js` | `renderHomePublication()`：主页头条同样拆出英文段，另起 `p.home-highlight__en` |
| `styles.css` | 文件末尾新增一段样式（`.story__body`、`.story__en`、`.home-highlight__en` 及手机端规则） |

**合并上游时**：若上游改了 `createArticle()`、主页头条模板或相关样式，保留上游改动后，按上表重新加回这几处；改动都带有「本地改动（见 docs/LOCAL_CHANGES.md）」注释，可直接搜索定位。

**撤回**：`git revert` 对应提交即可，数据不受影响（英文段仍保存在 `summary` 里，只是不再单独显示）。

## 2. 展开全文（2026-09-26）

**目的**：卡片会按版面截断文字（头条摘要 6 行、重要条目 4 行、普通条目 3 行，英文行 3–4 行），普通和重要条目的完整 `summary`、每条的 `selectionReason`、单一来源的原标题在页面上都看不到。用户要求显示完整、不丢内容。

**规则**：每条卡片底部加「展开全文」按钮，点击后原地展开、再点「收起」。展开时取消所有截断，并在摘要下方追加：非头条的完整中文 `summary`、「入选理由：」`selectionReason`、只有 1 个来源时的「原标题：」`originalTitle`（2 个以上来源的原标题仍在来源面板里）。适用于所有刊物；主页头条摘要不变，点标题进入刊物页查看全文。

| 文件 | 改动 |
| --- | --- |
| `src/app.js` | `createArticle()`：所有条目都生成 `div.story__body`；新增 `div.story__more`（默认隐藏）和 `button.story__expand`，按钮切换文章的 `is-expanded` 类与 `aria-expanded` |
| `styles.css` | 文件末尾新增一段样式（`.story.is-expanded` 取消截断、`.story__more`、`.story__expand`） |

**合并上游时**：与第 1 项一起核对 `createArticle()` 和文件末尾样式，搜索「本地改动」即可定位。

**撤回**：`git revert` 对应提交即可，数据不受影响。

## 3. 刊名报头与「大报经典」外观（2026-09-26）

**目的**：用户认为原版面平庸，选定「大报经典」方向（象牙纸面、墨黑、朱红），并加上每条前的大号红色序号。

**规则**：
- 刊物页正文上方加报头：英文眉题、红底白字刊名色块、右侧日期栏（日期 · 星期、「事实优先 · 来源可查」、本期条数），翻期时随之更新。刊名字号按长度自动缩放：`createNameplate()` 按字宽估算刊名长度（中文 1、英文字母 0.6、空格 0.3）写入 `--title-length`，样式用容器宽度（`cqi`）算出放得下的字号，保证任何屏幕宽度下都是一行、不溢出。首页标题区也改为红底白字色块：构建时由 `scripts/lib/build-html.js` 的 `titleLength()` 把长度写到 `header.home-overview__intro` 的 `--title-length`（不写在 `<h1>` 上，因为原项目测试要求首页 `<h1>` 不带属性）。
- 导航不换行，放不下时横向滑动；导航里的刊名不再被截断。
- 配色（统一红色 #C8261C）、序号（Bodoni / Didot 数字，按阅读顺序 01、02……）、标题加粗、英文行斜体（Baskerville）只覆盖默认主题 `newspaper-default`。**没有新增主题**：原项目测试写死了主题库只有 3 个官方主题、首页使用默认主题，新增主题会导致测试和部署失败。切换到其他官方主题时这些外观不生效，报头与导航规则仍生效。
- 字体全部使用系统自带字体，不加载外部字体。

| 文件 | 改动 |
| --- | --- |
| `src/app.js` | 新增 `createNameplate()`（`start()` 中调用）与 `updateNameplate()`（`loadIssue()` 渲染后调用） |
| `scripts/lib/build-html.js` | 新增 `titleLength()`；`renderHomeHtml()` 的首页标题区加 `--title-length` |
| `styles.css` | 文件末尾新增一段样式（`.nameplate*`、导航不换行、`:root[data-theme="newspaper-default"]` 下的配色与版式） |

**合并上游时**：若上游改了 `start()`、`loadIssue()`、默认主题或页头结构，按上表重新核对；搜索「本地改动」即可定位。

**撤回**：`git revert` 对应提交即可，数据不受影响。

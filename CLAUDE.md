# AIggy 每日简报：Claude Code 项目说明

本仓库基于 [dingshuxin353/daily-news-app](https://github.com/dingshuxin353/daily-news-app) 二次开发。原项目的 Agent 规则见 [`AGENTS.md`](./AGENTS.md)，依然有效。

## 出刊

用户说「出刊 <刊物名或 ID>」时：

1. 先读 [`editorial/README.md`](./editorial/README.md)（通用出刊指令），再读 `editorial/<publication-id>.md`（该刊手册）。
2. 按其中流程检索、核实、写候选稿，然后运行 `node automation/publish.mjs <id>` 完成预检、入库、测试、构建和提交，最后本机验证页面。
3. 出刊直接加 `--push`（见下方「与 GitHub 同步」）。推送后网站 https://rich-richer.github.io/ 自动更新。

## 与 GitHub 同步（用户 2026-09-26 的长期要求）

本地有任何变动，完成并验证后都要同步到 GitHub（`origin/main`），不留只在本机的改动：

- 出刊：「出刊」与「出刊并发布」一律加 `--push`。
- 手册、配置、源码等改动：测试（`npm test`）和构建（`npm run build`）通过后，立即提交并推送；源码改动仍须先取得用户确认，确认后改完即推送。
- 每次任务结束前核对：`git status` 无未提交改动，且 `git rev-list origin/main..HEAD --count` 为 0。推送失败时如实报告原因，不要跳过或强推。
- 推送即公开发布（仓库和网站都是公开的），推送前确认没有真实姓名、Notion 链接、家庭信息或凭证。

## 云端出刊（手机端 Claude，2026-10-26 起）

在云端会话（没有连接本机）里出刊时，上面的流程不变，只替换以下几处：

- 仓库：用 `add_repo`（owner `rich-richer`，repo `rich-richer.github.io`，access `push`）挂载并浅克隆到 `/home/claude/rich-richer.github.io`。克隆后设置提交身份，与历史提交一致：`git config user.name rich-richer && git config user.email 273366435+rich-richer@users.noreply.github.com`。
- 核实原文：云端 shell 不能直接访问新闻网站，`automation/fetch.py` 和 curl 会失败，改用 WebSearch / WebFetch；首页天气也用 WebFetch 打开中国天气网沈阳页。
- 推送前先 `git fetch origin main` 并在需要时 `git rebase origin/main`（浅克隆推送过时会被拒）。
- 页面验证：用 `node scripts/serve.js &` 启动服务，再用预装的 Playwright（`require('playwright')`，无需安装）打开 `http://localhost:4173/p/<id>/` 读取正文确认渲染，最后再看线上网址。
- 本机副本：云端推送后，下次在电脑上工作前先 `git pull`，避免两边分叉。

## 边界

- 不修改原项目源码（`scripts/`、`src/`、`styles.css`、`*.html`、`themes/presets/`）；需要改时先说明影响并取得确认。已确认的改动逐项登记在 [`docs/LOCAL_CHANGES.md`](./docs/LOCAL_CHANGES.md)，同步原项目更新时按它核对。
- 不手工修改 `publications/*/data/issues/`、`compiled/`、`index.json`、`submissions/`，只通过 `npm run process-candidate` 写入。
- 仓库和网站公开：不写真实姓名、Notion 链接、家庭信息或任何凭证（详见 `editorial/README.md` 第 7 节）。
- 同步原项目更新：`git fetch upstream && git merge upstream/main`，合并后运行 `npm test` 与 `npm run build`。

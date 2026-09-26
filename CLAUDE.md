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

## 边界

- 不修改原项目源码（`scripts/`、`src/`、`styles.css`、`*.html`、`themes/presets/`）；需要改时先说明影响并取得确认。已确认的改动逐项登记在 [`docs/LOCAL_CHANGES.md`](./docs/LOCAL_CHANGES.md)，同步原项目更新时按它核对。
- 不手工修改 `publications/*/data/issues/`、`compiled/`、`index.json`、`submissions/`，只通过 `npm run process-candidate` 写入。
- 仓库和网站公开：不写真实姓名、Notion 链接、家庭信息或任何凭证（详见 `editorial/README.md` 第 7 节）。
- 同步原项目更新：`git fetch upstream && git merge upstream/main`，合并后运行 `npm test` 与 `npm run build`。

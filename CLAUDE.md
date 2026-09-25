# AIggy 每日简报：Claude Code 项目说明

本仓库基于 [dingshuxin353/daily-news-app](https://github.com/dingshuxin353/daily-news-app) 二次开发。原项目的 Agent 规则见 [`AGENTS.md`](./AGENTS.md)，依然有效。

## 出刊

用户说「出刊 <刊物名或 ID>」时：

1. 先读 [`editorial/README.md`](./editorial/README.md)（通用出刊指令），再读 `editorial/<publication-id>.md`（该刊手册）。
2. 按其中流程检索、核实、写候选稿，然后运行 `node automation/publish.mjs <id>` 完成预检、入库、测试、构建和提交，最后本机验证页面。
3. 默认不推送；用户说「发布」或「出刊并发布」时才加 `--push`。推送后网站 https://rich-richer.github.io/ 自动更新。

## 边界

- 不修改原项目源码（`scripts/`、`src/`、`styles.css`、`*.html`、`themes/presets/`）；需要改时先说明影响并取得确认。已确认的改动逐项登记在 [`docs/LOCAL_CHANGES.md`](./docs/LOCAL_CHANGES.md)，同步原项目更新时按它核对。
- 不手工修改 `publications/*/data/issues/`、`compiled/`、`index.json`、`submissions/`，只通过 `npm run process-candidate` 写入。
- 仓库和网站公开：不写真实姓名、Notion 链接、家庭信息或任何凭证（详见 `editorial/README.md` 第 7 节）。
- 同步原项目更新：`git fetch upstream && git merge upstream/main`，合并后运行 `npm test` 与 `npm run build`。

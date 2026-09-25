# AIggy 每日简报

**网站：<https://rich-richer.github.io/>**

AIggy 的个人数字日报：10 份刊物，覆盖 AI、市场、算力、自媒体、理财入门、创业赛道和升学就业。内容由 Claude 按固定编辑手册检索、核实、整理，经程序校验后发布为静态网站。

本仓库基于 [dingshuxin353/daily-news-app](https://github.com/dingshuxin353/daily-news-app)（MIT 许可）二次开发，保留原作者版权声明。原项目的完整说明见 [README.md](https://github.com/rich-richer/rich-richer.github.io/blob/main/README.md)。

## 刊物

| 刊物 | 建议频率 | 链接 |
| --- | --- | --- |
| 双语每日新闻 | 工作日 | [打开](https://rich-richer.github.io/p/daily-news/) |
| 工作日早晨简报 | 工作日 | [打开](https://rich-richer.github.io/p/morning-brief/) |
| 电算协同每日情报 | 工作日 | [打开](https://rich-richer.github.io/p/compute-intel/) |
| 自媒体选题简报 | 周一、三、五 | [打开](https://rich-richer.github.io/p/topic-radar/) |
| 理财入门晚间课 | 工作日 | [打开](https://rich-richer.github.io/p/finance-class/) |
| AI 架构周报 | 周一 | [打开](https://rich-richer.github.io/p/ai-architecture/) |
| AI 安全公开动态 | 周三 | [打开](https://rich-richer.github.io/p/ai-safety/) |
| 人物动态追踪 | 周四 | [打开](https://rich-richer.github.io/p/people-watch/) |
| 赛道与创业周报 | 周五 | [打开](https://rich-richer.github.io/p/venture-weekly/) |
| 升学就业周报 | 周六 | [打开](https://rich-richer.github.io/p/education-weekly/) |

目前由人工触发出刊，定时时间尚未设定。

## 内容说明

- 摘要由 AI 辅助整理，事实以每条新闻附带的原文链接为准；原文版权归各来源所有。
- 理财入门晚间课是教育内容，不构成投资建议。
- 如发现事实错误，欢迎提 Issue。

## 如何出刊

在仓库根目录打开 Claude Code，说：

- 「出刊 双语每日新闻」：检索、核实、写候选稿、校验入库、测试、构建，只在本机生成，不推送。
- 「出刊并发布 双语每日新闻」：同上，完成后提交并推送；推送后网站几分钟内自动更新。

候选稿写好后，也可以手动运行出刊脚本：`node automation/publish.mjs daily-news`（加 `--push` 即发布）。任何一步失败都会中止，不会提交或推送。

Claude 会按 [`editorial/README.md`](https://github.com/rich-richer/rich-richer.github.io/blob/main/editorial/README.md)（通用出刊指令）和 `editorial/<刊物 ID>.md`（各刊手册）执行。

## 本仓库新增的内容

| 路径 | 作用 |
| --- | --- |
| `editorial/` | 通用出刊指令和 10 份刊物手册 |
| `automation/publish.mjs` | 一键出刊脚本：预检、入库、测试、构建、提交，可选推送 |
| `automation/schedule.json` | 定时入口（预留，目前全部关闭） |
| `publications/<刊物 ID>/` | 各刊配置和正式日报数据 |
| `config/home.json`、`config/publications.json` | 主页名称和刊物登记 |
| `CLAUDE.md` | Claude Code 的项目说明 |
| `.github/workflows/deploy.yml` | 推送后自动测试、构建并发布网站 |
| `.github/README.md` | 本页 |

原项目的源码（`scripts/`、`src/`、`styles.css` 等）没有改动。

## 本地运行

需要 Node.js 22 或更高版本：

```bash
npm test
npm start
```

然后打开 <http://127.0.0.1:4173/>。

## 同步原项目更新

```bash
git fetch upstream
git merge upstream/main
npm test && npm run build
```

## 许可

代码沿用原项目的 [MIT License](https://github.com/rich-richer/rich-richer.github.io/blob/main/LICENSE)，版权归原作者。

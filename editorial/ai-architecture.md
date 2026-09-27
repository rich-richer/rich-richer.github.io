# AI 架构周报（ai-architecture）

先读 [`README.md`](./README.md)。本手册只写这份刊物的特有规则。

- 建议频率：每周一。窗口：过去 7 天。
- 主题：AI 架构与基础模型技术。分析师语气。
- 使用 AIHOT：是（一周模型发布 + 论文精选）。

## 范围

- 是否有新架构或论文实质性地挑战或扩展了 Transformer 范式。
- 训练 / 推理系统的重要进展。
- 技术上真正重要的开放权重（open-weight）模型发布。
- 优先 arXiv、实验室博客、官方论文，不采信传闻。
- 本刊是论文与架构内容的归属刊（2026-09-27 改版）；双语每日新闻只报道特别重要的论文新闻，并链接到本刊。

## 线索源

```text
GET https://aihot.news/api/v1/items?mode=selected&window=7d&category=ai-models
GET https://aihot.news/api/v1/items?mode=selected&window=7d&category=paper
```

若 `category` 参数不生效，拉 `window=7d` 全量后按 `category` 字段筛选；`publishedAt` 按 Asia/Shanghai 判断是否在窗口内。接口失败、超时或 429 就跳过。

## 条目安排

- 共 3–8 条经核实的条目。`category`：`架构` / `训练与推理` / `开放权重模型` / `本周重要论文` / `经典论文回顾`。
- `本周重要论文`（1–3 篇）与 `经典论文回顾`（每期 1 篇）的 summary 必须写清：中英文标题、作者机构、发表日期、核心贡献、局限、状态（预印本 / 正式发表于某会议或期刊）；`sources[0]` 为论文原文链接（arXiv、会议或期刊页面），英文标题写进 `originalTitle`。
- 每期出刊后，把本期论文追加到 [`paper-catalog.md`](./paper-catalog.md) 论文目录（按主题分类，写明本刊事件编号），逐步形成可检索的经典论文目录。
- **执行摘要**并入头条：`lead` 是本周最重要的一项进展，`summary` 开头用一两句话概括本周全局。
- `important` 2 条。
- 英文来源填 `originalTitle`（论文标题原文），头条尽量附 2 个以上来源，让原标题在来源面板中显示（规则见 README 第 4 节）。
- 本周确无实质更新时不出刊，并告诉用户「本周无实质更新（no material updates）」。

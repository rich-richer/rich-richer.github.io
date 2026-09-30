# AI 研发前沿周报（ai-architecture）

先读 [`README.md`](./README.md)。本手册只写这份刊物的特有规则。

- 2026-09-30 由「AI 架构周报」改名并扩充范围；网址 ID 仍为 `ai-architecture`，旧期与链接不变。
- 建议频率：周一（试行出刊表）。窗口：过去 7 天；「经典论文回顾」不限时间。
- 主题：AI 公司**从训练大模型到应用层**的技术研发前沿，以及重要论文。分析师语气，讲清「做了什么、为什么重要、局限在哪」。
- 本刊是论文与技术研发内容的归属刊；双语每日新闻只报道特别重要的论文新闻，并链接到本刊。
- 使用 AIHOT：是（一周模型发布 + 论文精选）。

## 范围：从训练到应用的技术链条

| category | 内容 |
| --- | --- |
| `预训练与架构` | 新架构（Transformer 之外的尝试、混合专家、长上下文、状态空间模型等）、预训练数据与配方、规模定律 |
| `后训练与对齐` | 指令微调、RLHF / DPO 等偏好对齐、推理模型的强化学习、合成数据、评测方法 |
| `推理与部署` | 推理加速与降本（量化、蒸馏、投机解码、KV 缓存）、训练与推理系统、AI 芯片与集群工程 |
| `智能体与应用` | 智能体（agent）框架与工具调用、记忆与检索增强（RAG）、编程与多模态应用的工程方法、产品背后的技术 |
| `开放权重模型` | 技术上真正重要的开放权重（open-weight）模型发布：参数规模、训练方法、评测结果与许可证 |
| `本周重要论文` | 本周发布的重要论文，优先头部实验室和顶会 |
| `经典论文回顾` | 每期讲一篇 AI 发展史上的重要论文 |

- 优先一手来源：论文原文、实验室官方博客与技术报告、官方代码仓库；不采信传闻和营销稿。
- 重点跟踪 Google DeepMind、Google Research、Anthropic、OpenAI、Meta AI、Microsoft Research、NVIDIA、Apple，以及 DeepSeek、通义千问 Qwen、字节跳动 Seed 等国内外头部实验室的研究页（网址见 [`paper-catalog.md`](./paper-catalog.md) 第一部分）。每期出刊前逐一查看它们本周新发的论文和技术博客。
- 论文从哪里找、如何核对正式出处（arXiv、OpenReview、NeurIPS / PMLR / ACL 论文集、Semantic Scholar、DBLP 等）见 `paper-catalog.md` 第一部分。**预印本未经同行评审**，正文注明。

## 线索源

```text
GET https://aihot.news/api/v1/items?mode=selected&window=7d&category=ai-models
GET https://aihot.news/api/v1/items?mode=selected&window=7d&category=paper
```

若 `category` 参数不生效，拉 `window=7d` 全量后按 `category` 字段筛选；`publishedAt` 按 Asia/Shanghai 判断是否在窗口内。接口失败、超时或 429 就跳过。Hugging Face Papers 等热度榜只作线索。

## 条目安排

- 每期 5–10 条。前五类（预训练与架构 → 智能体与应用、开放权重模型）按本周实际进展写，**确无实质更新的类别不写**，在报告中说明；尽量覆盖从训练到应用的不同环节，不要全挤在一类。
- `本周重要论文`：2–4 篇，优先头部实验室和顶会论文，写明机构。
- `经典论文回顾`：**每期 1 篇**，按 [`paper-catalog.md`](./paper-catalog.md) 第二部分「AI 发展史重要论文汇总」的序号依次讲，跳过已讲过的（「本刊回顾」栏已填链接的）；讲完一轮后从近年重要论文中补充新条目。
- 论文类条目（`本周重要论文`、`经典论文回顾`）的 summary 必须写清：中英文标题、作者机构、发表日期、核心贡献、局限、状态（预印本 / 正式发表于某会议或期刊）；`sources[0]` 为论文原文链接（arXiv、会议或期刊页面），英文标题写进 `originalTitle`。
- `经典论文回顾` 另写「它在 AI 发展史上的位置」：解决了什么老问题、后来影响了哪些技术或产品；`sources` 第二条放论文目录的公开页 `https://github.com/rich-richer/rich-richer.github.io/blob/main/editorial/paper-catalog.md`。
- 每期出刊后：本周论文追加到 `paper-catalog.md` 第三部分；经典论文在第二部分「本刊回顾」栏填入本站链接。
- **执行摘要**并入头条：`lead` 是本周最重要的一项进展，`summary` 开头用一两句话概括本周从训练到应用的全局。
- `important` 2 条。
- 英文来源填 `originalTitle`（论文标题原文），头条尽量附 2 个以上来源，让原标题在来源面板中显示（规则见 README 第 4 节）。
- 本周前沿进展确实没有实质更新时，只出经典论文回顾并在报告中写明「本周无实质更新（no material updates）」；不凑数。

# 出刊指令（通用）

本目录是「AIggy 每日简报」的编辑手册。每份刊物一个手册：`editorial/<publication-id>.md`。本文件是所有刊物共用的规则，出刊前必须先读本文件，再读目标刊物的手册。

数据格式以仓库根目录 [`AGENT_CONTENT_GUIDE.md`](../AGENT_CONTENT_GUIDE.md) 为准；本文件只补充「例程写法如何落到这个网站」。两者冲突时，以 `AGENT_CONTENT_GUIDE.md` 和校验程序为准。

## 1. 刊物一览

| 刊物 | ID | 建议频率 | 窗口 |
| --- | --- | --- | --- |
| 双语每日新闻 | `daily-news` | 工作日 | 过去约 24 小时 |
| 工作日早晨简报 | `morning-brief` | 工作日 | 过去 48 小时 |
| 电算协同每日情报 | `compute-intel` | 每天 | 当日及最近 3 天 |
| 自媒体选题简报 | `topic-radar` | 周一、三、五 | 过去约 48 小时 |
| 理财入门晚间课 | `finance-class` | 工作日 | 过去约 24 小时 |
| AI 架构周报 | `ai-architecture` | 周一 | 过去 7 天 |
| AI 安全公开动态 | `ai-safety` | 周三 | 过去 7 天 |
| 人物动态追踪 | `people-watch` | 周四 | 过去 7 天 |
| 赛道与创业周报 | `venture-weekly` | 周五 | 过去 7 天 |
| 升学就业周报 | `education-weekly` | 周六 | 本周新数据优先，背景数据可用最近 12 个月 |

频率只是建议。目前由用户手动出刊，任何一天都可以出任何一份。

## 2. 怎么触发

在本仓库根目录打开 Claude Code，说「出刊 <刊物名或 ID>」，例如「出刊 双语每日新闻」。

- 一次可以出多份：「出刊 双语每日新闻、AI 架构周报」。
- 「出刊 全部」：10 份全部出，不看频率。
- 「出刊 今天的」：按 [`automation/schedule.json`](../automation/schedule.json) 的 `days` 挑出当天（上海时间星期几）该出的刊物。
- 一次出多份时：先逐份检索并写好全部候选稿，再**只运行一次**出刊脚本并列出所有 ID（`node automation/publish.mjs <id1> <id2> ...`），合成一个提交、一次推送。脚本会先预检全部候选稿，任何一份不合格就整批中止，不写入任何正式日报；按提示改好那份候选稿后重跑同一条命令即可。
- 默认只在本机生成、入库、构建和验证，**不推送**。用户说「发布」或「出刊并发布」时才提交并推送。

## 3. 日期与窗口

- 时区固定 `Asia/Shanghai`。期号日期 = 出刊当天。周刊也用出刊当天的日期。
- `generatedAt` = 实际生成时间；`coverage.end` = 生成时间；`coverage.start` = end 往前推手册规定的窗口。
- 同一天同一刊物再次出刊时，必须先读 `publications/<id>/data/issues/YYYY-MM-DD.json`，复用其中的 `coverage` 和已有条目的 `id`（程序会拒绝变更后的 coverage）。

## 4. 例程写法 → 网站字段

页面只显示部分字段，下面的映射按「读者能看到什么」设计：

| 页面位置 | 显示的字段 |
| --- | --- |
| 头条（lead） | 分类、标题、**summary**（最多显示 6 行，超出截断）、主要来源链接 |
| 重要（important） | 分类、标题、**brief**（最多 4 行）、主要来源链接 |
| 普通（normal） | 标题、**brief**（最多 3 行）、主要来源链接 |
| 来源面板（仅 2 个及以上来源时出现） | 每个来源的名称、`originalTitle`、发布时间、原文链接、经由（via） |
| 不显示 | `editorial.selectionReason` |

据此：

| 例程里的写法 | 网站里怎么写 |
| --- | --- |
| 板块（如 AI 科技 / 市场商业 / 科学） | `category` |
| Today's takeaways / 要点 / 执行摘要 | 最重要的 1 条为 `lead`，其次 2 条为 `important`（上限见各刊 `config/site.json`） |
| 中文摘要 | `summary`（120–400 字；头条的 summary 会截断显示，控制在约 250 字，最重要的信息放前面）；`brief` 是能独立阅读的一句话（≤ 80 字）。标题上限：头条 42 字、重要 36 字、普通 28 字。超出时程序会给出长度提醒并影响版面，入库前压缩到上限内（按 Unicode 字符计，英文字母和空格也算） |
| **原文 EN** | 英文来源的原标题写进 `sources[].originalTitle`，由来源面板显示。来源面板只在有 2 个以上来源时出现，所以头条和重要条目尽量附 2 个以上来源。不在 summary 里重复英文标题 |
| 对我们的意义 / 对家庭意味着什么 / 切入角度 | 非头条只显示 `brief`，所以写进 `brief` 的后半句，例如「……。意义：……」。头条写进 `summary` 的**第二句**，并且在前 80 字内开始（手机上头条每行约 17 字、只显示 6 行），避免被截断。`selectionReason` 再完整写一遍，供存档 |
| 术语对照 | 不单独成段。术语首次出现写作「中文（English）」 |
| 事实（一手）/ 机构观点 | 机构观点在正文中明确标注「机构观点：」，写明机构和作者 |
| 矛盾信息 ⚠️ / 仅媒体转述 | 在正文中写「⚠️ 各方说法不一」或「（媒体转述）」 |
| 板块无可靠更新 | 不生成空条目，不凑数；在向用户的报告中说明哪个板块无更新 |
| 页脚生成说明、sepia 标记 | 网站没有页脚字段，不写；sepia 处理照做 |
| 写入 Notion | 不做。Notion 例程独立运行，与本网站无关 |

## 5. 信源规则（所有刊物）

1. 事实的底线是官方一手来源：公司博客、部委、监管机构、学术期刊、ETF 发行方、法院、gov.cn。优先引用原始官方链接，而不是新闻转写稿。
2. 底线不是天花板：话题需要时，也检索世界一流机构的公开报告，包括 McKinsey、BCG、Bain、Accenture、四大会计师事务所、BlackRock、Blackstone、Vanguard、State Street、JPM、Goldman 研究中心、Brookings、CFR、RAND、CSIS、Chatham House、Atlantic Council、Carnegie、OECD、IMF、World Bank、BIS、WTO、中国社科院、国务院发展研究中心、中国信通院，以及同等地位的机构。
3. 始终区分「事实（一手）」与「机构观点（咨询 / 审计 / 资管 / 智库）」。优先写明具名作者。绝不编造引用或引语。
4. 社交平台热度（抖音、B 站、小红书、今日头条、X）只作线索，须经一级来源核实后才能作为事实陈述。
5. AI 安全类内容只写公共政策和防御性工具，绝不写越狱（jailbreak）或漏洞利用（exploit）方法。
6. 中国金融：合规企业链、数字人民币、数据要素 ≠ 散户加密货币投机。
7. 同一期内，每个来源链接只能属于一条内容。两条共用同一篇文章时，原项目再次入库会因无法确定性合并而整次拒绝（出刊脚本的预检会拦下）。
8. `sources[0]` 必须直接支撑标题和摘要的核心事实。能找到第二个独立来源时尽量附上（这样来源面板和英文原标题才会显示）。
9. 绝不编造链接、数字、价格、引语、日期。`publishedAt` 未知就省略。
10. 发布日期以官方首发为准（官网公告、版本说明、模型卡）。发布后的补充文章、评测、转载不能当作发布日期；若首发在窗口外，只能写成「某机构某日发文披露……」。
11. 行情数据先确认对应的交易日已经收盘，不引用尚未收盘的「收盘价」。

### AIHOT 线索源（仅手册中注明使用的刊物）

AIHOT（<https://aihot.news>）是 AI 资讯聚合站，**只作发现线索和补漏，不是信源**。网页有防爬验证，只用官方公开接口（匿名、无需 key）：

```text
GET https://aihot.news/api/v1/items?mode=selected&window=24h&limit=30
GET https://aihot.news/api/v1/items?mode=selected&window=7d&category=<类别>
GET https://aihot.news/api/v1/hot-topics
```

- 字段：`title`、`summary`、`source.name`、`links.original`、`links.aihot`、`publishedAt`、`category`（取值 ai-models / ai-products / industry / paper / tip）。若 `category` 参数不生效，拉 `window=7d` 全量后按字段筛选；`publishedAt` 按 Asia/Shanghai 判断是否在窗口内。
- 入选条目必须打开 `links.original` 核实，正文引用原始来源。
- 候选稿写法：`url` = 原始来源链接；`via` = `{ "name": "AIHOT", "url": <links.aihot> }`。
- **绝不**把 AIHOT 的 `score`、`selected` 写进候选稿（校验会拒绝）。不把 AIHOT 当唯一依据，不转载全文。
- 接口失败、超时或返回 429 就跳过 AIHOT，其余流程照常，不报错。

## 6. 语言后处理（sepia）

先写完整草稿，再做语言后处理，最后才写候选稿，顺序不能颠倒。

1. 中文正文（title、brief、summary）用 sepia 做语言后处理，优先 **refactor**，按 sepia 的中文规则（zh）和专业文体执行。没有 sepia 时按同样原则人工润色。
2. 目标：去 AI 腔，理顺中文，读起来像人写的。**不改事实、数字、专名、来源链接**，不增删要点，不编造。
3. 某段 refactor 后仍不通顺，对该段用 **recreate** 整段重写，再与全文语气对齐。
4. 英文部分（`originalTitle`）保持原文，不润色。

## 7. 公开网站的隐私规则

仓库和网站都是公开的：

- 称呼用户为「AIggy」，不写真实姓名。
- 不写任何 Notion 链接或私人页面地址。
- 不写家庭成员、子女年级、住址等个人信息（升学就业周报尤其注意）。
- 不写邮箱、账号、密钥等任何凭证。
- 电算协同每日情报保留辽宁区域视角，但不署名（不出现筹备组名称）、不写「请勿转载」；正文不出现与合作方（包括大云中联）的关系、诉求或内部策略（详见该刊手册的写作口径）。

## 8. 出刊流程与命令

候选稿写好后，用出刊脚本完成其余步骤：

```bash
# 只在本机：预检 → 校验入库 → 测试 → 构建 → 提交（不推送）
node automation/publish.mjs <id> [<id> ...]

# 出刊并发布：同上，最后推送，网站几分钟内自动更新
node automation/publish.mjs <id> [<id> ...] --push
```

| 参数 | 作用 |
| --- | --- |
| `--date YYYY-MM-DD` | 指定期号日期，默认上海时间今天 |
| `--allow-history` | 补发历史日期（须用户明确要求） |
| `--allow-warnings` | 有长度 / 优先级提醒时仍继续（须用户明确同意，默认不用） |

脚本在写入正式日报**之前**，先用原项目的校验和提醒规则预检候选稿，有问题就中止。任何一步失败都不提交、不推送，退出码为 1，日志在 `automation/logs/`（不进仓库）。它只提交本次的 `publications/<id>/data/issues/YYYY-MM-DD.json`。

1. 读本文件和目标刊物手册；若当天已有正式日报，读取它的 coverage 和已有 id。
2. 检索（手册规定的来源和 AIHOT）→ 逐条打开原文核实。
3. 写草稿 → sepia 语言后处理 → 写候选稿到 `publications/<id>/data/candidates/YYYY-MM-DD.json`。
4. 运行出刊脚本。中止时按提示只修改候选稿后重试，**不直接修改** `data/issues/`、`data/compiled/`、`data/index.json`、`data/submissions/`。
5. 脚本成功后启动本机服务（`npm start`），在浏览器里打开 `/p/<id>/` 确认内容正常显示（页面由脚本渲染，只看 HTTP 状态不够）。
6. 用户说「发布」或「出刊并发布」时才加 `--push`。

## 定时（预留）

[`automation/schedule.json`](../automation/schedule.json) 记录每份刊物的建议频率，`time` 为空、`enabled` 为 `false`，表示尚未定时。用户确定时间后：填写 `time` 并把 `enabled` 改为 `true`，再创建定时任务（须用户单独确认），任务内容为「出刊并发布 <刊物名>」。

## 9. 交付前自检

- [ ] 每条 `sources[0]` 都已打开核实，能直接支撑标题和摘要。
- [ ] 没有编造的链接、数字、引语；未知字段已省略。
- [ ] 同一事件已合并为一条；没有凑数条目。
- [ ] 头条和重要条目的「意义」在读者可见的字段里（头条在 summary，其余在 brief）。
- [ ] 英文来源都写了 `originalTitle`；头条有 2 个以上来源（原标题才会显示）。
- [ ] 中文已过 sepia 语言后处理。
- [ ] 没有真实姓名、Notion 链接、家庭信息。
- [ ] 候选稿没有 `score`、`selected`、`revision` 等禁止字段。
- [ ] `process-candidate` 输出的 `warnings` 为空（长度提醒已处理）。
- [ ] 校验、测试、构建都通过，本机页面可打开。

向用户报告：出了哪几份、每份条数、哪些板块无可靠更新、页面是否已验证、是否已推送。

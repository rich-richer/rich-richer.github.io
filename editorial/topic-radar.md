# 自媒体选题简报（topic-radar）

先读 [`README.md`](./README.md)。本手册只写这份刊物的特有规则。

- 建议频率：周一、三、五。窗口：自上一期以来（约 48–72 小时）；首期取过去 48 小时。
- 用途：为 AIggy 的短视频 / 长内容找可核实的热点切入角度。
- 使用 AIHOT：是（热点榜 + 24 小时精选）。

## 范围

收集国内外可核实、适合做短视频或长内容切入的热门话题。

- 海外优先 X、YouTube；国内优先抖音、B 站、今日头条、小红书（仅限能独立核实时）。
- 热度只作线索，事实部分须经一级来源核实（README 第 5 节第 4 条）。
- 不编造热点。某部分无可靠话题时如实写进报告。

## 线索源

```text
GET https://aihot.news/api/v1/hot-topics
GET https://aihot.news/api/v1/items?mode=selected&window=24h&limit=30
```

## 条目安排

- `category`：`国内` 或 `海外`。
- 每个话题一条，内容三件事：**发生了什么、为什么火、2–3 个切入角度**。
  - `brief`：一句话说清发生了什么 + 最值得做的一个切入角度，例如「……。切入：……」。
  - `summary`：发生了什么 → 为什么火 → 2–3 个切入角度。
  - `selectionReason`：为什么这个话题适合 AIggy 做（受众、时效、差异化）。
- Takeaways：最值得做的 1 个话题做 `lead`，其次 2 个做 `important`。
- 英文来源填 `originalTitle`，头条尽量附 2 个以上来源，让原标题在来源面板中显示（规则见 README 第 4 节）。
